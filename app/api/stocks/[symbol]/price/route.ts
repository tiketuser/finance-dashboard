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

  const url = new URL("quote",
    process.env.FINNHUB_API_URL ?? "https://finnhub.io/api/v1"
  )

  const new_params = new URLSearchParams({
    symbol: symbol.toUpperCase(),
    token: apiKey
  });
  
  url.searchParams.set("symbol", symbol.toUpperCase())
  url.searchParams.set("token", apiKey)

  const res = await fetch(url)
  const data = (await res.json()) as { c?: number | string; error?: string }

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error || "Failed to reach Finnhub" },
      { status: res.status }
    )
  }

  const price = Number(data.c)
  if (!Number.isFinite(price)) {
    return NextResponse.json(
      { error: "Quote payload did not include a valid price", data },
      { status: 502 }
    )
  }

  return NextResponse.json({ symbol: symbol.toUpperCase(), price })
}