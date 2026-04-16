import type { AppData } from '../../default-data';
import { PreviewTopbar } from './preview-topbar';
import { PreviewAlertBar } from './preview-alert-bar';
import { PreviewAcademicProfile } from './preview-academic-profile';
import { PreviewSemesters } from './preview-semesters';
import { PreviewEnrollment } from './preview-enrollment';
import { RefObject } from 'react';

export default function Preview({
  data,
  ref,
}: {
  data: AppData;
  ref?: RefObject<HTMLDivElement | null>;
}) {
  const { student, semesters, enrollment } = data;

  return (
    <div ref={ref} className='font-sans text-[13px] bg-[#f4f4f4] min-h-full'>
      <PreviewTopbar student={student} />
      <PreviewAlertBar />
      <div className='pt-[14px] px-4 pb-[6px] text-xl font-normal text-[#212121] bg-[#f4f4f4]'>
        My Academics
      </div>
      <div className='flex px-4 pb-5 bg-[#f4f4f4]'>
        <PreviewAcademicProfile student={student} />
        <PreviewSemesters semesters={semesters} />
        <PreviewEnrollment enrollment={enrollment} />
      </div>
    </div>
  );
}
