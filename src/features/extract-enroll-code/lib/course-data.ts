import type { CourseData } from '../types/course';
import { getMajorMapKey, type MajorMap, type MajorMapValue } from './enums';

// Parse CSV data into structured format
export function parseCourseData(csvText: string): CourseData[] {
  const lines = csvText.trim().split('\n');
  const dataLines = lines.slice(1);

  return dataLines.map((line) => {
    const [programStudi, kodeMK, namaMK, kelas, kodeEnroll] = line.split(',');
    const courseData = {
      programStudi: (programStudi?.trim() || '') as MajorMapValue,
      kodeMK: kodeMK?.trim() || '',
      namaMK: namaMK?.trim() || '',
      kelas: kelas?.trim() || '',
      kodeEnroll: kodeEnroll?.trim() || '',
    };
    return courseData;
  });
}

let courseMap: Map<string, CourseData> | null = null;

// Initialize course map for fast lookups
export function initializeCourseMap(courseData: CourseData[]): void {
  courseMap = new Map();

  if (!courseMap) {
    return;
  }

  for (const course of courseData) {
    const majorKey = getMajorMapKey(course.programStudi);
    const key = `${majorKey}-${course.kodeMK}-${course.kelas}`;
    courseMap.set(key, course);
  }
}

// Find enrollment codes for extracted course codes using Map lookup
export function findEnrollmentCodes(
  extractedCodes: string[],
  extractedClasses: string[],
  majorKey: keyof typeof MajorMap,
  courseData: CourseData[]
): CourseData[] {
  if (!courseMap) {
    initializeCourseMap(courseData);
  }

  const results: CourseData[] = [];

  for (let i = 0; i < extractedCodes.length; i++) {
    const code = extractedCodes[i];
    const className = extractedClasses[i] || '';
    const key = `${majorKey}-${code}-${className}`;

    const match = courseMap?.get(key);

    if (match) {
      results.push(match);
    }
  }

  return results;
}
