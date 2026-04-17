import warningImg from '../../assets/warning.png';

export function PreviewAlertBar() {
  return (
    <div className='bg-[#FFDB6E] py-2 px-[14px] text-[12.5px] flex items-center text-[#3e2900] font-semibold'>
      <b className='mr-3'>CalCentral Update</b>
      <img src={warningImg} width={22} />
      <span>
        CalCentral will be unavailable Wednesday morning, April 22, 2026, for
        scheduled maintenance
      </span>
      <a href='#' className='text-[#1565c0] text-[12.5px] ml-auto font-bold'>
        Learn More
      </a>
    </div>
  );
}
