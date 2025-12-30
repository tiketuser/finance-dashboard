import { NextResponse } from "next/server"

export function validateQuoteRequest(
  symbol?: string,
  apiKey?: string
): { normalizedSymbol?: string; apiKey?: string; errorResponse?: NextResponse } {
  if (!apiKey) {
    return {
      errorResponse: NextResponse.json(
        { error: "Missing FINNHUB_API_KEY" },
        { status: 500 }
      ),
    }
  }

  if (!symbol) {
    return {
      errorResponse: NextResponse.json(
        { error: "Symbol parameter is required" },
        { status: 400 }
      ),
    }
  }

  return { normalizedSymbol: symbol.toUpperCase(), apiKey }
}

export function validateQuotePayload(data: { c?: number | string }) {
  const price = Number(data.c)

  if (!Number.isFinite(price)) {
    return {
      errorResponse: NextResponse.json(
        { error: "Quote payload did not include a valid price", data },
        { status: 502 }
      ),
    }
  }

  if (price === 0) {
    return {
      errorResponse: NextResponse.json(
        { error: "Stock was not found" },
        { status: 400 }
      ),
    }
  }

  return { price }
}
