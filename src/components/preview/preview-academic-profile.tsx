import type { ReactNode } from 'react';
import type { Student } from '../../default-data';
import Pane from '../pane';

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
      <span className='text-[#212121] text-[12.5px] leading-[1.45]'>
        {children}
      </span>
    </div>
  );
}

export function PreviewAcademicProfile({ student }: { student: Student }) {
  return (
    <Pane>
      <Pane.Header>Academic Profile</Pane.Header>
      <Pane.Content>
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] items-start'>
          <div className='w-[68px] aspect-[3/4] rounded-[3px] bg-[#c4a882] flex items-center justify-center text-[#7a5c3a] text-[22px] font-bold'>
            {student.initial || student.name.charAt(0)}
          </div>
          <div className='text-[15px] font-bold text-[#212121] pt-1'>
            {student.name}
          </div>
        </div>
        <ProfileRow label='Major'>
          {student.major}
          <br />
          <small className='block text-[11.5px] text-[#555]'>
            {student.majorDegree}
          </small>
        </ProfileRow>
        <ProfileRow label='Academic Career'>{student.career}</ProfileRow>
        <ProfileRow label='Level'>{student.level}</ProfileRow>
        <ProfileRow
          label={
            <>
              Terms
              <br />
              Information
            </>
          }
        >
          Terms in Attendance
          <br />
          <small className='block text-[11.5px] text-[#555]'>
            {student.termsInAttendance}
          </small>
          <br />
          Expected Graduation
          <br />
          <strong>{student.expectedGraduation}</strong>
          <br />
          <small className='block text-[11.5px] text-[#555]'>
            Consult your college advisor with questions or concerns.
          </small>
        </ProfileRow>
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] text-[12.5px] items-start mt-2'>
          <span className='text-[#555] text-[12.5px] font-bold'>Cumulative Units</span>
          <span>
            <table className='w-full border-collapse text-[12.5px]'>
              <tbody>
                <tr>
                  <td>
                    <strong>Total Units</strong>
                  </td>
                  <td className='text-right'>
                    <strong>{student.totalUnits}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Transfer Units</td>
                  <td className='text-right'>{student.transferUnits}</td>
                </tr>
                <tr>
                  <td>P/NP Total</td>
                  <td className='text-right'>{student.pnpTotal}</td>
                </tr>
                <tr>
                  <td>P/NP Passed</td>
                  <td className='text-right'>{student.pnpPassed}</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
        <div className='grid grid-cols-[120px_1fr] gap-[3px] mb-[7px] text-[12.5px] mt-2'>
          <span className='text-[#555] font-bold'>GPA</span>
          <a href='#' className='text-[#1971c2]'>
            Show GPA
          </a>
        </div>
      </Pane.Content>
    </Pane>
  );
}
