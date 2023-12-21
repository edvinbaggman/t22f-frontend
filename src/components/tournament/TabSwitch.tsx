import React, { ReactNode, useState } from 'react';

interface ChildElementProps {
  title: string;
  icon: ReactNode | string;
}

interface TabSwitchProps {
  children: React.ReactElement<ChildElementProps>[];
}

// Generalized tab component that makes the component's children to tabs
export default function TabSwitch({ children }: TabSwitchProps) {
  const [tab, setTab] = useState<number>(0);
  return (
    <>
      {/* The tabs */}
      <ul className='flex flex-row flex-wrap shadow sm:rounded-t-lg flex-nowrap overflow-scroll relative bg-white'>
        {children.map((child, idx) => (
          <li key={idx} className='flex-none text-center'>
            <div
              className={`bg-white block flex gap-1 items-center px-7 pb-3.5 pt-4 text-gray-700 hover:isolate rounded-t hover:bg-gray-100 focus:isolate focus:border-transparent dark:text-neutral-400 cursor-pointer border-b-4 ${
                tab === idx ? 'border-yellow-200' : 'border-white'
              }`}
              onClick={() => setTab(idx)}
            >
              {child.props.icon}
              {child.props.title}
            </div>
          </li>
        ))}
      </ul>
      {/* The tab pages */}
      <div className='h-full flex flex-col grow'>
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`${
              tab === idx
                ? 'border-t  flex flex-col grow bg-white shadow px-4 py-4  sm:px-8  sm:py-6 h-full'
                : 'hidden'
            }`}
            onClick={() => setTab(idx)}
          >
            {child}
          </div>
        ))}
      </div>
    </>
  );
}
