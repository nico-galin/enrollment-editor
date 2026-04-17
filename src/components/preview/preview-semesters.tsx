import { ArrowRight } from 'lucide-react';
import type { Course, Semester } from '../../default-data';
import Pane from '../pane';

function CourseRow({ course }: { course: Course }) {
  return (
    <div className='grid grid-cols-[100px_1fr_36px_44px] gap-[5px] text-[12.5px] mb-[10px] items-start'>
      <div>
        <a
          href='#'
          className='text-[#205C83] text-[12.5px] leading-[1.5] whitespace-pre-wrap font-bold'
        >
          {course.code}
        </a>
      </div>
      <div className='min-w-0'>
        <div className='text-[14px] truncate'>{course.title}</div>
        <div className='text-[#555] text-[14px] leading-[1.55] font-medium'>
          {course.sections.map((s, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {s.type}&nbsp;&nbsp;{s.days} {s.time}
            </span>
          ))}
        </div>
      </div>
      <div className='text-right text-[12.5px] font-semibold'>
        {course.units}
      </div>
      <div className='text-right text-[14px] text-[#555] font-medium'>
        {course.grade}
      </div>
    </div>
  );
}

function SemesterSection({
  semester,
  showEnrolledUnits,
}: {
  semester: Semester;
  showEnrolledUnits: boolean;
}) {
  const enrolledUnits = semester.courses.reduce(
    (sum, c) => sum + parseFloat(c.units || '0'),
    0,
  );

  return (
    <div>
      <div className='flex items-center justify-between mt-[14px] mb-7'>
        <span className='text-[14.5px] font-bold text-[#205C83]'>
          <a href='#' className='text-[#205C83] text-[14.5px] font-bold'>
            {semester.label}{' '}
            <ArrowRight size={16} className='inline' strokeWidth={4} />
          </a>
        </span>
        <a href='#' className='text-sm text-[#205C83]'>
          Textbooks
        </a>
      </div>

      {semester.courses.map((course) => (
        <CourseRow key={course.id} course={course} />
      ))}

      {showEnrolledUnits && (
        <div className='text-right text-[13px] text-[#555] mt-2'>
          My Enrolled Units: <strong>{enrolledUnits}</strong>
          <br />
          &nbsp;&nbsp; My Waitlisted Units: <strong>0</strong>
        </div>
      )}
    </div>
  );
}

export function PreviewSemesters({ semesters }: { semesters: Semester[] }) {
  return (
    <Pane>
      <Pane.Header className='flex flex-row justify-between items-center'>
        Semesters
        <a href='#' className='font-bold text-[14px] text-[#205C83] ml-auto'>
          View Academic Summary{' '}
          <ArrowRight size={15} className='inline' strokeWidth={4} />
        </a>
      </Pane.Header>
      <Pane.Content>
        {semesters.map((sem, i) => (
          <div key={sem.id}>
            {i > 0 && <hr className='border-0 border-t border-[#ddd] my-3' />}
            <SemesterSection semester={sem} showEnrolledUnits={i === 0} />
          </div>
        ))}
      </Pane.Content>
    </Pane>
  );
}
