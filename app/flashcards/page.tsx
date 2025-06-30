"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flashcard } from "@/components/flashcard"
import { flashcardData } from "@/lib/flashcard-data"
import { useRef } from "react"

export default function FlashcardsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("spanish")
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [customFlashcards, setCustomFlashcards] = useState<Record<string, Record<string, any[]>>>({})

  const currentFlashcards = [
    ...(flashcardData[selectedLanguage as keyof typeof flashcardData]?.[
      selectedLevel as "beginner" | "intermediate" | "advanced"
    ] || []),
    ...(customFlashcards[selectedLanguage]?.[selectedLevel] || []),
  ]

  const handleAddFlashcard = (newFlashcard: any) => {
    setCustomFlashcards((prev) => ({
      ...prev,
      [selectedLanguage]: {
        ...prev[selectedLanguage],
        [selectedLevel]: [...(prev[selectedLanguage]?.[selectedLevel] || []), newFlashcard],
      },
    }))
  }

  const handleNext = () => {
    if (currentIndex < currentFlashcards.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const speak = (text: string, language: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    switch (language) {
      case 'spanish':
        utterance.lang = 'es-ES'
        break
      case 'french':
        utterance.lang = 'fr-FR'
        break
      case 'japanese':
        utterance.lang = 'ja-JP'
        break
      case 'german':
        utterance.lang = 'de-DE'
        break
      case 'hindi':
        utterance.lang = 'hi-IN'
        break
      case 'kannada':
        utterance.lang = 'kn-IN'
        break
      default:
        utterance.lang = 'en-US'
    }
    speechSynthesis.speak(utterance)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-md space-y-4">
          <div className="flex gap-4">
            <Select
              value={selectedLanguage}
              onValueChange={(value) => {
                setSelectedLanguage(value)
                setCurrentIndex(0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedLevel}
              onValueChange={(value) => {
                setSelectedLevel(value)
                setCurrentIndex(0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Add Custom Flashcard
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Flashcard</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleAddFlashcard({
                    english: formData.get("english"),
                    translation: formData.get("translation"),
                    pronunciation: formData.get("pronunciation"),
                  })
                  ;(e.target as HTMLFormElement).reset()
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="english">English</Label>
                  <Input id="english" name="english" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="translation">Translation</Label>
                  <Input id="translation" name="translation" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pronunciation">Pronunciation</Label>
                  <Input id="pronunciation" name="pronunciation" required />
                  <Button type="button" onClick={() => speak((document.getElementById("pronunciation") as HTMLInputElement).value, selectedLanguage)}>
                    Pronounce
                  </Button>
                </div>
                <Button type="submit" className="w-full">
                  Add Flashcard
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full max-w-2xl">
          {currentFlashcards.length > 0 ? (
            <div>
              <Flashcard
                {...currentFlashcards[currentIndex]}
                language={selectedLanguage}
                level={selectedLevel}
                onNext={currentIndex < currentFlashcards.length - 1 ? handleNext : undefined}
                onPrevious={currentIndex > 0 ? handlePrevious : undefined}
              />
              <Button type="button" onClick={() => speak(currentFlashcards[currentIndex].pronunciation, selectedLanguage)}>
                Pronounce
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">No flashcards available for this selection</div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          Card {currentIndex + 1} of {currentFlashcards.length}
        </div>
      </div>
    </main>
  )
}

