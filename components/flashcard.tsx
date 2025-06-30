"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FlashcardProps {
  english: string
  translation: string
  pronunciation: string
  language: string
  level: string
  onNext?: () => void
  onPrevious?: () => void
}

export function Flashcard({
  english,
  translation,
  pronunciation,
  language,
  level,
  onNext,
  onPrevious,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [startX, setStartX] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return

    const currentX = e.touches[0].clientX
    const diff = startX - currentX

    if (Math.abs(diff) > 50) {
      if (diff > 0 && onNext) {
        onNext()
      } else if (diff < 0 && onPrevious) {
        onPrevious()
      }
      setStartX(null)
    }
  }

  const handleTouchEnd = () => {
    setStartX(null)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && onPrevious) {
        onPrevious()
      } else if (e.key === "ArrowRight" && onNext) {
        onNext()
      } else if (e.key === " ") {
        setIsFlipped((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [onNext, onPrevious])

  return (
    <div className="relative">
      {onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-muted rounded-full p-2 hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      <div
        ref={cardRef}
        className="perspective-1000 w-full h-64 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-muted-foreground mb-2">
              {language} - {level}
            </div>
            <div className="text-2xl font-bold">{english}</div>
            <div className="mt-4 text-sm text-muted-foreground">Click to flip or press spacebar</div>
          </Card>

          <Card className="absolute w-full h-full backface-hidden p-6 flex flex-col items-center justify-center text-center rotate-y-180">
            <div className="text-sm text-muted-foreground mb-2">
              {language} - {level}
            </div>
            <div className="text-2xl font-bold">{translation}</div>
            <div className="mt-2 text-sm text-muted-foreground">Pronunciation: {pronunciation}</div>
          </Card>
        </div>
      </div>

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-muted rounded-full p-2 hover:bg-accent transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

