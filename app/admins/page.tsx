import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function GalleryPage() {
  const images = [
    "/admins/ikram.jpg",
    "/admins/fati.jpg",
    "/admins/aya.jpg",
    "/admins/fatima.jpg",
    "/admins/anas.jpg",
    "/admins/ikram bel.jpg",
    "/admins/zineb.jpg",
    "/admins/touria.jpg",
  ]

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  {/* Header */}
  <header className="w-full border-b bg-gray-50 dark:bg-gray-800">
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Membres du Bureau – 2024-2025</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Byte Brigade Bureau Members
      </p>
    </div>
  </header>

  {/* Gallery */}
  <section className="flex-1">
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {images.map((src, i) => (
          <Card key={i} className="overflow-hidden rounded-2xl shadow-md">
            <CardContent className="p-0">
              <Image
                src={src}
                alt={`Photo ${i + 1}`}
                width={500}
                height={500}
                className="h-64 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
</main>

  )
}
