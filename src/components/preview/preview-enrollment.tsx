import type { Enrollment } from '../../default-data';
import Pane from '../pane';
import plannerImg from '../../assets/planner.png';
import infoImg from '../../assets/info.png';

const HELP_LINKS = [
  'How to Change Grading Basis',
  'How to Add, Drop or Swap a Class',
  'How to Use the Schedule Planner',
];

export function PreviewEnrollment({ enrollment }: { enrollment: Enrollment }) {
  return (
    <div className='flex flex-col gap-4'>
      <Pane>
        <Pane.Header>
          Class Enrollment
          <span className='text-[13px] font-normal text-[#555] uppercase tracking-[0.3px] ml-2'>
            UNDERGRADUATE
          </span>
        </Pane.Header>
        <Pane.Content>
          {/* Semester tabs */}
          <div className='flex border-b border-[#ccc] mb-[10px]'>
            {['Fall 2026', 'Summer 2026', enrollment.semester].map((tab) => {
              const active = tab === enrollment.semester;
              return (
                <div
                  key={tab}
                  className={[
                    'flex-1 min-w-0 text-center text-[13px] px-[11px] py-[8px] cursor-pointer whitespace-nowrap border-b-[3px]',
                    active
                      ? 'text-[#1971c2] border-[#1971c2] font-bold'
                      : 'text-[#555] border-transparent font-normal',
                  ].join(' ')}
                >
                  {tab}
                </div>
              );
            })}
          </div>

          {/* Enrollment dates */}
          <div className='flex text-[14px] font-bold text-[#212121] mb-[7px]'>
            {enrollment.semester} Dates
            <span className='ml-1 mr-2 text-[12px] font-normal text-[#555]'>
              (Pacific Time)
            </span>
            <img src={infoImg} width={16} />
          </div>

          <div
            className='text-[13px] mb-[10px]'
            style={{
              display: 'grid',
              gridTemplateColumns: '30% 15% 15% 15% auto',
            }}
          >
            {['Period', 'Start', '', 'End', ''].map((h, i) => (
              <div key={i} className='text-[#555] font-bold text-[12px]'>
                {h}
              </div>
            ))}
            {enrollment.phases.map((phase, i) => (
              <>
                <div key={`${i}-label`}>{phase.label}</div>
                <div key={`${i}-start`}>{phase.start}</div>
                <div key={`${i}-startTime`}>{phase.startTime}</div>
                <div key={`${i}-end`}>{phase.end}</div>
                <div key={`${i}-endTime`}>{phase.endTime}</div>
              </>
            ))}
          </div>

          {/* Deadlines */}
          <div
            className='text-[13px] mb-3'
            style={{ display: 'grid', gridTemplateColumns: '60% 16% auto' }}
          >
            <div className='text-[#555] font-bold text-[12px]'>Deadline</div>
            <div className='text-[#555] font-bold text-[12px] text-nowrap'>
              Deadline Date
            </div>
            <div className='text-[#555] font-bold text-[12px]'></div>
            {enrollment.deadlines.map((deadline, i) => (
              <>
                <div key={`${i}-label`} className='flex gap-1'>
                  {deadline.label}
                  {deadline.label === 'Early drop' ? (
                    <img src={infoImg} width={14} />
                  ) : null}
                </div>
                <div key={`${i}-date`}>{deadline.date}</div>
                <div key={`${i}-time`}>{deadline.time}</div>
              </>
            ))}
          </div>

          {/* Action buttons */}
          <div className='flex items-center justify-center gap-2 mt-[10px] mb-3'>
            <button className='bg-[#1c5fa8] text-white rounded-[6px] px-3 py-1 text-[12.5px] cursor-pointer'>
              Enrollment Center
            </button>
            <button className='flex gap-1 align-center text-[#1c5fa8] px-[11px] py-[6px] text-[12.5px] cursor-pointer'>
              <img src={plannerImg} width={14} />
              Schedule Planner
            </button>
          </div>

          {/* Help links */}
          <div className='text-[12px] leading-[2.1]'>
            {HELP_LINKS.map((link) => (
              <div key={link} className='flex items-center gap-[5px]'>
                <span className='w-[9px] h-[9px] bg-[#5b9bd5] inline-block shrink-0' />
                <a href='#' className='text-[#1971c2] font-bold'>
                  {link} ↗
                </a>
              </div>
            ))}
          </div>
          <a
            href='#'
            className='text-[#1971c2] text-[12px] block mt-2 text-center font-bold'
          >
            Learn More About Enrollment ∨
          </a>
        </Pane.Content>
      </Pane>
      <Pane>
        <Pane.Header>Final Exam Schedule</Pane.Header>
        <Pane.Content>
          <div className='text-[12px] text-[#555] mb-[6px]'>
            Exam information is subject to change.{' '}
            <a href='#' className='text-[#1971c2]'>
              Learn more
            </a>
          </div>
          <div className='text-[13px] font-bold text-[#212121]'>
            {enrollment.semester} Final Exams
          </div>
        </Pane.Content>
      </Pane>
    </div>
  );
}
