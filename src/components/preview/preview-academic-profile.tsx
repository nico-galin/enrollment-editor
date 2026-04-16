import type { ReactNode } from "react";
import type { Student } from "../../default-data";

function ProfileRow({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[105px_1fr] gap-[3px] mb-[7px] text-[12.5px] items-start">
      <span className="text-[#555] text-[12.5px]">{label}</span>
      <span className="text-[#212121] text-[12.5px] leading-[1.45]">{children}</span>
    </div>
  );
}

export function PreviewAcademicProfile({ student }: { student: Student }) {
  return (
    <div className="w-[265px] shrink-0 bg-white border border-[#c8c8c8] p-[14px]">
      <div className="text-sm font-bold text-[#212121] mb-3">Academic Profile</div>

      <div className="flex gap-[10px] items-start mb-[10px]">
        <div className="w-[68px] h-[72px] rounded-[3px] bg-[#c4a882] shrink-0 flex items-center justify-center text-[#7a5c3a] text-[22px] font-bold">
          {student.initial || student.name.charAt(0)}
        </div>
        <div className="text-[15px] font-bold text-[#212121] pt-1">{student.name}</div>
      </div>

      <ProfileRow label="Major">
        {student.major}
        <br />
        <small className="block text-[11.5px] text-[#555]">{student.majorDegree}</small>
      </ProfileRow>

      <ProfileRow label="Academic Career">{student.career}</ProfileRow>
      <ProfileRow label="Level">{student.level}</ProfileRow>

      <ProfileRow label={<>Terms<br />Information</>}>
        Terms in Attendance
        <br />
        <small className="block text-[11.5px] text-[#555]">{student.termsInAttendance}</small>
        <br />
        Expected Graduation
        <br />
        <strong>{student.expectedGraduation}</strong>
        <br />
        <small className="block text-[11.5px] text-[#555]">Consult your college advisor with questions or concerns.</small>
      </ProfileRow>

      <div className="grid grid-cols-[105px_1fr] gap-[3px] mb-[7px] text-[12.5px] items-start mt-2">
        <span className="text-[#555] text-[12.5px]">Cumulative Units</span>
        <span>
          <table className="w-full border-collapse text-[12.5px]">
            <tbody>
              <tr>
                <td><strong>Total Units</strong></td>
                <td className="text-right"><strong>{student.totalUnits}</strong></td>
              </tr>
              <tr>
                <td>Transfer Units</td>
                <td className="text-right">{student.transferUnits}</td>
              </tr>
              <tr>
                <td>P/NP Total</td>
                <td className="text-right">{student.pnpTotal}</td>
              </tr>
              <tr>
                <td>P/NP Passed</td>
                <td className="text-right">{student.pnpPassed}</td>
              </tr>
            </tbody>
          </table>
        </span>
      </div>

      <div className="grid grid-cols-[105px_1fr] gap-[3px] mb-[7px] text-[12.5px] mt-2">
        <span className="text-[#555]">GPA</span>
        <a href="#" className="text-[#1971c2]">Show GPA</a>
      </div>
    </div>
  );
}
