"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { FileImage, Upload } from "lucide-react"
import type React from "react"

type FileUploadProps = {
  selectedFile: File | null
  previewUrl: string | null
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
}

export default function FileUpload({ selectedFile, previewUrl, onFileSelect, onDrop, onDragOver }: FileUploadProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <Upload className="h-6 w-6 text-primary" />
          Upload Screenshot
        </CardTitle>
        <CardDescription>Drag & drop atau klik untuk memilih gambar jadwal kelas</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-all duration-200 cursor-pointer bg-card/50"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full max-h-80 mx-auto rounded-lg shadow-lg border border-border"
              />
              <p className="text-sm text-muted-foreground font-medium">{selectedFile?.name}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <FileImage className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <p className="text-xl font-semibold text-foreground mb-2">Pilih gambar jadwal kelas</p>
                <p className="text-muted-foreground">PNG, JPG, JPEG hingga 10MB</p>
              </div>
            </div>
          )}
        </div>
        <input id="file-input" type="file" accept="image/*" onChange={onFileSelect} className="hidden" />
      </CardContent>
    </Card>
  )
}
