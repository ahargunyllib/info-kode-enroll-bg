"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"

type FileState = {
  selectedFile: File | null
  previewUrl: string | null
  croppedImageUrl: string | null
  isCropping: boolean
}

export const useFileUpload = () => {
  const [fileState, setFileState] = useState<FileState>({
    selectedFile: null,
    previewUrl: null,
    croppedImageUrl: null,
    isCropping: false,
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
    setFileState({ selectedFile: file, previewUrl: url, croppedImageUrl: null, isCropping: false })
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setFileState({ selectedFile: file, previewUrl: url, croppedImageUrl: null, isCropping: false })
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const startCropping = () => {
    setFileState((prev) => ({ ...prev, isCropping: true }))
  }

  const handleCropComplete = (croppedUrl: string) => {
    setFileState((prev) => ({
      ...prev,
      croppedImageUrl: croppedUrl,
      isCropping: false,
    }))
  }

  const cancelCropping = () => {
    setFileState((prev) => ({ ...prev, isCropping: false }))
  }

  const resetFile = () => {
    if (fileState.previewUrl) {
      URL.revokeObjectURL(fileState.previewUrl)
    }

    if (fileState.croppedImageUrl) {
      URL.revokeObjectURL(fileState.croppedImageUrl)
    }

    setFileState({ selectedFile: null, previewUrl: null, croppedImageUrl: null, isCropping: false })
  }

  return {
    ...fileState,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    startCropping,
    handleCropComplete,
    cancelCropping,
    resetFile,
  }
}
