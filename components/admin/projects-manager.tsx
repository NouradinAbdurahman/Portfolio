/**
 * Projects Manager Component
 * Handles multilingual project management with RTL/LTR support
 */

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Eye, 
  EyeOff,
  ExternalLink,
  Github,
  ArrowUp,
  ArrowDown
} from "lucide-react"
import { MultilangField } from "./multilang-field"
import { MixedContent } from "@/lib/rtl-utils"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image?: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
  problem?: string
  solution?: string
  outcome?: string
  features?: string[]
  architecture?: string
  challenges?: string[]
  learnings?: string[]
  impact?: string
  hidden?: boolean
  showDetails?: boolean
  showLive?: boolean
  showRepo?: boolean
}

interface ProjectsManagerProps {
  content: Record<string, any>
  onUpdate: (field: string, value: any) => void
  hiddenFields: Record<string, boolean>
  onToggleFieldHidden: (field: string) => void
  hiddenTranslations: Record<string, Record<string, boolean>>
  onToggleTranslationHidden: (field: string, locale: string) => void
}

export function ProjectsManager({
  content,
  onUpdate,
  hiddenFields,
  onToggleFieldHidden,
  hiddenTranslations,
  onToggleTranslationHidden
}: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [newProject, setNewProject] = useState<Partial<Project>>({})

  // Parse projects from content
  useEffect(() => {
    try {
      const projectsString = content.projects?.en || content.projects || '[]'
      const parsedProjects = typeof projectsString === 'string' ? JSON.parse(projectsString) : projectsString
      setProjects(Array.isArray(parsedProjects) ? parsedProjects : [])
    } catch (error) {
      console.error('Error parsing projects:', error)
      setProjects([])
    }
  }, [content.projects])

  const handleAddProject = () => {
    const project: Project = {
      id: `project_${Date.now()}`,
      slug: newProject.title?.toLowerCase().replace(/\s+/g, '-') || `project-${Date.now()}`,
      title: newProject.title || '',
      description: newProject.description || '',
      image: newProject.image || '',
      technologies: newProject.technologies || [],
      githubUrl: newProject.githubUrl || '',
      liveUrl: newProject.liveUrl || '',
      problem: newProject.problem || '',
      solution: newProject.solution || '',
      outcome: newProject.outcome || '',
      features: newProject.features || [],
      architecture: newProject.architecture || '',
      challenges: newProject.challenges || [],
      learnings: newProject.learnings || [],
      impact: newProject.impact || '',
      hidden: false,
      showDetails: true,
      showLive: true,
      showRepo: true
    }

    const updatedProjects = [...projects, project]
    setProjects(updatedProjects)
    onUpdate('projects', updatedProjects)
    setNewProject({})
  }

  const handleUpdateProject = (projectId: string, field: string, value: any) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, [field]: value } : project
    )
    setProjects(updatedProjects)
    onUpdate('projects', updatedProjects)
  }

  const handleDeleteProject = (projectId: string) => {
    const updatedProjects = projects.filter(project => project.id !== projectId)
    setProjects(updatedProjects)
    onUpdate('projects', updatedProjects)
  }

  const handleMoveProject = (projectId: string, direction: 'up' | 'down') => {
    const currentIndex = projects.findIndex(p => p.id === projectId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= projects.length) return

    const updatedProjects = [...projects]
    const [movedProject] = updatedProjects.splice(currentIndex, 1)
    updatedProjects.splice(newIndex, 0, movedProject)
    
    setProjects(updatedProjects)
    onUpdate('projects', updatedProjects)
  }

  const handleAddFeature = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newFeatures = [...(project.features || []), '']
    handleUpdateProject(projectId, 'features', newFeatures)
  }

  const handleUpdateFeature = (projectId: string, index: number, value: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newFeatures = [...(project.features || [])]
    newFeatures[index] = value
    handleUpdateProject(projectId, 'features', newFeatures)
  }

  const handleRemoveFeature = (projectId: string, index: number) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newFeatures = (project.features || []).filter((_, i) => i !== index)
    handleUpdateProject(projectId, 'features', newFeatures)
  }

  const handleAddTechnology = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newTechnologies = [...(project.technologies || []), '']
    handleUpdateProject(projectId, 'technologies', newTechnologies)
  }

  const handleUpdateTechnology = (projectId: string, index: number, value: string) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newTechnologies = [...(project.technologies || [])]
    newTechnologies[index] = value
    handleUpdateProject(projectId, 'technologies', newTechnologies)
  }

  const handleRemoveTechnology = (projectId: string, index: number) => {
    const project = projects.find(p => p.id === projectId)
    if (!project) return

    const newTechnologies = (project.technologies || []).filter((_, i) => i !== index)
    handleUpdateProject(projectId, 'technologies', newTechnologies)
  }

  return (
    <div className="space-y-6">
      {/* Add New Project */}
      <Card className="p-6 bg-transparent border-gray-300 dark:border-white/20">
        <h3 className="text-lg font-semibold mb-4 dark:text-white text-black">Add New Project</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="new-title">Title</Label>
            <Input
              id="new-title"
              value={newProject.title || ''}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              placeholder="Project title"
            />
          </div>
          <div>
            <Label htmlFor="new-description">Description</Label>
            <Textarea
              id="new-description"
              value={newProject.description || ''}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              placeholder="Project description"
              rows={3}
            />
          </div>
        </div>
        <Button onClick={handleAddProject} className="mt-4" disabled={!newProject.title}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card key={project.id} className="p-6 bg-transparent border-gray-300 dark:border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold dark:text-white text-black">
                  {project.title || 'Untitled Project'}
                </h4>
                <Badge variant={project.hidden ? 'secondary' : 'default'}>
                  {project.hidden ? 'Hidden' : 'Visible'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMoveProject(project.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMoveProject(project.id, 'down')}
                  disabled={index === projects.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpdateProject(project.id, 'hidden', !project.hidden)}
                >
                  {project.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {editingProject === project.id && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={project.slug}
                      onChange={(e) => handleUpdateProject(project.id, 'slug', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={project.githubUrl || ''}
                      onChange={(e) => handleUpdateProject(project.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      value={project.liveUrl || ''}
                      onChange={(e) => handleUpdateProject(project.id, 'liveUrl', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={project.image || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'image', e.target.value)}
                    placeholder="/projects/project-image.png"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Technologies</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddTechnology(project.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center gap-2">
                        <Input
                          value={tech}
                          onChange={(e) => handleUpdateTechnology(project.id, techIndex, e.target.value)}
                          placeholder="Technology name"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveTechnology(project.id, techIndex)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Features</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddFeature(project.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(project.features || []).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <Textarea
                          value={feature}
                          onChange={(e) => handleUpdateFeature(project.id, featureIndex, e.target.value)}
                          placeholder="Feature description"
                          rows={2}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveFeature(project.id, featureIndex)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Problem</Label>
                    <Textarea
                      value={project.problem || ''}
                      onChange={(e) => handleUpdateProject(project.id, 'problem', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Solution</Label>
                    <Textarea
                      value={project.solution || ''}
                      onChange={(e) => handleUpdateProject(project.id, 'solution', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label>Outcome</Label>
                  <Textarea
                    value={project.outcome || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'outcome', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Architecture</Label>
                  <Textarea
                    value={project.architecture || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'architecture', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Impact</Label>
                  <Textarea
                    value={project.impact || ''}
                    onChange={(e) => handleUpdateProject(project.id, 'impact', e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Visibility Controls */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`show-details-${project.id}`}
                      checked={project.showDetails !== false}
                      onChange={(e) => handleUpdateProject(project.id, 'showDetails', e.target.checked)}
                    />
                    <Label htmlFor={`show-details-${project.id}`}>Show Details Button</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`show-live-${project.id}`}
                      checked={project.showLive !== false}
                      onChange={(e) => handleUpdateProject(project.id, 'showLive', e.target.checked)}
                    />
                    <Label htmlFor={`show-live-${project.id}`}>Show Live Demo Button</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`show-repo-${project.id}`}
                      checked={project.showRepo !== false}
                      onChange={(e) => handleUpdateProject(project.id, 'showRepo', e.target.checked)}
                    />
                    <Label htmlFor={`show-repo-${project.id}`}>Show Repository Button</Label>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
