"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"

type FileState = {
  selectedFile: File | null
  previewUrl: string | null
}

export const useFileUpload = () => {
  const [fileState, setFileState] = useState<FileState>({
    selectedFile: null,
    previewUrl: null,
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("File tidak valid.", {
        description: "Silakan pilih file gambar (PNG, JPG, JPEG)",
      })
      return;
    }

    const url = URL.createObjectURL(file)
    setFileState({ selectedFile: file, previewUrl: url })
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setFileState({ selectedFile: file, previewUrl: url })
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const resetFile = () => {
    if (fileState.previewUrl) {
      URL.revokeObjectURL(fileState.previewUrl)
    }

    setFileState({ selectedFile: null, previewUrl: null })
  }

  return {
    ...fileState,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    resetFile,
  }
}
