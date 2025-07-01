# FLASH LEARN

FLASH LEARN is an interactive language learning platform designed to help users master Spanish, French, and Japanese (and more) through engaging flashcards, quizzes, and progress tracking. Built with Next.js, React, and Tailwind CSS, it offers a modern, customizable, interactive and accessible learning experience.

## Features

- **Interactive Flashcards**: Practice vocabulary and phrases with flip cards, including pronunciation guides and audio support.
- **Quiz Mode**: Test your knowledge with randomized quizzes and receive feedback on challenging words.
- **Progress Tracking**: Visualize your mastery, in-progress, and challenging words for each language.
- **Multiple Languages**: Currently supports Spanish, French, Japanese, German, Hindi, and Kannada.
- **Custom Flashcards**: Add your own flashcards to personalize your learning.
- **Responsive UI**: Modern, mobile-friendly design using Tailwind CSS and Radix UI components.
- **Accessible**: Keyboard navigation and screen reader friendly.

## Project Structure

```
flash-learn/
  app/                # Next.js app directory (pages, layouts, routes)
    about/            # About page
    contact/          # Contact form
    flashcards/       # Flashcard learning interface
    login/            # Login/Sign-up page
    progress/         # Progress tracking
    quiz/             # Quiz mode
    globals.css       # App-level global styles
    layout.tsx        # Root layout
    page.tsx          # Landing page
  components/         # Reusable React components
    flashcard.tsx     # Flashcard UI component
    navigation.tsx    # Top navigation bar
    theme-provider.tsx# Theme context provider
    ui/               # UI primitives (buttons, cards, dialogs, etc.)
  hooks/              # Custom React hooks
  lib/                # Utility libraries and flashcard data
  public/             # Static assets (logo, images)
  styles/             # Global Tailwind CSS styles
  package.json        # Project metadata and dependencies
  tailwind.config.ts  # Tailwind CSS configuration
  tsconfig.json       # TypeScript configuration
  next.config.mjs     # Next.js configuration
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Tech Stack
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (for accessible UI components)
- [Lucide Icons](https://lucide.dev/)

## Customization
- Add or edit flashcard data in `lib/flashcard-data.ts`.
- UI components can be extended or replaced in the `components/` directory.
- Tailwind theme can be customized in `tailwind.config.ts` and `styles/globals.css`.

---

**FLASH LEARN** — Master Languages, One Flashcard at a Time! 
