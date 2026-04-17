export type {
  Section,
  Course,
  Semester,
  Phase,
  Deadline,
  Student,
  Enrollment,
  AppData,
} from '../schema';

import type { AppData } from '../schema';

export const defaultData: AppData = {
  student: {
    name: 'Nicholas Galin',
    major: 'Clg of Computing, Data Science, and Society',
    majorDegree: 'Computer Science BS',
    career: 'Undergraduate',
    level: 'Sophomore',
    termsInAttendance: '5',
    expectedGraduation: 'Spring 2028',
    totalUnits: '45.18',
    transferUnits: '8.360',
    pnpTotal: '1',
    pnpPassed: '1',
  },
  semesters: [
    {
      id: 'fall2026',
      label: 'Fall 2026',
      courses: [
        {
          id: 'c1',
          code: 'COMPSCI 61B',
          title: 'Data Structures',
          sections: [
            { type: 'LEC', days: 'MWF', time: '2:00P-2:29P' },
            { type: 'DIS', days: 'Su', time: '12:04A-12:05A' },
            { type: 'LAB', days: 'We', time: '5:00P-6:59P' },
          ],
          units: '4.0',
          grade: 'GRD',
        },
        {
          id: 'c2',
          code: 'DATA C104',
          title: 'Human Contexts and Ethics of Data',
          sections: [
            { type: 'LEC', days: 'MWF', time: '3:00P-3:59P' },
            { type: 'DIS', days: 'Th', time: '2:00P-3:29P' },
          ],
          units: '2.0',
          grade: 'GRD',
        },
        {
          id: 'c3',
          code: 'MATH 54',
          title: 'Linear Algebra and Differential Equations',
          sections: [
            { type: 'LEC', days: 'MWF', time: '8:00A-8:59A' },
            { type: 'DIS', days: 'MWF', time: '4:00P-5:00P' },
          ],
          units: '4.0',
          grade: 'GRD',
        },
        {
          id: 'c4',
          code: 'COGSCI C127',
          title: 'Cognitive Neuroscience',
          sections: [
            { type: 'LEC', days: 'MWF', time: '12:00P-12:59P' },
            { type: 'DIS', days: 'Tu', time: '4:00P-4:59P' },
          ],
          units: '3.0',
          grade: 'GRD',
        },
      ],
    },
    {
      id: 'summer2026',
      label: 'Summer 2026',
      courses: [
        {
          id: 'c5',
          code: 'COGSCI 116',
          title: 'AI & Human Intelligence',
          sections: [{ type: 'LEC', days: 'Su', time: '12:00A-12:01A' }],
          units: '4.0',
          grade: 'GRD',
        },
      ],
    },
  ],
  enrollment: {
    semester: 'Spring 2026',
    phases: [
      {
        label: 'Phase 1',
        start: 'Oct 29',
        startTime: '11:00am',
        end: 'Nov 17',
        endTime: '11:59pm',
      },
      {
        label: 'Phase 2 Enrollment',
        start: 'Nov 26',
        startTime: '11:00am',
        end: 'Jan 12',
        endTime: '11:59pm',
      },
      {
        label: 'Adjustment',
        start: 'Jan 13',
        startTime: '9:00am',
        end: 'Apr 4',
        endTime: '11:59pm',
      },
    ],
    deadlines: [
      { label: 'Early drop', date: 'Jan 31', time: '11:59pm' },
      {
        label: 'Add, drop, or change units',
        date: 'Feb 12',
        time: '11:59pm',
      },
      { label: 'Grading option', date: 'Apr 4', time: '11:59pm' },
    ],
  },
};
