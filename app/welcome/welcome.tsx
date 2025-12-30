"use client"

import StockCard from "@/app/components/cards/StockCard"
import { SearchBar } from "@/app/components/SerachBar/SearchBar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"

export function Welcome() {
    const featuredTickers = ["NVDA", "AAPL", "AMZN", "GOOG", "META", "IBM"] as const
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-10">
        <section className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">💸עכשיו תבין הכל</h1>
            <p className="text-muted-foreground">
            קבל עדכוני שוק בזמן אמת ומידע פיננסי חיוני בלחיצת כפתור
            </p>
        </section>

        <Carousel
            opts={{
            align: "start",
            loop: true,
            }}
            className="w-full max-w-5xl"
            plugins={[Autoplay({ delay: 2500 })]}
        >
            <CarouselContent>
            {featuredTickers.map((symbol) => (
                <CarouselItem
                key={symbol}
                className="md:basis-1/4 lg:basis-1/4 xl:basis-1/4"
                >
                <div className="p-2">
                    <StockCard symbol={symbol} />
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
        </Carousel>

        <SearchBar />
        
        </div>
    )
}