'use client';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type ExtractedTextDisplayProps = {
  extractedText: string;
  showRawText: boolean;
  onToggleRawText: () => void;
};

export default function ExtractedTextDisplay({
  extractedText,
  showRawText,
  onToggleRawText,
}: ExtractedTextDisplayProps) {
  if (!extractedText) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Teks yang Diekstrak
          <Button onClick={onToggleRawText} size="sm" variant="outline">
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
          <div className="max-h-40 overflow-y-auto rounded-md bg-gray-50 p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {extractedText}
            </pre>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
