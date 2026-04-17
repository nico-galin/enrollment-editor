import type { AppData } from '../../constants/default-data';
import { PreviewTopbar } from './preview-topbar';
import { PreviewAlertBar } from './preview-alert-bar';
import { PreviewAcademicProfile } from './preview-academic-profile';
import { PreviewSemesters } from './preview-semesters';
import { PreviewEnrollment } from './preview-enrollment';
import { RefObject } from 'react';
import { Navigation } from './navigation';

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
      <div className='sticky top-0'>
        <PreviewTopbar student={student} />
        <Navigation />
      </div>
      <PreviewAlertBar />
      <div className='pt-[14px] px-4 pb-4 text-xl font-medium text-[#1673AC] bg-[#f4f4f4]'>
        My Academics
      </div>
      <div className='flex px-4 pb-5 bg-[#f4f4f4] gap-4'>
        <PreviewAcademicProfile student={student} />
        <PreviewSemesters semesters={semesters} />
        <PreviewEnrollment enrollment={enrollment} />
      </div>
    </div>
  );
}
