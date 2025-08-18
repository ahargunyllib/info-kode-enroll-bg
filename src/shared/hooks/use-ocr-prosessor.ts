'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Tesseract from 'tesseract.js';
import { tryCatch } from '../lib/try-catch';

type ExtractedCode = {
  code: string;
  class: string;
};

type OCRState = {
  isProcessing: boolean;
  extractedText: string;
  showRawText: boolean;
  extractedCodes: ExtractedCode[];
  editableCodes: ExtractedCode[];
  isConfirming: boolean;
};

const COURSE_CODE_REGEX = /[A-Z]{3}\d{5}/;
const CLASS_NAME_REGEX = /\b([A-Z])\b/;

export function useOCRProcessor() {
  const [state, setState] = useState<OCRState>({
    isProcessing: false,
    extractedText: '',
    showRawText: false,
    extractedCodes: [],
    editableCodes: [],
    isConfirming: false,
  });

  const extractCourseCodes = (text: string): ExtractedCode[] => {
    const lines = text.split('\n');
    const results: ExtractedCode[] = [];
    for (const line of lines) {
      const codeMatch = line.match(COURSE_CODE_REGEX);
      if (!codeMatch) {
        continue;
      }

      const courseCode = codeMatch[0];
      const classMatch = line.match(CLASS_NAME_REGEX);
      const className = classMatch ? classMatch[1] : '';

      if (
        !results.some(
          (item) => item.code === courseCode && item.class === className
        )
      ) {
        results.push({ code: courseCode, class: className });
      }
    }

    return results;
  };

  const processImage = async (file: File | string) => {
    setState((prev) => ({ ...prev, isProcessing: true }));

    const formData = new FormData();
    formData.append('image', file);

    const { data: result, error } = await tryCatch(
      Tesseract.recognize(file, 'ind')
    );
    if (error) {
      toast.error('Terjadi kesalahan saat memproses gambar', {
        description: 'Silakan coba lagi.',
      });
      setState((prev) => ({ ...prev, isProcessing: false }));
      return;
    }

    if (!result?.data?.text) {
      toast.error('Terjadi kesalahan saat memproses gambar', {
        description: 'Silakan coba lagi.',
      });
      setState((prev) => ({ ...prev, isProcessing: false }));
      return;
    }

    const text = result.data.text;

    const codes = extractCourseCodes(text);
    setState((prev) => ({
      ...prev,
      extractedText: text,
      extractedCodes: codes,
      editableCodes: [...codes],
      isConfirming: true,
    }));

    toast.info('OCR Selesai!', {
      description: `Ditemukan ${codes.length} kode mata kuliah. Silakan konfirmasi kode yang benar.`,
    });
  };

  const updateCode = (
    index: number,
    field: 'code' | 'class',
    newValue: string
  ) => {
    setState((prev) => ({
      ...prev,
      editableCodes: prev.editableCodes.map((item, i) =>
        i === index ? { ...item, [field]: newValue } : item
      ),
    }));
  };

  const removeCode = (index: number) => {
    setState((prev) => ({
      ...prev,
      editableCodes: prev.editableCodes.filter((_, i) => i !== index),
    }));
  };

  const addNewCode = () => {
    setState((prev) => ({
      ...prev,
      editableCodes: [...prev.editableCodes, { code: '', class: '' }],
    }));
  };

  const toggleRawText = () => {
    setState((prev) => ({ ...prev, showRawText: !prev.showRawText }));
  };

  const resetOCR = () => {
    setState({
      isProcessing: false,
      extractedText: '',
      showRawText: false,
      extractedCodes: [],
      editableCodes: [],
      isConfirming: false,
    });
  };

  return {
    ...state,
    processImage,
    updateCode,
    removeCode,
    addNewCode,
    toggleRawText,
    resetOCR,
  };
}
