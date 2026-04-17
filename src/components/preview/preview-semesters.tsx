import type { Course, Semester } from '../../default-data';
import Pane from '../pane';

function CourseRow({ course }: { course: Course }) {
  return (
    <div className='grid grid-cols-[100px_1fr_36px_44px] gap-[5px] text-[12.5px] mb-[10px] items-start'>
      <div>
        <a
          href='#'
          className='text-[#1971c2] text-[12.5px] leading-[1.5] whitespace-pre-wrap'
        >
          {course.code}
        </a>
      </div>
      <div>
        <div className='text-[12.5px] text-[#212121]'>{course.title}</div>
        <div className='text-[#555] text-[11.5px] leading-[1.55]'>
          {course.sections.map((s, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {s.type}&nbsp;&nbsp;{s.days} {s.time}
            </span>
          ))}
        </div>
      </div>
      <div className='text-right text-[12.5px]'>{course.units}</div>
      <div className='text-right text-[12.5px] text-[#555]'>{course.grade}</div>
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
      <div className='flex items-center justify-between mt-[14px] mb-[8px]'>
        <span className='text-[14.5px] font-bold text-[#1971c2]'>
          <a href='#' className='text-[#1971c2] text-[14.5px] font-bold'>
            {semester.label} →
          </a>
        </span>
        <a href='#' className='text-[12px] text-[#1971c2]'>
          Textbooks
        </a>
      </div>

      {semester.courses.map((course) => (
        <CourseRow key={course.id} course={course} />
      ))}

      {showEnrolledUnits && (
        <div className='text-right text-[12px] text-[#555] mt-2 pt-2 border-t border-[#e5e5e5]'>
          My Enrolled Units: <strong>{enrolledUnits}</strong>
          &nbsp;&nbsp; My Waitlisted Units: <strong>0</strong>
        </div>
      )}
    </div>
  );
}

export function PreviewSemesters({ semesters }: { semesters: Semester[] }) {
  return (
    <Pane>
      <Pane.Header className='flex-row justify-between'>
        Semesters
        <a href='#' className='font-bold text-[12.5px] text-[#1971c2] ml-auto'>
          View Academic Summary →
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
