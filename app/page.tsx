export default function Home() {
  const stocks = ["stock 1", "stock 4", "stock 3"];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-emerald-50 to-white">
      <main className="flex w-full max-w-5xl flex-col items-center gap-12 px-6 py-16 text-neutral-900">
        <h1
          className="text-center text-4xl font-semibold leading-tight sm:text-5xl"
          dir="rtl"
        >
          להיות מומחה על הפעם הראשונה
        </h1>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
          {stocks.map((stock) => (
            <div
              key={stock}
              className="flex h-36 items-center justify-center rounded-md border border-emerald-900/25 bg-emerald-200 text-lg font-semibold text-neutral-800 shadow-sm"
            >
              {stock}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full border border-emerald-900/35 bg-emerald-200 px-8 py-3 text-lg font-semibold text-neutral-900 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          dir="rtl"
        >
          חפש מניה שמעניינת אותך
        </button>
      </main>
    </div>
  );
}
