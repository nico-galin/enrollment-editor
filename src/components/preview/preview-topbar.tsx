import type { Student } from '../../default-data';
import gmailIcon from '../../assets/gmail.png';
import calendarIcon from '../../assets/calendar.png';
import driveIcon from '../../assets/drive.png';

export function PreviewTopbar({ student }: { student: Student }) {
  return (
    <div className='bg-[#01305B] flex items-center h-[46px] px-3 sticky top-0'>
      <div className='text-[18px] font-bold text-white tracking-[2px]'>
        <b className='font-thin text-yellow-400'>CAL</b>
        <span className='font-semibold'>CENTRAL</span>
      </div>
      <div className='ml-auto flex items-center text-white text-[14px] gap-4'>
        <span className='flex items-center gap-1'>
          <img src={gmailIcon} width={32} />
          {Math.round(Math.random() * 500)}
        </span>
        <span className='flex items-center gap-1'>
          <img src={calendarIcon} width={32} />
          {Math.round(Math.random() * 50)}
        </span>
        <img src={driveIcon} width={36} />
        <div className='flex items-center gap-2 bg-[#516685] p-1 px-2 rounded-md'>
          <div className='w-7 h-7 rounded-full bg-[#8bc34a] flex items-center justify-center text-white text-[11px] font-bold overflow-hidden'>
            {student.photo ? (
              <img
                src={student.photo}
                className='w-full h-full object-cover border-1'
              />
            ) : (
              student.name.charAt(0)
            )}
          </div>
          <span className='text-[#cfd8dc] text-[12px] font-bold'>
            {student.name.split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
