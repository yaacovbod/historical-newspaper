'use client'

import { useState } from 'react'

interface Props {
  text: string
  onReset: () => void
}

export default function OutputDisplay({ text, onReset }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {copied ? 'הועתק!' : 'העתק טקסט'}
        </button>
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          התחל מחדש
        </button>
      </div>
      <div
        className="border border-gray-300 rounded p-4 bg-white"
        style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
      >
        {text}
      </div>
    </div>
  )
}
