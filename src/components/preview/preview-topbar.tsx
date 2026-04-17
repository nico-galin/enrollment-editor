import type { Student } from '../../default-data';
import gmailIcon from '../../assets/gmail.png';
import calendarIcon from '../../assets/calendar.png';
import driveIcon from '../../assets/drive.png';

export function PreviewTopbar({ student }: { student: Student }) {
  return (
    <div className='bg-[#01305B] flex items-center h-[46px] px-3 sticky top-0'>
      <div className='text-[17px] font-bold text-white tracking-[-0.3px] mr-5'>
        <b className='font-black'>CAL</b>
        <span className='font-light'>CENTRAL</span>
      </div>
      <div className='ml-auto flex items-center text-white text-[14px] gap-4'>
        <span className='flex items-center gap-1'>
          <img src={gmailIcon} width={32} />
          6854
        </span>
        <span className='flex items-center gap-1'>
          <img src={calendarIcon} width={32} />
          31
        </span>
        <img src={driveIcon} width={36} />
        <div className='flex items-center gap-2'>
          <div className='w-7 h-7 rounded-full bg-[#8bc34a] flex items-center justify-center text-white text-[11px] font-bold'>
            {student.initial || student.name.charAt(0)}
          </div>
          <span className='text-[#cfd8dc] text-[12px]'>
            {student.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
