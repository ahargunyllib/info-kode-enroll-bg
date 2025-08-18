'use client';

import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CodeConfirmation from '@/features/extract-enroll-code/components/code-confirmation';
import { CourseResults } from '@/features/extract-enroll-code/components/course-results';
import ExtractedTextDisplay from '@/features/extract-enroll-code/components/extract-text-display';
import FileUpload from '@/features/extract-enroll-code/components/file-upload';
import {
  findEnrollmentCodes,
  parseCourseData,
} from '@/features/extract-enroll-code/lib/course-data';
import type { MajorMapKey } from '@/features/extract-enroll-code/lib/enums';
import type { CourseData } from '@/features/extract-enroll-code/types/course';
import { Button } from '@/shared/components/ui/button';
import { useFileUpload } from '@/shared/hooks/use-file-upload';
import { useOCRProcessor } from '@/shared/hooks/use-ocr-prosessor';
import { tryCatch } from '@/shared/lib/try-catch';
import ImageCropper from '../features/extract-enroll-code/components/image-cropper';
import MajorSelector from '../features/extract-enroll-code/components/major-selector';

export default function HomePage() {
  const [extractedCourses, setExtractedCourses] = useState<CourseData[]>([]);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<MajorMapKey | undefined>(
    undefined
  );

  const fileUpload = useFileUpload();
  const ocrProcessor = useOCRProcessor();

  useEffect(() => {
    const loadCourseData = async () => {
      const { data: response, error: fetchError } = await tryCatch(
        fetch('/course-data.csv')
      );
      if (fetchError) {
        toast.error('Gagal memuat data mata kuliah');
        return;
      }

      const { data: csvText, error: parseError } = await tryCatch(
        response.text()
      );
      if (parseError) {
        toast.error('Gagal memuat data mata kuliah');
        return;
      }

      const parsed = parseCourseData(csvText);
      setCourseData(parsed);
    };

    loadCourseData();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileUpload.handleFileSelect(event);
    setExtractedCourses([]);
    ocrProcessor.resetOCR();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    fileUpload.handleDrop(event);
    setExtractedCourses([]);
    ocrProcessor.resetOCR();
  };

  const processCurrentImage = () => {
    if (fileUpload.selectedFile) {
      // Use cropped image URL if available, otherwise use original file
      const imageToProcess = fileUpload.croppedImageUrl
        ? fileUpload.croppedImageUrl
        : fileUpload.selectedFile;
      ocrProcessor.processImage(imageToProcess);
    }
  };

  const confirmCodes = () => {
    if (!selectedMajor) {
      toast.error('Silakan pilih jurusan terlebih dahulu');
      return;
    }

    const validCodes = ocrProcessor.editableCodes.filter(
      (item) => item.code.trim() !== ''
    );
    const courseCodes = validCodes.map((item) => item.code);
    const courseClasses = validCodes.map((item) => item.class);
    const coursesWithEnrollment = findEnrollmentCodes(
      courseCodes,
      courseClasses,
      selectedMajor,
      courseData
    );
    setExtractedCourses(coursesWithEnrollment);
    ocrProcessor.resetOCR();

    toast.success(`Ditemukan ${coursesWithEnrollment.length} kode enrollment`);
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-4xl space-y-8 p-6">
        <div className="space-y-3 text-center">
          <h1 className="font-bold text-4xl text-foreground">
            info kode enroll bang
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload screenshot jadwal untuk mendapatkan kode enrollment dengan
            mudah
          </p>
        </div>

        <MajorSelector
          selectedMajor={selectedMajor}
          setSelectedMajor={setSelectedMajor}
        />

        {fileUpload.isCropping && fileUpload.previewUrl && (
          <ImageCropper
            imageUrl={fileUpload.previewUrl}
            onCancel={() => fileUpload.cancelCropping}
            onCropComplete={fileUpload.handleCropComplete}
          />
        )}

        {!fileUpload.isCropping && (
          <FileUpload
            croppedImageUrl={fileUpload.croppedImageUrl}
            onDragOver={fileUpload.handleDragOver}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
            onStartCropping={fileUpload.startCropping}
            previewUrl={fileUpload.previewUrl}
            selectedFile={fileUpload.selectedFile}
          />
        )}

        {fileUpload.selectedFile &&
          !ocrProcessor.isConfirming &&
          extractedCourses.length === 0 &&
          !fileUpload.isCropping && (
            <div className="flex justify-center">
              <Button
                disabled={ocrProcessor.isProcessing}
                onClick={processCurrentImage}
                size="lg"
              >
                {ocrProcessor.isProcessing ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Ekstrak Kode Mata Kuliah'
                )}
              </Button>
            </div>
          )}

        {ocrProcessor.isConfirming && (
          <CodeConfirmation
            editableCodes={ocrProcessor.editableCodes}
            onAddNewCode={ocrProcessor.addNewCode}
            onConfirmCodes={confirmCodes}
            onRemoveCode={ocrProcessor.removeCode}
            onUpdateCode={ocrProcessor.updateCode}
          />
        )}

        <ExtractedTextDisplay
          extractedText={ocrProcessor.extractedText}
          onToggleRawText={ocrProcessor.toggleRawText}
          showRawText={ocrProcessor.showRawText}
        />

        <CourseResults extractedCourses={extractedCourses} />
      </div>
    </div>
  );
}
