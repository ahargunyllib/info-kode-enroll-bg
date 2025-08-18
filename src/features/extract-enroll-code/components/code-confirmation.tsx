"use client"

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Edit3, X } from "lucide-react";

type CodeConfirmationProps = {
  editableCodes: { code: string; class: string }[]
  onUpdateCode: (index: number, field: "code" | "class", newValue: string) => void
  onRemoveCode: (index: number) => void
  onAddNewCode: () => void
  onConfirmCodes: () => void
}

export default function CodeConfirmation({
  editableCodes,
  onUpdateCode,
  onRemoveCode,
  onAddNewCode,
  onConfirmCodes,
}: CodeConfirmationProps) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3">
          <Edit3 className="h-6 w-6 text-primary" />
          Konfirmasi Kode
        </CardTitle>
        <CardDescription>
          Periksa dan edit kode mata kuliah beserta kelasnya. Hapus yang salah atau tambah yang terlewat.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {editableCodes.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
              <Input
                type="text"
                value={item.code}
                onChange={(e) => onUpdateCode(index, "code", e.target.value)}
                className="flex-1"
                placeholder="Kode MK (CIF65115)"
              />
              <Input
                type="text"
                value={item.class}
                onChange={(e) => onUpdateCode(index, "class", e.target.value)}
                className="w-20"
                placeholder="Kelas"
                maxLength={2}
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemoveCode(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onAddNewCode} className="flex-1">
            Tambah Kode
          </Button>
          <Button onClick={onConfirmCodes} className="flex-1">
            Cari Kode Enroll
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
