// biome-ignore-all lint/performance/noImgElement: false positive
// biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: false positive
// biome-ignore-all lint/nursery/useImageSize: false positive
'use client';

import { Crop, RotateCcw } from 'lucide-react';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type ImageCropperProps = {
  imageUrl: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onCancel: () => void;
};

const DASH_PATTERN = 5;

const QUALITY = 1;

export default function ImageCropper({
  imageUrl,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setIsDrawing(true);
      setStartPos({ x, y });
      setCurrentPos({ x, y });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) {
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCurrentPos({ x, y });

      // Clear and redraw
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      if (!(ctx && img)) {
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw selection rectangle
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([DASH_PATTERN, DASH_PATTERN]);
      ctx.strokeRect(
        Math.min(startPos.x, x),
        Math.min(startPos.y, y),
        Math.abs(x - startPos.x),
        Math.abs(y - startPos.y)
      );
    },
    [isDrawing, startPos]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) {
      return;
    }

    setIsDrawing(false);
    setCropArea({
      x: Math.min(startPos.x, currentPos.x),
      y: Math.min(startPos.y, currentPos.y),
      width: Math.abs(currentPos.x - startPos.x),
      height: Math.abs(currentPos.y - startPos.y),
    });
  }, [isDrawing, startPos, currentPos]);

  const handleCrop = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!(canvas && img) || cropArea.width === 0 || cropArea.height === 0) {
      return;
    }

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement('canvas');
    const cropCtx = cropCanvas.getContext('2d');
    if (!cropCtx) {
      return;
    }

    // Calculate scale factors
    const scaleX = img.naturalWidth / canvas.width;
    const scaleY = img.naturalHeight / canvas.height;

    // Set crop canvas size
    cropCanvas.width = cropArea.width * scaleX;
    cropCanvas.height = cropArea.height * scaleY;

    // Draw cropped image
    cropCtx.drawImage(
      img,
      cropArea.x * scaleX,
      cropArea.y * scaleY,
      cropArea.width * scaleX,
      cropArea.height * scaleY,
      0,
      0,
      cropCanvas.width,
      cropCanvas.height
    );

    // Convert to blob and create URL
    cropCanvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          onCropComplete(croppedUrl);
        }
      },
      'image/jpeg',
      QUALITY
    );
  }, [cropArea, onCropComplete]);

  const handleImageLoad = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!(canvas && img)) {
      return;
    }

    // Set canvas size to match container while maintaining aspect ratio
    const maxWidth = 800;
    const maxHeight = 600;
    const aspectRatio = img.naturalWidth / img.naturalHeight;

    let canvasWidth = maxWidth;
    let canvasHeight = maxWidth / aspectRatio;

    if (canvasHeight > maxHeight) {
      canvasHeight = maxHeight;
      canvasWidth = maxHeight * aspectRatio;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Draw image
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
  }, []);

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Crop className="h-6 w-6 text-primary" />
          Crop Gambar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <p className="mb-4 text-muted-foreground text-sm">
            Drag untuk memilih area tabel yang ingin di-crop
          </p>
          <div className="relative inline-block">
            <img
              alt="Original"
              className="hidden"
              onLoad={handleImageLoad}
              ref={imageRef}
              src={imageUrl || '/placeholder.svg'}
            />
            <canvas
              className="cursor-crosshair rounded-lg border border-border"
              onMouseDown={handleMouseDown}
              onMouseLeave={() => setIsDrawing(false)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              ref={canvasRef}
            />
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button onClick={onCancel} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Batal
          </Button>
          <Button
            disabled={cropArea.width === 0 || cropArea.height === 0}
            onClick={handleCrop}
          >
            <Crop className="mr-2 h-4 w-4" />
            Crop Gambar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
