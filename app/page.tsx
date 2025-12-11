"use client"

import * as React from "react"

import StockCard from "@/app/components/cards/StockCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const featuredTickers = ["NVDA", "AAPL", "AMZN", "GOOG", "META", "IBM"] as const

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-10">
      <section className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold">עכשיו תדע הכל</h1>
        <p className="text-muted-foreground">
          קבל עדכוני שוק בזמן אמת ומידע פיננסי חיוני בלחיצת כפתור
        </p>
      </section>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl"
        plugins={[Autoplay({ delay: 2000 })]}
      >
        <CarouselContent>
          {featuredTickers.map((symbol) => (
            <CarouselItem
              key={symbol}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-2">
                <StockCard symbol={symbol} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
