"use client"

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
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
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <Edit3 className="h-6 w-6 text-primary" />
          Konfirmasi Kode
        </CardTitle>
        <CardDescription className="text-base">
          Periksa dan edit kode mata kuliah beserta kelasnya. Hapus yang salah atau tambah yang terlewat.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {editableCodes.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
              <input
                type="text"
                value={item.code}
                onChange={(e) => onUpdateCode(index, "code", e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background font-mono text-sm"
                placeholder="Kode MK (CIF65115)"
              />
              <input
                type="text"
                value={item.class}
                onChange={(e) => onUpdateCode(index, "class", e.target.value)}
                className="w-20 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background font-mono text-sm text-center"
                placeholder="Kelas"
                maxLength={2}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveCode(index)}
                className="text-destructive hover:text-destructive border-border"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onAddNewCode} className="flex-1 border-border bg-transparent">
            Tambah Kode
          </Button>
          <Button onClick={onConfirmCodes} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
            Konfirmasi & Cari Enrollment Code
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
