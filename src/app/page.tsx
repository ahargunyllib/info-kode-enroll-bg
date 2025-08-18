"use client"

import CodeConfirmation from "@/features/extract-enroll-code/components/code-confirmation"
import { CourseResults } from "@/features/extract-enroll-code/components/course-results"
import ExtractedTextDisplay from "@/features/extract-enroll-code/components/extract-text-display"
import FileUpload from "@/features/extract-enroll-code/components/file-upload"
import { findEnrollmentCodes, parseCourseData } from "@/features/extract-enroll-code/lib/course-data"
import { MajorMapKey } from "@/features/extract-enroll-code/lib/enums"
import { CourseData } from "@/features/extract-enroll-code/types/course"
import { Button } from "@/shared/components/ui/button"
import { useFileUpload } from "@/shared/hooks/use-file-upload"
import { useOCRProcessor } from "@/shared/hooks/use-ocr-prosessor"
import { tryCatch } from "@/shared/lib/try-catch"
import { Loader2 } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import ImageCropper from "../features/extract-enroll-code/components/image-cropper"
import MajorSelector from "../features/extract-enroll-code/components/major-selector"


export default function HomePage() {
  const [extractedCourses, setExtractedCourses] = useState<CourseData[]>([])
  const [courseData, setCourseData] = useState<CourseData[]>([])
  const [selectedMajor, setSelectedMajor] = useState<MajorMapKey | undefined>(undefined)

  const fileUpload = useFileUpload()
  const ocrProcessor = useOCRProcessor()

  useEffect(() => {
    const loadCourseData = async () => {
      const { data: response, error: fetchError } = await tryCatch(fetch("/course-data.csv"))
      if (fetchError) {
        console.error("Failed to load course data:", fetchError)
        toast.error("Gagal memuat data mata kuliah")
        return
      }

      const { data: csvText, error: parseError } = await tryCatch(response.text())
      if (parseError) {
        console.error("Failed to parse course data:", parseError)
        toast.error("Gagal memuat data mata kuliah")
        return
      }

      const parsed = parseCourseData(csvText)
      setCourseData(parsed)
    }

    loadCourseData()
  }, [])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileUpload.handleFileSelect(event)
    setExtractedCourses([])
    ocrProcessor.resetOCR()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    fileUpload.handleDrop(event)
    setExtractedCourses([])
    ocrProcessor.resetOCR()
  }

  const processCurrentImage = () => {
    if (fileUpload.selectedFile) {
      // Use cropped image URL if available, otherwise use original file
      const imageToProcess = fileUpload.croppedImageUrl ? fileUpload.croppedImageUrl : fileUpload.selectedFile
      ocrProcessor.processImage(imageToProcess)
    }
  }

  const confirmCodes = () => {
    if (!selectedMajor) {
      toast.error("Silakan pilih jurusan terlebih dahulu")
      return
    }

    const validCodes = ocrProcessor.editableCodes.filter((item) => item.code.trim() !== "")
    const courseCodes = validCodes.map((item) => item.code)
    const courseClasses = validCodes.map((item) => item.class)
    const coursesWithEnrollment = findEnrollmentCodes(courseCodes, courseClasses, selectedMajor, courseData)
    setExtractedCourses(coursesWithEnrollment)
    ocrProcessor.resetOCR()

    toast.success(`Ditemukan ${coursesWithEnrollment.length} kode enrollment`)
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground">info kode enroll bang</h1>
          <p className="text-muted-foreground text-lg">
            Upload screenshot jadwal untuk mendapatkan kode enrollment dengan mudah
          </p>
        </div>

        <MajorSelector selectedMajor={selectedMajor} setSelectedMajor={setSelectedMajor} />

        {fileUpload.isCropping && fileUpload.previewUrl && (
          <ImageCropper
            imageUrl={fileUpload.previewUrl}
            onCropComplete={fileUpload.handleCropComplete}
            onCancel={() => fileUpload.cancelCropping}
          />
        )}

        {!fileUpload.isCropping && (
          <FileUpload
            selectedFile={fileUpload.selectedFile}
            previewUrl={fileUpload.previewUrl}
            croppedImageUrl={fileUpload.croppedImageUrl}
            onFileSelect={handleFileSelect}
            onDrop={handleDrop}
            onDragOver={fileUpload.handleDragOver}
            onStartCropping={fileUpload.startCropping}
          />
        )}

        {fileUpload.selectedFile && !ocrProcessor.isConfirming && extractedCourses.length === 0 && !fileUpload.isCropping && (
          <div className="flex justify-center">
            <Button
              onClick={processCurrentImage}
              disabled={ocrProcessor.isProcessing}
              size="lg"
            >
              {ocrProcessor.isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Ekstrak Kode Mata Kuliah"
              )}
            </Button>
          </div>
        )}

        {ocrProcessor.isConfirming && (
          <CodeConfirmation
            editableCodes={ocrProcessor.editableCodes}
            onUpdateCode={ocrProcessor.updateCode}
            onRemoveCode={ocrProcessor.removeCode}
            onAddNewCode={ocrProcessor.addNewCode}
            onConfirmCodes={confirmCodes}
          />
        )}

        <ExtractedTextDisplay
          extractedText={ocrProcessor.extractedText}
          showRawText={ocrProcessor.showRawText}
          onToggleRawText={ocrProcessor.toggleRawText}
        />

        <CourseResults extractedCourses={extractedCourses} />
      </div>
    </div>
  )
}
