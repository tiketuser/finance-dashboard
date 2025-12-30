import StockCard from "@/app/components/cards/StockCard"

type StockPageProps = {
  params: Promise<{
    ticker: string
  }>
}

export default async function StockPage({ params }: StockPageProps) {
  const resolvedParams = await params
  const ticker = resolvedParams.ticker.toUpperCase()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <StockCard symbol={ticker} />
    </div>
  )
}
