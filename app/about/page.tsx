import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>About FLASH LEARN</CardTitle>
        </CardHeader>
        <CardContent className="prose">
          <p>
            FLASH LEARN is an interactive language learning platform designed to help you master Spanish, French, and
            Japanese through engaging flashcards and quizzes.
          </p>

          <h3>Our Mission</h3>
          <p>
            We believe that learning a new language should be accessible, enjoyable, and effective. Our platform
            combines proven learning methods with modern technology to create an engaging learning experience.
          </p>

          <h3>Features</h3>
          <ul>
            <li>Interactive flashcards with pronunciations</li>
            <li>Quiz mode to test your knowledge</li>
            <li>Progress tracking</li>
            <li>Multiple language support</li>
            <li>Customizable learning experience</li>
          </ul>

          <h3>Get Started</h3>
          <p>
            Join thousands of learners who have already started their language learning journey with FLASH LEARN. Sign
            up today and take the first step towards mastering a new language.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

