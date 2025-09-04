import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
        <p className="text-white/80">Loading...</p>
      </div>
    </div>
  )
}
