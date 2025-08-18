'use client';

import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';

type CodeConfirmationProps = {
  editableCodes: { code: string; class: string }[];
  onUpdateCode: (
    index: number,
    field: 'code' | 'class',
    newValue: string
  ) => void;
  onRemoveCode: (index: number) => void;
  onAddNewCode: () => void;
  onConfirmCodes: () => void;
};

export default function CodeConfirmation({
  editableCodes,
  onUpdateCode,
  onRemoveCode,
  onAddNewCode,
  onConfirmCodes,
}: CodeConfirmationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Konfirmasi Kode</CardTitle>
        <CardDescription>
          Periksa dan edit kode mata kuliah beserta kelasnya. Hapus yang salah
          atau tambah yang terlewat.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {editableCodes.map((item, index) => (
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
              key={`code-${item.code}-${item.class}-${index}`}
            >
              <Input
                className="flex-1"
                onChange={(e) => onUpdateCode(index, 'code', e.target.value)}
                placeholder="Kode MK (CIF65115)"
                type="text"
                value={item.code}
              />
              <Input
                className="w-20"
                maxLength={2}
                onChange={(e) => onUpdateCode(index, 'class', e.target.value)}
                placeholder="Kelas"
                type="text"
                value={item.class}
              />
              <Button
                onClick={() => onRemoveCode(index)}
                size="sm"
                variant="destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button className="flex-1" onClick={onAddNewCode} variant="outline">
          Tambah Kode
        </Button>
        <Button className="flex-1" onClick={onConfirmCodes}>
          Cari Kode Enroll
        </Button>
      </CardFooter>
    </Card>
  );
}
