"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Languages, BookOpen, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Learn Spanish",
    description: "Master everyday Spanish conversations with interactive flashcards",
    icon: Languages,
  },
  {
    title: "Practice French",
    description: "Build your French vocabulary through engaging exercises",
    icon: BookOpen,
  },
  {
    title: "Study Japanese",
    description: "Learn Japanese characters and phrases step by step",
    icon: Award,
  },
]

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center text-white space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">FLASH LEARN</h1>
            <p className="text-xl md:text-2xl max-w-2xl">Master Languages, One Flashcard at a Time</p>

            <div className="relative w-full max-w-4xl mt-12">
              <div className="overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm p-8">
                <div
                  className="transition-all duration-500 transform"
                  style={{ transform: `translateX(-${currentFeature * 100}%)` }}
                >
                  <div className="flex">
                    {features.map((feature, index) => (
                      <div key={index} className="w-full flex-shrink-0 px-4" style={{ width: "100%" }}>
                        <div className="flex flex-col items-center space-y-4">
                          <feature.icon className="w-16 h-16" />
                          <h3 className="text-2xl font-semibold">{feature.title}</h3>
                          <p className="text-lg">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={prevFeature}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextFeature}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <Link href="/login">
              <Button size="lg" className="mt-8 text-lg bg-white text-purple-600 hover:bg-white/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border">
              <Languages className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Multiple Languages</h3>
              <p className="text-center text-muted-foreground">Learn Spanish, French, and Japanese at your own pace</p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border">
              <BookOpen className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Interactive Learning</h3>
              <p className="text-center text-muted-foreground">
                Practice with flashcards and test your knowledge with quizzes
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg border">
              <Award className="w-12 h-12 text-primary" />
              <h3 className="text-xl font-semibold">Track Progress</h3>
              <p className="text-center text-muted-foreground">
                Monitor your learning journey with detailed progress tracking
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

