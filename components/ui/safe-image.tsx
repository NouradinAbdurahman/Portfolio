"use client"

import * as React from "react"
import Image from "next/image"
import { useState } from "react"

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  onError?: () => void
}

export function SafeImage({ 
  src, 
  alt, 
  fill = false, 
  width, 
  height, 
  className, 
  sizes,
  priority = false,
  onError
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      // Try to convert ImgBB page URLs to direct image URLs
      if (src.includes('ibb.co/') && !src.includes('i.ibb.co/')) {
        const parts = src.split('/')
        const id = parts[parts.length - 1]
        if (id) {
          const directUrl = `https://i.ibb.co/${id}.jpg`
          setImgSrc(directUrl)
          return
        }
      }
      // Fallback to placeholder
      setImgSrc('/placeholder.jpg')
      onError?.()
    }
  }

  // If it's a local image path, ensure it starts with /
  const processedSrc = imgSrc.startsWith('/') ? imgSrc : imgSrc

  if (fill) {
    return (
      <Image
        src={processedSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        onError={handleError}
        unoptimized={src.startsWith('http') && !src.includes('i.ibb.co')}
      />
    )
  }

  return (
    <Image
      src={processedSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={handleError}
      unoptimized={src.startsWith('http') && !src.includes('i.ibb.co')}
    />
  )
}
