export type {
  Section,
  Course,
  Semester,
  Phase,
  Deadline,
  Student,
  Enrollment,
  AppData,
} from './schema';

import type { AppData } from './schema';

export const defaultData: AppData = {
  student: {
    name: 'Kaan Ulupinar',
    initial: 'K',
    major: 'Rausser Clg Natural Resources',
    majorDegree: 'Molecular Environ Biology BS',
    career: 'Undergraduate',
    level: 'Sophomore',
    termsInAttendance: '5',
    expectedGraduation: 'Spring 2028',
    totalUnits: '57.36',
    transferUnits: '14.360',
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
          code: 'CHEM 3B',
          title: 'Chemical Structure and…',
          sections: [
            { type: 'LEC', days: 'TuTh', time: '8:00A–9:29A' },
            { type: 'DIS', days: 'W', time: '12:00P–12:59P' },
          ],
          units: '4.0',
          grade: 'GRD',
        },
        {
          id: 'c2',
          code: 'CHEM 3BL',
          title: 'Organic Chemistry Laboratory',
          sections: [
            { type: 'LEC', days: 'F', time: '4:00P–4:59P' },
            { type: 'LAB', days: 'M', time: '1:00P–4:59P' },
          ],
          units: '2.0',
          grade: 'GRD',
        },
        {
          id: 'c3',
          code: 'ESPM C105',
          title: 'Natural History Museums and…',
          sections: [{ type: 'LEC', days: 'TuTh', time: '3:30P–4:59P' }],
          units: '3.0',
          grade: 'GRD',
        },
        {
          id: 'c4',
          code: 'MCELLBI 135A',
          title: 'Topics in Cell and…',
          sections: [
            { type: 'LEC', days: 'MWF', time: '9:00A–9:59A' },
            { type: 'DIS', days: 'W', time: '1:00P–1:59P' },
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
          code: 'ASAMST\n20AC (Session A)',
          title: 'Asian American Communities…',
          sections: [
            { type: 'LEC', days: 'Su', time: '12:00A–12:01A' },
            { type: 'DIS', days: 'Sa', time: '12:00A–12:01A' },
          ],
          units: '4.0',
          grade: 'GRD',
        },
        {
          id: 'c6',
          code: 'COLWRIT\nN132 (Session P)',
          title: 'The Craft of Short Fiction',
          sections: [],
          units: '2.0',
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
