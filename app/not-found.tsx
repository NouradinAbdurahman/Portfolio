"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-accent via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-accent mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Page Not Found
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-300 mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-gray-400">
              It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              asChild
              size="lg"
              className="group bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
            >
              <Link href="/" className="flex items-center space-x-2">
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Go Home</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group border-gray-600 hover:border-accent text-gray-300 hover:text-accent px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:bg-gray-800/50"
            >
              <Link href="/projects" className="flex items-center space-x-2">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>View Projects</span>
              </Link>
            </Button>
          </div>

          {/* Helpful Links Card */}
          <Card className="p-6 bg-white/5 backdrop-blur-sm border-gray-700/50 hover:border-accent/50 transition-all duration-300">
            <h3 className="text-xl font-semibold text-white mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link 
                href="/" 
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
              >
                <Home className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Home</span>
              </Link>
              <Link 
                href="/projects" 
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
              >
                <Search className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Projects</span>
              </Link>
              <Link 
                href="/#about" 
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">About Me</span>
              </Link>
              <Link 
                href="/#contact" 
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 text-accent group-hover:scale-110 transition-transform duration-200" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">Contact</span>
              </Link>
            </div>
          </Card>

          {/* Back Button */}
          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="group text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Go Back
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-accent/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  )
}