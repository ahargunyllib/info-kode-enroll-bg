'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Tesseract from 'tesseract.js';
import { tryCatch } from '../lib/try-catch';

type ExtractedCode = {
  id: number;
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

// e.g. CIF63106, MPK60007
const COURSE_CODE_REGEX = /[A-Z]{3}\d{5}/;

// first token on the line, 1-3 letters/digits (e.g. c, E, N7D)
const CLASS_NAME_REGEX = /^\s*([A-Za-z0-9]{1,3})\b/;

// regex for splitting lines
const LINE_SPLIT_REGEX = /\r?\n/;

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
    const results: ExtractedCode[] = [];
    const seen = new Set<string>();

    for (const [idx, rawLine] of text.split(LINE_SPLIT_REGEX).entries()) {
      const line = rawLine.trim();
      const codeMatch = line.match(COURSE_CODE_REGEX)?.[0]?.toUpperCase();
      if (!codeMatch) {
        continue;
      }

      const className = line.match(CLASS_NAME_REGEX)?.[1]?.toUpperCase() ?? '';

      const key = `${codeMatch}-${className}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({ id: idx + 1, code: codeMatch, class: className });
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
      editableCodes: [
        ...prev.editableCodes,
        { id: prev.editableCodes.length + 1, code: '', class: '' },
      ],
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
