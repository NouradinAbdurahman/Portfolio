import { Loader2 } from "lucide-react"
import Aurora from "@/components/ui/aurora"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#060010] bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Aurora
          colorStops={["#060010", "#B19EEF", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="text-center relative z-10">
        <Loader2 className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
        <p className="text-white/80">Loading...</p>
      </div>
    </div>
  )
}
