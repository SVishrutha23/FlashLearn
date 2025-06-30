"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock progress data - in a real app, this would come from a database
const progressData = {
  spanish: {
    mastered: 60,
    inProgress: 30,
    challenging: 10,
    challengingWords: [
      {
        english: "Where is the station?",
        translation: "¿Dónde está la estación?",
        level: "Intermediate",
      },
      {
        english: "Please treat me well",
        translation: "Por favor, trátame bien",
        level: "Advanced",
      },
    ],
  },
  french: {
    mastered: 45,
    inProgress: 40,
    challenging: 15,
    challengingWords: [
      {
        english: "How much does it cost?",
        translation: "Combien ça coûte?",
        level: "Intermediate",
      },
      {
        english: "Do your best",
        translation: "Faites de votre mieux",
        level: "Advanced",
      },
    ],
  },
  japanese: {
    mastered: 30,
    inProgress: 50,
    challenging: 20,
    challengingWords: [
      {
        english: "Where is the station?",
        translation: "駅はどこですか？",
        level: "Intermediate",
      },
      {
        english: "Please treat me well",
        translation: "よろしくお願いします",
        level: "Advanced",
      },
    ],
  },
}

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"]

function LanguageProgress({ data, language }: { data: any; language: string }) {
  const chartData = [
    { name: "Mastered", value: data.mastered },
    { name: "In Progress", value: data.inProgress },
    { name: "Challenging", value: data.challenging },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{language} Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-semibold">Challenging Words</h3>
          <ul className="space-y-2">
            {data.challengingWords.map((word: any, index: number) => (
              <li key={index} className="flex flex-col gap-1 p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{word.english}</span>
                  <span className="text-sm text-muted-foreground">{word.level}</span>
                </div>
                <span className="text-sm text-muted-foreground">{word.translation}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProgressPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Tabs defaultValue="spanish" className="w-full">
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="spanish">Spanish</TabsTrigger>
          <TabsTrigger value="french">French</TabsTrigger>
          <TabsTrigger value="japanese">Japanese</TabsTrigger>
        </TabsList>
        <TabsContent value="spanish">
          <LanguageProgress data={progressData.spanish} language="spanish" />
        </TabsContent>
        <TabsContent value="french">
          <LanguageProgress data={progressData.french} language="french" />
        </TabsContent>
        <TabsContent value="japanese">
          <LanguageProgress data={progressData.japanese} language="japanese" />
        </TabsContent>
      </Tabs>
    </main>
  )
}

