// biome-ignore-all lint/a11y/useKeyWithClickEvents: false positive
// biome-ignore-all lint/nursery/useImageSize: false positive
// biome-ignore-all lint/performance/noImgElement: false positive
// biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: false positive
// biome-ignore-all lint/a11y/noStaticElementInteractions: false positive

'use client';

import { Crop, FileImage } from 'lucide-react';
import type React from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import ExampleImageDialog from './example-image-dialog';

type FileUploadProps = {
  selectedFile: File | null;
  previewUrl: string | null;
  croppedImageUrl: string | null;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onStartCropping: () => void;
};

export default function FileUpload({
  selectedFile,
  previewUrl,
  croppedImageUrl,
  onFileSelect,
  onDrop,
  onDragOver,
  onStartCropping,
}: FileUploadProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Screenshot</CardTitle>
        <CardDescription>
          Drag & drop atau klik untuk memilih gambar jadwal kelas
        </CardDescription>
        <ExampleImageDialog />
      </CardHeader>
      <CardContent>
        <div
          className="cursor-pointer rounded-xl border-2 border-border border-dashed bg-card/50 p-12 text-center transition-all duration-200 hover:border-primary/50"
          onClick={() => document.getElementById('file-input')?.click()}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          {previewUrl ? (
            <div className="space-y-4">
              <img
                alt="Preview"
                className="mx-auto max-h-80 max-w-full rounded-lg border border-border shadow-lg"
                src={croppedImageUrl || previewUrl}
              />
              <p className="font-medium text-muted-foreground text-sm">
                {selectedFile?.name}
              </p>
              {!croppedImageUrl && (
                <Button
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartCropping();
                  }}
                  size="sm"
                  variant="outline"
                >
                  <Crop className="mr-2 h-4 w-4" />
                  Crop Gambar
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <FileImage className="mx-auto h-16 w-16 text-muted-foreground" />
              <div>
                <p className="mb-2 font-semibold text-foreground text-xl">
                  Pilih gambar jadwal kelas
                </p>
                <p className="text-muted-foreground">
                  PNG, JPG, JPEG hingga 10MB
                </p>
              </div>
            </div>
          )}
        </div>
        <input
          accept="image/*"
          className="hidden"
          id="file-input"
          onChange={onFileSelect}
          type="file"
        />
      </CardContent>
    </Card>
  );
}
