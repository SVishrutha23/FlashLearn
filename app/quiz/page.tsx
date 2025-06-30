"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flashcard } from "@/components/flashcard"
import { flashcardData } from "@/lib/flashcard-data"

type QuizState = {
  currentIndex: number
  correctAnswers: number
  challengingWords: number[]
  isComplete: boolean
}

export default function QuizPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("spanish")
  const [selectedLevel, setSelectedLevel] = useState("beginner")
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    correctAnswers: 0,
    challengingWords: [],
    isComplete: false,
  })

  const currentFlashcards =
    flashcardData[selectedLanguage as keyof typeof flashcardData]?.[
      selectedLevel as "beginner" | "intermediate" | "advanced"
    ] || []

  const shuffledFlashcards = useState(() => [...currentFlashcards].sort(() => Math.random() - 0.5))[0]

  const handleAnswer = (isCorrect: boolean) => {
    setQuizState((prev) => {
      const newState = { ...prev }

      if (!isCorrect) {
        newState.challengingWords = [...prev.challengingWords, prev.currentIndex]
      } else {
        newState.correctAnswers = prev.correctAnswers + 1
      }

      if (prev.currentIndex + 1 < shuffledFlashcards.length) {
        newState.currentIndex = prev.currentIndex + 1
      } else {
        newState.isComplete = true
      }

      return newState
    })
  }

  const startNewQuiz = () => {
    setQuizState({
      currentIndex: 0,
      correctAnswers: 0,
      challengingWords: [],
      isComplete: false,
    })
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
    startNewQuiz()
  }

  const handleLevelChange = (value: string) => {
    setSelectedLevel(value)
    startNewQuiz()
  }

  if (quizState.isComplete) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Quiz Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Total flashcards:</span>
                <span className="font-medium">{shuffledFlashcards.length}</span>
              </p>
              <p className="flex justify-between">
                <span>Correct answers:</span>
                <span className="font-medium">{quizState.correctAnswers}</span>
              </p>
              <p className="flex justify-between">
                <span>Mastery:</span>
                <span className="font-medium">
                  {Math.round((quizState.correctAnswers / shuffledFlashcards.length) * 100)}%
                </span>
              </p>
            </div>

            {quizState.challengingWords.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Words to Review:</h3>
                <ul className="space-y-2">
                  {quizState.challengingWords.map((index) => (
                    <li key={index} className="flex flex-col gap-1 p-3 bg-muted rounded-lg">
                      <span className="font-medium">{shuffledFlashcards[index].english}</span>
                      <span className="text-sm text-muted-foreground">{shuffledFlashcards[index].translation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <Button onClick={startNewQuiz} className="flex-1">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLanguage("spanish")
                  setSelectedLevel("beginner")
                  startNewQuiz()
                }}
                className="flex-1"
              >
                Change Level
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (shuffledFlashcards.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">No flashcards available for this selection.</p>
              <div className="flex gap-4">
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={handleLevelChange}>
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
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Quiz Mode</h1>
            <p className="text-sm text-muted-foreground capitalize">
              {selectedLanguage} - {selectedLevel}
            </p>
          </div>

          <div className="flex gap-4">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={handleLevelChange}>
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
        </div>

        <div className="space-y-8">
          <Flashcard
            {...shuffledFlashcards[quizState.currentIndex]}
            language={selectedLanguage}
            level={selectedLevel}
          />

          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Card {quizState.currentIndex + 1} of {shuffledFlashcards.length}
            </p>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => handleAnswer(false)} className="w-32">
                Incorrect
              </Button>
              <Button onClick={() => handleAnswer(true)} className="w-32">
                Correct
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

