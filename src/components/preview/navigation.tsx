import { useState } from 'react';
import homeImg from '../../assets/home.png';
import bookImg from '../../assets/book.png';
import moneyImg from '../../assets/money.png';
import gridImg from '../../assets/grid.png';

const NAV_ITEMS = [
  {
    value: 'dashboard',
    label: 'My Dashboard',
    icon: <img src={homeImg} width={20} height={20} />,
  },
  {
    value: 'academics',
    label: 'My Academics',
    icon: <img src={bookImg} width={20} height={20} />,
  },
  {
    value: 'finances',
    label: 'My Finances',
    icon: <img src={moneyImg} width={20} height={20} />,
  },
  {
    value: 'campus',
    label: 'My Campus',
    icon: <img src={gridImg} width={20} height={20} />,
  },
];

export const Navigation = () => {
  const [activeTab, _setActiveTab] = useState('academics');

  return (
    <div className='bg-[#2C5E7E] flex w-full py-1.5 px-2'>
      {NAV_ITEMS.map((item) => {
        const isActive = item.value === activeTab;

        return (
          <div
            key={item.value}
            className={[
              'text-[12.5px] text-white px-[12px] h-[30px] flex items-center rounded-sm gap-1',
              isActive ? 'font-bold bg-[#5E7C96]' : undefined,
            ].join(' ')}
          >
            {item.icon}
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
