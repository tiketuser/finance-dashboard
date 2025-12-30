"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type StockCardProps = {
  symbol: string
  className?: string
}

type StockQuote = {
  symbol: string
  price: number
  pe: number
  changePercent?: number
  previousClose?: number
  lastUpdated?: string
}

export function StockCard({ symbol, className }: StockCardProps) {
  const [data, setData] = React.useState<StockQuote | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const load = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/stocks/${encodeURIComponent(symbol)}/pe-ttm`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = (await res.json()) as StockQuote
        if (isMounted) setData(json)
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        if (isMounted) setError("Unable to load price.")
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [symbol])

  const title = symbol.toUpperCase()

  let content: React.ReactNode

  if (isLoading) {
    content = (
      <div className="space-y-3">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
    )
  } else if (error || !data || typeof data.price !== "number" || typeof data.pe !== "number") {
    content = (
      <p className="text-sm text-destructive">Unable to load price.</p>
    )
  } else {
    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(data.price)

    const formattedPE = new Intl.NumberFormat({}, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(data.pe)

    content = (
      <div className="space-y-1">
        <p className="text-md font-semibold tracking-tight"> 
          {formattedPE} P/E
        </p>
        <p className="text-3xl font-semibold tracking-tight">
          {formattedPrice}
        </p>
      </div>
    )
  }

  return (
    <>   
      <Card className={cn("h-full", className)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    </>

  )
}

export default StockCard
