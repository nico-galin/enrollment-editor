import type { Enrollment } from "../../default-data";

const HELP_LINKS = [
  "How to Change Grading Basis",
  "How to Add, Drop or Swap a Class",
  "How to Use the Schedule Planner",
];

export function PreviewEnrollment({ enrollment }: { enrollment: Enrollment }) {
  return (
    <div className="w-[295px] shrink-0 bg-white border border-[#c8c8c8] px-[14px] py-[12px]">
      <div className="text-sm font-bold text-[#212121] mb-3 flex items-baseline gap-[7px]">
        Class Enrollment
        <span className="text-[10.5px] font-normal text-[#555] uppercase tracking-[0.3px]">UNDERGRADUATE</span>
      </div>

      {/* Semester tabs */}
      <div className="flex border-b border-[#ccc] mb-[10px]">
        {["Fall 2026", "Summer 2026", enrollment.semester].map((tab) => {
          const active = tab === enrollment.semester;
          return (
            <div
              key={tab}
              className={[
                "text-[12px] px-[11px] py-[5px] cursor-pointer whitespace-nowrap border-b-[3px]",
                active ? "text-[#1971c2] border-[#1971c2] font-bold" : "text-[#555] border-transparent font-normal",
              ].join(" ")}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Enrollment dates */}
      <div className="text-[12.5px] font-bold text-[#212121] mb-[7px]">
        {enrollment.semester} Dates{" "}
        <span className="text-[11px] font-normal text-[#555]">(Pacific Time)</span>
      </div>

      <table className="w-full border-collapse text-[12px] mb-[10px]">
        <thead>
          <tr>
            {["Period", "Start", "", "End"].map((h, i) => (
              <th key={i} className="text-[#555] font-bold text-left pb-1 text-[11.5px] border-b border-[#e0e0e0]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {enrollment.phases.map((phase, i) => (
            <tr key={i}>
              <td className="py-[3px] text-[#212121]">{phase.label}</td>
              <td className="py-[3px] text-[#212121]">{phase.start}</td>
              <td className="py-[3px] pl-[3px] text-[#666] text-[11px]">{phase.startTime}</td>
              <td className="py-[3px] text-[#212121]">
                {phase.end} <span className="text-[#666] text-[11px]">{phase.endTime}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Deadlines */}
      <table className="w-full border-collapse text-[12px] mb-3">
        <thead>
          <tr>
            <th className="text-[#555] font-bold text-left pb-1 text-[11.5px] border-b border-[#e0e0e0]">Deadline</th>
            <th className="text-[#555] font-bold text-right pb-1 text-[11.5px] border-b border-[#e0e0e0]">Deadline Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollment.deadlines.map((deadline, i) => (
            <tr key={i}>
              <td className="py-[3px] text-[#212121]">{deadline.label}</td>
              <td className="py-[3px] text-right text-[#555]">
                {deadline.date} <span className="text-[11px]">{deadline.time}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-[10px] mb-3">
        <button className="bg-[#1c5fa8] text-white border-0 rounded-[3px] px-[13px] py-[6px] text-[12.5px] cursor-pointer">
          Enrollment Center
        </button>
        <button className="bg-white text-[#1c5fa8] border border-[#1c5fa8] rounded-[3px] px-[11px] py-[6px] text-[12.5px] cursor-pointer">
          Schedule Planner
        </button>
      </div>

      {/* Help links */}
      <div className="text-[12px] leading-[2.1]">
        {HELP_LINKS.map((link) => (
          <div key={link} className="flex items-center gap-[5px]">
            <span className="w-[9px] h-[9px] bg-[#5b9bd5] inline-block shrink-0" />
            <a href="#" className="text-[#1971c2]">{link} ↗</a>
          </div>
        ))}
      </div>
      <a href="#" className="text-[#1971c2] text-[12px] block mt-1">Learn More About Enrollment ∨</a>

      {/* Final exams */}
      <div className="text-sm font-bold text-[#212121] mt-[14px] mb-[5px]">Final Exam Schedule</div>
      <div className="text-[12px] text-[#555] mb-[6px]">
        Exam information is subject to change.{" "}
        <a href="#" className="text-[#1971c2]">Learn more</a>
      </div>
      <div className="text-[13px] font-bold text-[#212121]">{enrollment.semester} Final Exams</div>
    </div>
  );
}
