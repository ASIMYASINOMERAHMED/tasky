"use client"
import * as React from "react"
import { useEffect, useState } from "react"


export default function AnimatedText({ text, className = "" }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, text])

  return (
    <span className={`${className} ${isComplete ? "" : "after:content-['|'] after:animate-blink after:ml-1"}`}>
      {displayedText}
    </span>
  )
}

