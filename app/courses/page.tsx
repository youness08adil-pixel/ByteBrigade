// app/page.tsx or ResourcePage.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import prisma from "../lib/db"
import { unstable_noStore as noStore } from "next/cache"

async function getCourses() {
  noStore()

  const data = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      exercise: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  })

  return data
}

export default async function ResourcePage() { // <-- mark async
const courses = (await getCourses()).map((note) => ({
  ...note,
  createdAt: note.createdAt.toISOString(),
  updatedAt: note.updatedAt.toISOString(),
  userId: note.userId ?? "", // ensure it's a string
}))


  const lessons = [
    {
      title: "Formation HTML",
      driveLink: "https://drive.google.com/drive/folders/xxxxxxx",
      lessonPdf: "/pdfs/lesson1.pdf",
      exercisePdf: "/pdfs/ex1.pdf",
    },
    {
      title: "Programmation en JavaScript",
      driveLink: "https://drive.google.com/drive/folders/yyyyyyy",
      lessonPdf: "/pdfs/lesson2.pdf",
      exercisePdf: null, // no exercise available
    },
  ]


  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  {/* Header */}
  <header className="w-full border-b bg-gray-50 dark:bg-gray-800">
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Mes Ressources</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Retrouvez ici vos cours, leçons et exercices 📚
      </p>
    </div>
  </header>

      {/* Content */}
      <section className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((lesson, i) => (
              <LessonCard key={i} lesson={lesson} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* === Lesson Card === */
function LessonCard({
  lesson,
}: {
  lesson: {
    id: string
    title: string
    description: string
    exercise: string
    createdAt: string
    updatedAt: string
    userId: string
  }
}) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-md flex flex-col">
      {/* Image */}
      
      {/* Content */}
      <CardHeader>
        <CardTitle>{lesson.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">

        {/* Lesson PDF */}
        <div>
          <h3 className="text-lg font-semibold">Leçon</h3>
          <Button asChild  className="mt-1">
            <a href={lesson.description} target="_blank">
              Télécharger la leçon (PDF)
            </a>
          </Button>
        </div>

        {/* Exercises */}
        <div>
          <h3 className="text-lg font-semibold">Exercices</h3>
          {lesson.exercise ? (
            <Button asChild variant="secondary" className="mt-1">
              <a href={lesson.exercise} target="_blank">
                Télécharger les exercices (PDF)
              </a>
            </Button>
          ) : (
            <p className="text-gray-500 mt-1">Aucun exercice disponible.</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">Exercices</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            created at {lesson.createdAt.split("T")[0]}
          </p>          
        </div>
      </CardContent>
    </Card>
  )
}
