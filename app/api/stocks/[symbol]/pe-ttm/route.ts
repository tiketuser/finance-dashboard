import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Simplest Finnhub HTTP quote proxy: returns { symbol, price }
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params
  const apiKey = process.env.FINNHUB_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing FINNHUB_API_KEY" },
      { status: 500 }
    )
  }

  if (!symbol) {
    return NextResponse.json(
      { error: "Symbol parameter is required" },
      { status: 400 }
    )
  }

  const url = new URL("stock/metric",
    process.env.FINNHUB_API_URL ?? "https://finnhub.io/api/v1"
  )

  const new_params = new URLSearchParams({
    symbol: symbol.toUpperCase(),
    token: apiKey
  });
  
  url.searchParams.set("symbol", symbol.toUpperCase())
  url.searchParams.set("metric", "all")
  url.searchParams.set("token", apiKey)

  const res = await fetch(url)
  const data = (await res.json()) as { metric?: { epsInclExtraItemsTTM?: number | string }; error?: string }

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "Failed to reach Finnhub" },
      { status: res.status }
    )
  }

  const epsInclExtraItemsTTM = Number(data.metric?.epsInclExtraItemsTTM)
  if (!Number.isFinite(epsInclExtraItemsTTM)) {
    return NextResponse.json(
      { error: "Quote payload did not include a valid price", data },
      { status: 502 }
    )
  }

  const priceRes = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/api/stocks/${encodeURIComponent(symbol)}/price`
  )
  const pricePayload = (await priceRes.json()) as { price?: number; error?: string }

  if (!priceRes.ok) {
    return NextResponse.json(
      { error: pricePayload.error || "Failed to load price for P/E calculation" },
      { status: priceRes.status }
    )
  }

  const price = Number(pricePayload.price)
  if (!Number.isFinite(price)) {
    return NextResponse.json(
      { error: "Price payload did not include a valid price", pricePayload },
      { status: 502 }
    )
  }

  return NextResponse.json({ symbol: symbol.toUpperCase(), price: price, pe: price / epsInclExtraItemsTTM })
}
