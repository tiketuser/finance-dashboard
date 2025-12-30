"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

export function SearchBar() {
  const router = useRouter()
  const [ticker, setTicker] = React.useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = ticker.trim()
    if (!trimmed) return

    router.push(`/stockpage/${encodeURIComponent(trimmed.toUpperCase())}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full max-w-md gap-6"
      dir="rtl"
    >
      <InputGroup className="h-12 rounded-full px-4 shadow-sm">
        <InputGroupInput
          className="text-base"
          placeholder="חפש סימון או שאל אותי שאלה"
          value={ticker}
          onChange={(event) => setTicker(event.target.value)}
        />
        <InputGroupAddon className="mr-3 rounded-full px-3 py-2">
          <button
            type="submit"
          >
            <SearchIcon className="size-5" />
          </button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
