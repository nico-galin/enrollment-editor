import { z } from 'zod';

const nonEmpty = z.string().min(1, 'Required');
const numericStr = z.string().regex(/^\d+(\.\d+)?$/, 'Must be a number');

export const SectionSchema = z.object({
  type: nonEmpty,
  days: nonEmpty,
  time: nonEmpty,
});

export const CourseSchema = z.object({
  id: z.string(),
  code: nonEmpty,
  title: nonEmpty,
  sections: z.array(SectionSchema),
  units: numericStr,
  grade: nonEmpty,
});

export const SemesterSchema = z.object({
  id: z.string(),
  label: nonEmpty,
  courses: z.array(CourseSchema),
});

export const PhaseSchema = z.object({
  label: nonEmpty,
  start: nonEmpty,
  startTime: nonEmpty,
  end: nonEmpty,
  endTime: nonEmpty,
});

export const DeadlineSchema = z.object({
  label: nonEmpty,
  date: nonEmpty,
  time: nonEmpty,
});

export const StudentSchema = z.object({
  name: nonEmpty,
  initial: z.string().min(1, 'Required').max(2, 'Max 2 chars'),
  major: z.string(),
  majorDegree: z.string(),
  career: z.string(),
  level: z.string(),
  termsInAttendance: z.string(),
  expectedGraduation: z.string(),
  totalUnits: numericStr,
  transferUnits: numericStr,
  pnpTotal: z.string(),
  pnpPassed: z.string(),
});

export const EnrollmentSchema = z.object({
  semester: nonEmpty,
  phases: z.array(PhaseSchema),
  deadlines: z.array(DeadlineSchema),
});

export const AppDataSchema = z.object({
  student: StudentSchema,
  semesters: z.array(SemesterSchema),
  enrollment: EnrollmentSchema,
});

export type Section = z.infer<typeof SectionSchema>;
export type Course = z.infer<typeof CourseSchema>;
export type Semester = z.infer<typeof SemesterSchema>;
export type Phase = z.infer<typeof PhaseSchema>;
export type Deadline = z.infer<typeof DeadlineSchema>;
export type Student = z.infer<typeof StudentSchema>;
export type Enrollment = z.infer<typeof EnrollmentSchema>;
export type AppData = z.infer<typeof AppDataSchema>;
