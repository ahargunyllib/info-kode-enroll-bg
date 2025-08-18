"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { MajorArray, MajorMapKey } from "../lib/enums";

interface MajorSelectorProps {
  selectedMajor?: MajorMapKey
  setSelectedMajor: (major: MajorMapKey) => void
}

export default function MajorSelector({ selectedMajor, setSelectedMajor }: MajorSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pilih Program Studi</CardTitle>
        <CardDescription>Pilih program studi untuk mencari kode enrollment yang sesuai</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedMajor} onValueChange={setSelectedMajor}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih program studi..." />
          </SelectTrigger>
          <SelectContent>
            {MajorArray.map((program) => (
              <SelectItem key={program.key} value={program.key}>
                {program.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}
