import type { Path } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { AppData } from '../constants/default-data';
import {
  Card,
  DeleteButton,
  Field,
  FieldArrayHeader,
  Grid,
  SelectField,
} from './config-components';

const GRADE_OPTIONS = ['GRD', 'PNP'];

const SECTION_TYPES = ['LEC', 'LAB', 'DIS'];
const SECTION_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'MWF', 'TuTh', 'WeFr', 'MoWe', 'Sa', 'Su'];

// ---------------------------------------------------------------------------
// CourseCard — owns the sections field array
// ---------------------------------------------------------------------------

interface CourseCardProps {
  semIndex: number;
  courseIndex: number;
  onRemove: () => void;
}

function CourseCard({ semIndex, courseIndex, onRemove }: CourseCardProps) {
  const { control, watch } = useFormContext<AppData>();
  const sectionsName =
    `semesters.${semIndex}.courses.${courseIndex}.sections` as `semesters.${number}.courses.${number}.sections`;
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: sectionsName });

  const code = watch(
    `semesters.${semIndex}.courses.${courseIndex}.code` as Path<AppData>,
  );

  return (
    <Card
      title={String(code ?? '').split('\n')[0] || 'Course'}
      onRemove={onRemove}
      defaultOpen={false}
    >
      <Field
        name={
          `semesters.${semIndex}.courses.${courseIndex}.code` as Path<AppData>
        }
        label='Code'
      />
      <Field
        name={
          `semesters.${semIndex}.courses.${courseIndex}.title` as Path<AppData>
        }
        label='Title'
      />
      <Grid cols={2}>
        <Field
          name={
            `semesters.${semIndex}.courses.${courseIndex}.units` as Path<AppData>
          }
          label='Units'
          type='number'
        />
        <SelectField
          name={
            `semesters.${semIndex}.courses.${courseIndex}.grade` as Path<AppData>
          }
          label='Grade'
          options={GRADE_OPTIONS}
        />
      </Grid>

      <FieldArrayHeader
        label='Sections'
        onAdd={() =>
          appendSection({ type: 'LEC', days: 'MWF', startTime: '10:00A', endTime: '10:59A' })
        }
      />

      <div className='space-y-1.5'>
        {sections.map((sec, xi) => (
          <div key={sec.id} className='rounded p-2 space-y-1.5'>
            <div className='flex items-center justify-between'>
              <span className='text-[11px] font-medium text-muted-foreground'>
                Section {xi + 1}
              </span>
              <DeleteButton size='sm' onClick={() => removeSection(xi)} />
            </div>
            <Grid cols={2}>
              <SelectField
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.type` as Path<AppData>
                }
                label='Type'
                options={SECTION_TYPES}
              />
              <SelectField
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.days` as Path<AppData>
                }
                label='Days'
                options={SECTION_DAYS}
              />
              <Field
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.startTime` as Path<AppData>
                }
                label='Start Time'
              />
              <Field
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.endTime` as Path<AppData>
                }
                label='End Time'
              />
            </Grid>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// SemesterCard — owns the courses field array
// ---------------------------------------------------------------------------

export interface SemesterCardProps {
  semIndex: number;
  canRemove: boolean;
  onRemove: () => void;
  defaultEditingTitle?: boolean;
}

export function SemesterCard({
  semIndex,
  canRemove,
  onRemove,
  defaultEditingTitle = false,
}: SemesterCardProps) {
  const { control, watch, setValue } = useFormContext<AppData>();
  const coursesName =
    `semesters.${semIndex}.courses` as `semesters.${number}.courses`;
  const {
    fields: courses,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({ control, name: coursesName });

  const label = watch(`semesters.${semIndex}.label` as Path<AppData>);

  return (
    <Card
      title={String(label || 'Semester')}
      onRemove={canRemove ? onRemove : null}
      onTitleChange={(v) =>
        setValue(`semesters.${semIndex}.label` as Path<AppData>, v as never, {
          shouldDirty: true,
        })
      }
      defaultEditingTitle={defaultEditingTitle}
    >
      <FieldArrayHeader
        label={`Courses (${courses.length})`}
        addLabel='Add Course'
        onAdd={() =>
          appendCourse({
            id: `c_${Date.now()}`,
            code: 'NEW 101',
            title: 'Course Title',
            sections: [],
            units: '3.0',
            grade: 'GRD',
          })
        }
      />

      <div className='space-y-2'>
        {courses.map((course, ci) => (
          <CourseCard
            key={course.id}
            semIndex={semIndex}
            courseIndex={ci}
            onRemove={() => removeCourse(ci)}
          />
        ))}
      </div>
    </Card>
  );
}
