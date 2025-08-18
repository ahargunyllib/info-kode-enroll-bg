"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { FileImage, Crop } from 'lucide-react';
import type React from "react"
import ExampleImageDialog from "./example-image-dialog"
import { Button } from '@/shared/components/ui/button';

type FileUploadProps = {
  selectedFile: File | null
  previewUrl: string | null
  croppedImageUrl: string | null
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void
  onStartCropping: () => void
}

export default function FileUpload({ selectedFile, previewUrl, croppedImageUrl, onFileSelect, onDrop, onDragOver, onStartCropping }: FileUploadProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Upload Screenshot
        </CardTitle>
        <CardDescription>Drag & drop atau klik untuk memilih gambar jadwal kelas</CardDescription>
        <ExampleImageDialog />
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
                src={croppedImageUrl || previewUrl}
                alt="Preview"
                className="max-w-full max-h-80 mx-auto rounded-lg shadow-lg border border-border"
              />
              <p className="text-sm text-muted-foreground font-medium">{selectedFile?.name}</p>
              {!croppedImageUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartCropping()
                  }}
                  className="mt-2"
                >
                  <Crop className="h-4 w-4 mr-2" />
                  Crop Gambar
                </Button>
              )}
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
