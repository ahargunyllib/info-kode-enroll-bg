"use client"

import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

type ExtractedTextDisplayProps = {
  extractedText: string
  showRawText: boolean
  onToggleRawText: () => void
}

export default function ExtractedTextDisplay({ extractedText, showRawText, onToggleRawText }: ExtractedTextDisplayProps) {
  if (!extractedText) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Teks yang Diekstrak
          <Button variant="outline" size="sm" onClick={onToggleRawText}>
            {showRawText ? (
              <>
                <EyeOff />
                Sembunyikan
              </>
            ) : (
              <>
                <Eye />
                Lihat Teks
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      {showRawText && (
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-md max-h-40 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-mono">{extractedText}</pre>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
