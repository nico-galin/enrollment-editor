import type { Student } from "../../default-data";

const NAV_ITEMS = ["My Dashboard", "My Academics", "$ My Finances", "My Campus"];

export function PreviewTopbar({ student }: { student: Student }) {
  return (
    <div className="bg-[#1c3148] flex items-center h-[46px] px-3">
      <div className="text-[17px] font-bold text-white tracking-[-0.3px] mr-5">
        <b className="font-black">CAL</b>
        <span className="font-light">CENTRAL</span>
      </div>

      {NAV_ITEMS.map((item) => {
        const active = item === "My Academics";
        return (
          <div
            key={item}
            className={[
              "text-[12.5px] px-[13px] h-[46px] flex items-center border-b-[3px]",
              active
                ? "text-white border-[#5b9bd5] bg-white/8"
                : "text-[#b0bec5] border-transparent",
            ].join(" ")}
          >
            {item}
          </div>
        );
      })}

      <div className="ml-auto flex items-center gap-[10px] text-[#cfd8dc] text-[12px]">
        <span className="bg-[#d93025] text-white text-[10px] font-bold px-[5px] py-[2px] rounded-[3px]">
          ✉ 6854
        </span>
        <span className="bg-[#1565c0] text-white text-[10px] font-bold px-[6px] py-[2px] rounded-[3px]">
          31
        </span>
        <div className="w-7 h-7 rounded-full bg-[#8bc34a] flex items-center justify-center text-white text-[11px] font-bold">
          {student.initial || student.name.charAt(0)}
        </div>
        <span className="text-[#cfd8dc] text-[12px]">{student.name.split(" ")[0]} ▾</span>
      </div>
    </div>
  );
}
