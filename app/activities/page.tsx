"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

export default function GalleryPage() {
  const frames = [
    {
      title: "Microsoft Generative AI – YouCode",
      subtitle: "31 Mai 2025",
      media: ["/activities/microsoft/generative1.jpg",
        "/activities/microsoft/generative3.jpg",
        "/activities/microsoft/generative4.jpg",
        "/activities/microsoft/generative2.mp4",
      ]
    },
    {
      title: "Visite – Gitex Africa",
      subtitle: "14-15 Avril 2025",
      media: ["/activities/gitex/gitex1.jpg", 
        "/activities/gitex/gitex2.jpg", 
        "/activities/gitex/gitex3.jpg", 
        "/activities/gitex/gitex3.mp4", 
        ],
    },
    {
      title: "Conférence IA : Menace ou Opportunité",
      subtitle: "24 Février 2025",
      media: ["/activities/alouane/conference1.jpg", 
        "/activities/alouane/conference2.jpg", 
        "/activities/alouane/conference3.mp4", 
        ],
    },
    {
      title: "Science Week – UM6P",
      subtitle: "21 Février 2025",
      media: [
        "/activities/um6p/UM6P1.jpg", 
        "/activities/um6p/UM6P2.jpg", 
        "/activities/um6p/UM6P3.jpg", 
        "/activities/um6p/UM6P4.jpg", 
        "/activities/um6p/UM6P5.mp4", 

        ],
    },
    {
      title: "Geeks Blabla – YouCode",
      subtitle: "22 Février 2025",
      media: [
        "/activities/geeks/geeks1.jpg",
        "/activities/geeks/geeks2.jpg",
        "/activities/geeks/geeks3.jpg",
        "/activities/geeks/geeks4.jpg",
        "/activities/geeks/geeks5.mp4",
      ]
    },
    {
      title: "Journée RH dans l'IT – YouCode",
      subtitle: "16 Janvier 2025",
      media: [
        "/activities/youcode/IT1.jpg",  
        "/activities/youcode/IT2.jpg",  
        "/activities/youcode/IT3.jpg",  

        ],
    },
    {
      title: "Journée numérique – Alliance Française",
      subtitle: "30 Novembre 2024",
      media: [
        "/activities/alliance/alliance1.jpg",  
        "/activities/alliance/alliance2.jpg",  
        "/activities/alliance/alliance3.jpg",  
        "/activities/alliance/alliance4.jpg",  
        ],
    },
    {
      title: "Conférence Employabilité – RH YouCode",
      subtitle: "9 Novembre 2024",
      media: [
        "/activities/employabilite/employabilite.jpg", 
        ],
    },
  
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMedia, setModalMedia] = useState<string[]>([])
  const [modalIndex, setModalIndex] = useState(0)

  const openModal = (media: string[], index = 0) => {
    setModalMedia(media)
    setModalIndex(index)
    setModalOpen(true)
  }

  const prev = () => setModalIndex(i => (i === 0 ? modalMedia.length - 1 : i - 1))
  const next = () => setModalIndex(i => (i === modalMedia.length - 1 ? 0 : i + 1))

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
  <header className="w-full border-b bg-gray-50 dark:bg-gray-800">
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Club Media Gallery</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
  “Each event tells its story, framed with moments and memories 🎞️”      </p>
    </div>
  </header>

  {/* Gallery */}
  <section className="flex-1">
    <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 grid-cols-1 lg:grid-cols-3">
      {frames.map((frame, i) => (
        <PhotoCard
          key={i}
          title={frame.title}
          subtitle={frame.subtitle}
          media={frame.media}
          openModal={openModal}
        />
      ))}
    </div>
  </section>
</main>

  )
}

function PhotoCard({ title, subtitle, media, openModal }: { title: string; subtitle: string; media: string[]; openModal: (media: string[], index?: number) => void }) {
  const [index, setIndex] = useState(0)
  const current = media[index]
  const isVideo = current.endsWith(".mp4") || current.endsWith(".webm")

  const prev = () => setIndex(i => (i === 0 ? media.length - 1 : i - 1))
  const next = () => setIndex(i => (i === media.length - 1 ? 0 : i + 1))

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md relative flex flex-col">
      <CardContent className="p-0">
        <div className="relative">
          {isVideo ? (
            <video src={current} className="h-64 w-full object-cover" controls playsInline />
          ) : (
            <Image src={current} alt="Media" width={500} height={500} className="h-64 w-full object-cover" />
          )}

          {/* Carousel arrows */}
          <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70" onClick={prev}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70" onClick={next}>
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Fullscreen button */}
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/70" onClick={() => openModal(media, index)}>
            <Expand className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>

      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
    </Card>
  )
}
