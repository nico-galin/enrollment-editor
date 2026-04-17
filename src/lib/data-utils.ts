import type { Semester } from '../schema';

export function calcEnrolledUnits(semester: Semester): number {
  return semester.courses.reduce((sum, c) => sum + parseFloat(c.units || '0'), 0);
}
