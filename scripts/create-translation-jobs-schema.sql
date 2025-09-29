-- Create translation jobs table for queuing translation requests
CREATE TABLE IF NOT EXISTS translation_jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT NOT NULL,
    text TEXT NOT NULL,
    source_language TEXT NOT NULL DEFAULT 'en',
    context TEXT,
    priority INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_translation_jobs_status ON translation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_translation_jobs_priority ON translation_jobs(priority DESC);
CREATE INDEX IF NOT EXISTS idx_translation_jobs_created_at ON translation_jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_translation_jobs_key ON translation_jobs(key);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_translation_jobs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_translation_jobs_updated_at
    BEFORE UPDATE ON translation_jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_translation_jobs_updated_at();

-- Create function to clean up old completed jobs
CREATE OR REPLACE FUNCTION cleanup_old_translation_jobs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM translation_jobs 
    WHERE status = 'completed' 
    AND created_at < NOW() - INTERVAL '7 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get job statistics
CREATE OR REPLACE FUNCTION get_translation_job_stats()
RETURNS TABLE(
    total_jobs BIGINT,
    pending_jobs BIGINT,
    processing_jobs BIGINT,
    completed_jobs BIGINT,
    failed_jobs BIGINT,
    avg_processing_time INTERVAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_jobs,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_jobs,
        COUNT(CASE WHEN status = 'processing' THEN 1 END) as processing_jobs,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_jobs,
        COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_jobs,
        AVG(CASE 
            WHEN status = 'completed' AND updated_at IS NOT NULL 
            THEN updated_at - created_at 
            ELSE NULL 
        END) as avg_processing_time
    FROM translation_jobs;
END;
$$ LANGUAGE plpgsql;

-- Create function to retry failed jobs
CREATE OR REPLACE FUNCTION retry_failed_translation_jobs()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE translation_jobs 
    SET 
        status = 'pending',
        attempts = 0,
        error = NULL,
        updated_at = NOW()
    WHERE status = 'failed' 
    AND attempts < max_attempts;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON translation_jobs TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_old_translation_jobs() TO authenticated;
GRANT EXECUTE ON FUNCTION get_translation_job_stats() TO authenticated;
GRANT EXECUTE ON FUNCTION retry_failed_translation_jobs() TO authenticated;

-- Create a view for easy monitoring
CREATE OR REPLACE VIEW translation_jobs_status AS
SELECT 
    status,
    COUNT(*) as count,
    MIN(created_at) as oldest_job,
    MAX(created_at) as newest_job,
    AVG(attempts) as avg_attempts
FROM translation_jobs
GROUP BY status
ORDER BY status;

-- Grant access to the view
GRANT SELECT ON translation_jobs_status TO authenticated;
