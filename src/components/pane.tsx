import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { ClassNameValue } from 'tailwind-merge';

export default function Pane(props: PropsWithChildren) {
  return <div className='w-[444px] shrink-0 bg-white'>{props.children}</div>;
}

Pane.Header = (props: PropsWithChildren<{ className?: ClassNameValue }>) => {
  return (
    <div
      className={cn(
        'text-lg font-md mb-3 bg-gray-200 px-3 py-2',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Pane.Content = (props: PropsWithChildren<{ className?: ClassNameValue }>) => {
  return <div className={cn('p-3', props.className)}>{props.children}</div>;
};
