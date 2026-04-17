import type { ReactNode } from 'react';
import type { Student } from '../../default-data';
import Pane from '../pane';
import infoImg from '../../assets/info.png';

function ProfileRow({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] text-[12.5px] items-start'>
      <span className='text-[#555] text-[12.5px] font-bold'>{label}</span>
      <span className='text-[13.5px] leading-[1.45]'>{children}</span>
    </div>
  );
}

export function PreviewAcademicProfile({ student }: { student: Student }) {
  return (
    <Pane>
      <Pane.Header>Academic Profile</Pane.Header>
      <Pane.Content>
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] items-start'>
          <div className='w-[90px] aspect-[3/3.6] bg-[#c4a882] flex items-center justify-center text-[#7a5c3a] text-[22px] font-bold overflow-hidden'>
            {student.photo ? (
              <img src={student.photo} className='w-full h-full object-cover' />
            ) : (
              student.name.charAt(0)
            )}
          </div>
          <div className='text-[15px] font-bold pt-1'>{student.name}</div>
        </div>
        <hr className='border-t border-[#efefef] my-3' />
        <ProfileRow label='Major'>
          <span className='text-[#999]'>{student.major}</span>
          <br />
          {student.majorDegree}
        </ProfileRow>
        <hr className='border-t border-[#efefef] my-3' />
        <ProfileRow label='Academic Career'>{student.career}</ProfileRow>
        <hr className='border-t border-[#efefef] my-3' />
        <ProfileRow label='Level'>
          <div className='flex gap-1'>
            {student.level}
            <img src={infoImg} width={18} />
          </div>
        </ProfileRow>
        <hr className='border-t border-[#efefef] my-3' />
        <ProfileRow
          label={
            <>
              Terms
              <br />
              Information
            </>
          }
        >
          <span className='text-[#999]'>
            <div className='flex gap-1'>
              Terms in Attendance
              <img src={infoImg} width={18} />
            </div>
          </span>
          <span className='block'>{student.termsInAttendance}</span>
          <span className='text-[#999]'>Expected Graduation</span>
          <br />
          <strong>{student.expectedGraduation}</strong>
          <br />
          <small className='block text-[13px]'>
            Consult your college advisor with questions or concerns.
          </small>
        </ProfileRow>
        <hr className='border-t border-[#efefef] my-3' />
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] text-[12.5px] items-start mt-2'>
          <span className='text-[#555] text-[12.5px] font-bold'>
            Cumulative Units
          </span>
          <span>
            <table className='border-collapse text-[13.5px]'>
              <tbody>
                <tr>
                  <td>Total Units</td>
                  <td className='text-left pl-[30px]'>{student.totalUnits}</td>
                </tr>
                <tr>
                  <td>Transfer Units</td>
                  <td className='text-left pl-[30px]'>
                    {student.transferUnits}
                  </td>
                </tr>
                <tr>
                  <td>P/NP Total</td>
                  <td className='text-left pl-[30px]'>{student.pnpTotal}</td>
                </tr>
                <tr>
                  <td>P/NP Passed</td>
                  <td className='text-left pl-[30px]'>{student.pnpPassed}</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
        <hr className='border-t border-[#efefef] my-2' />
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-9 text-[12.5px] mt-2'>
          <span className='text-[#555] font-bold'>GPA</span>
          <a href='#' className='text-preview-link font-semibold'>
            Show GPA
          </a>
        </div>
      </Pane.Content>
    </Pane>
  );
}
