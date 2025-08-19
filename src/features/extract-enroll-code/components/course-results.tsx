'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { useCopyToClipboard } from '@/shared/hooks/use-copy-to-clipboard';
import type { CourseData } from '../types/course';

type CourseResultsProps = {
  extractedCourses: CourseData[];
};

export function CourseResults({ extractedCourses }: CourseResultsProps) {
  const [copiedCode, copyToClipboard] = useCopyToClipboard();

  if (extractedCourses.length === 0) {
    return null;
  }

  const handleCopy = (enrollmentCode: string) => {
    copyToClipboard(enrollmentCode);

    if (!copiedCode) {
      toast.error('Gagal menyalin kode enrollment', {
        description: 'Pastikan browser Anda mendukung clipboard API.',
      });
      return;
    }

    toast.success('Kode enrollment berhasil disalin ke clipboard', {
      description: 'Anda dapat menempelkannya di halaman pendaftaran kelas.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kode Enrollment Ditemukan</CardTitle>
        <CardDescription>
          {extractedCourses.length} kode enrollment berhasil diekstrak
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => {
              const allCodes = extractedCourses
                .map((course) => course.kodeEnroll)
                .join('\n');
              copyToClipboard(allCodes);

              if (!copiedCode) {
                toast.error('Gagal menyalin semua kode enrollment', {
                  description: 'Pastikan browser Anda mendukung clipboard API.',
                });
                return;
              }

              toast.success(
                'Semua kode enrollment berhasil disalin ke clipboard',
                {
                  description:
                    'Anda dapat menempelkannya di halaman pendaftaran kelas.',
                }
              );
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Salin Semua Kode
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {extractedCourses.map((course, index) => (
            <div
              className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              key={`course-${index}-${course.kodeEnroll}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary text-sm">
                      {course.kodeMK}
                    </span>
                    <span className="rounded-full border border-border bg-card px-3 py-1 text-muted-foreground text-sm">
                      Kelas {course.kelas}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {course.namaMK}
                  </h3>
                  <p className="text-muted-foreground">{course.programStudi}</p>
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg border border-border bg-background px-4 py-2 font-mono font-semibold text-sm">
                      {course.kodeEnroll}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => handleCopy(course.kodeEnroll)}
                  size="sm"
                  variant="outline"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
