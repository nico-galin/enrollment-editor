export function PreviewAlertBar() {
  return (
    <div className="bg-[#fff9c4] border-b-2 border-[#f9a825] py-[7px] px-[14px] text-[12.5px] flex items-center gap-[7px] text-[#3e2900]">
      <span className="inline-block w-0 h-0 border-l-[7px] border-r-[7px] border-b-[13px] border-l-transparent border-r-transparent border-b-[#f9a825] shrink-0" />
      <b>CalCentral Update</b>
      &nbsp;CalCentral will be unavailable Wednesday morning, April 22, 2026, for scheduled maintenance
      <a href="#" className="text-[#1565c0] text-[12.5px] ml-auto font-bold">Learn More</a>
    </div>
  );
}
