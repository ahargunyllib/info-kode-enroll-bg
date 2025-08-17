import { type NextRequest, NextResponse } from "next/server"
import { createWorker } from "tesseract.js"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Initialize Tesseract worker
    const worker = await createWorker("ind", 1, {
      logger: (m) => console.log(m),
    })

    // Perform OCR
    const {
      data: { text },
    } = await worker.recognize(buffer)

    // Clean up worker
    await worker.terminate()

    return NextResponse.json({
      success: true,
      text: text.trim(),
      extractedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("OCR processing error:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
