"use client"

import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import { CourseData } from "../types/course"


type CourseResultsProps = {
  extractedCourses: CourseData[]
}

export function CourseResults({ extractedCourses }: CourseResultsProps) {
  const [copiedCode, copyToClipboard] = useCopyToClipboard()

  if (extractedCourses.length === 0) return null

  const handleCopy = async (enrollmentCode: string) => {
    copyToClipboard(enrollmentCode)

    if (!copiedCode) {
      toast.error("Gagal menyalin kode enrollment", {
        description: "Pastikan browser Anda mendukung clipboard API.",
      })
      return;
    }

    toast.success("Kode enrollment berhasil disalin ke clipboard", {
      description: "Anda dapat menempelkannya di halaman pendaftaran kelas.",
    })
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Kode Enrollment Ditemukan</CardTitle>
        <CardDescription className="text-base">
          {extractedCourses.length} kode enrollment berhasil diekstrak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {extractedCourses.map((course, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {course.kodeMK}
                    </span>
                    <span className="text-sm text-muted-foreground bg-card border border-border px-3 py-1 rounded-full">
                      Kelas {course.kelas}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{course.namaMK}</h3>
                  <p className="text-muted-foreground">{course.programStudi}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono bg-background border border-border px-4 py-2 rounded-lg font-semibold">
                      {course.kodeEnroll}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(course.kodeEnroll)}
                  className="border-border hover:bg-primary hover:text-primary-foreground"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
