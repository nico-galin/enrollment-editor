import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  useForm,
  useFormContext,
  useFieldArray,
  Controller,
  FormProvider,
} from 'react-hook-form';
import type { Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { AppDataSchema } from './schema';
import type { AppData } from './default-data';

// ---------------------------------------------------------------------------
// Field — reads/writes via FormProvider context
// ---------------------------------------------------------------------------

interface FieldProps {
  name: Path<AppData>;
  label: string;
  className?: string;
}

function Field({ name, label, className }: FieldProps) {
  const { control } = useFormContext<AppData>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={`space-y-1 ${className ?? ''}`}>
          <Label className='text-xs text-muted-foreground'>{label}</Label>
          <Input
            className={`h-7 text-xs${fieldState.error ? ' border-destructive' : ''}`}
            {...field}
          />
          {fieldState.error && (
            <p className='text-[10px] text-destructive leading-tight'>
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function Grid2({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-2 gap-2'>{children}</div>;
}

function Grid3({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-3 gap-2'>{children}</div>;
}

// ---------------------------------------------------------------------------
// CollapsibleGroup
// ---------------------------------------------------------------------------

interface CollapsibleGroupProps {
  title: string;
  badge?: number;
  children: ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleGroup({
  title,
  badge,
  children,
  defaultOpen = true,
}: CollapsibleGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className='flex w-full items-center justify-between px-3 py-2 text-left hover:bg-muted/50 transition-colors'>
        <div className='flex items-center gap-1.5'>
          {open ? (
            <ChevronDown className='h-3.5 w-3.5 text-muted-foreground' />
          ) : (
            <ChevronRight className='h-3.5 w-3.5 text-muted-foreground' />
          )}
          <span className='text-xs font-medium text-foreground'>{title}</span>
          {badge !== undefined && (
            <Badge variant='secondary' className='h-4 px-1.5 text-[10px]'>
              {badge}
            </Badge>
          )}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='px-3 pb-3 pt-2 space-y-2'>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface CardProps {
  title: string;
  onRemove?: (() => void) | null;
  children: ReactNode;
  defaultOpen?: boolean;
}

function Card({ title, onRemove, children, defaultOpen = true }: CardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className='rounded-md border bg-muted/30'>
      <div className='flex items-center justify-between px-3 py-1.5'>
        <button
          className='flex items-center gap-1 text-left flex-1 min-w-0'
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <ChevronDown className='h-3 w-3 shrink-0 text-muted-foreground' />
          ) : (
            <ChevronRight className='h-3 w-3 shrink-0 text-muted-foreground' />
          )}
          <span className='text-xs font-medium truncate'>{title}</span>
        </button>
        {onRemove && (
          <Button
            variant='ghost'
            size='icon'
            className='h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive'
            onClick={onRemove}
          >
            <Trash2 className='h-3 w-3' />
          </Button>
        )}
      </div>
      {open && (
        <div className='px-3 pb-3 space-y-2 border-t pt-2'>{children}</div>
      )}
    </div>
  );
}

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
  const { fields: sections, append: appendSection, remove: removeSection } =
    useFieldArray({ control, name: sectionsName });

  const code = watch(
    `semesters.${semIndex}.courses.${courseIndex}.code` as Path<AppData>,
  );
  const title = watch(
    `semesters.${semIndex}.courses.${courseIndex}.title` as Path<AppData>,
  );

  return (
    <Card
      title={`${String(code ?? '').split('\n')[0]} — ${String(title ?? '').slice(0, 18)}`}
      onRemove={onRemove}
      defaultOpen={false}
    >
      <Field
        name={`semesters.${semIndex}.courses.${courseIndex}.code` as Path<AppData>}
        label='Code'
      />
      <Field
        name={`semesters.${semIndex}.courses.${courseIndex}.title` as Path<AppData>}
        label='Title'
      />
      <Grid2>
        <Field
          name={`semesters.${semIndex}.courses.${courseIndex}.units` as Path<AppData>}
          label='Units'
        />
        <Field
          name={`semesters.${semIndex}.courses.${courseIndex}.grade` as Path<AppData>}
          label='Grade'
        />
      </Grid2>

      <div className='flex items-center justify-between pt-1'>
        <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-wide'>
          Sections
        </span>
        <Button
          variant='outline'
          size='sm'
          className='h-6 text-xs px-2'
          onClick={() =>
            appendSection({ type: 'LEC', days: 'MWF', time: '10:00A–10:59A' })
          }
        >
          <Plus className='h-3 w-3 mr-1' />
          Add
        </Button>
      </div>

      <div className='space-y-1.5'>
        {sections.map((sec, xi) => (
          <div key={sec.id} className='rounded p-2 space-y-1.5'>
            <div className='flex items-center justify-between'>
              <span className='text-[11px] font-medium text-muted-foreground'>
                Section {xi + 1}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='h-4 w-4 text-muted-foreground hover:text-destructive'
                onClick={() => removeSection(xi)}
              >
                <Trash2 className='h-2.5 w-2.5' />
              </Button>
            </div>
            <Grid3>
              <Field
                name={`semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.type` as Path<AppData>}
                label='Type'
              />
              <Field
                name={`semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.days` as Path<AppData>}
                label='Days'
              />
              <Field
                name={`semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.time` as Path<AppData>}
                label='Time'
              />
            </Grid3>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// SemesterCard — owns the courses field array
// ---------------------------------------------------------------------------

interface SemesterCardProps {
  semIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

function SemesterCard({ semIndex, canRemove, onRemove }: SemesterCardProps) {
  const { control, watch } = useFormContext<AppData>();
  const coursesName =
    `semesters.${semIndex}.courses` as `semesters.${number}.courses`;
  const { fields: courses, append: appendCourse, remove: removeCourse } =
    useFieldArray({ control, name: coursesName });

  const label = watch(`semesters.${semIndex}.label` as Path<AppData>);

  return (
    <Card
      title={String(label || 'Semester')}
      onRemove={canRemove ? onRemove : null}
    >
      <Field
        name={`semesters.${semIndex}.label` as Path<AppData>}
        label='Label'
      />

      <div className='flex items-center justify-between pt-1'>
        <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-wide'>
          Courses ({courses.length})
        </span>
        <Button
          variant='outline'
          size='sm'
          className='h-6 text-xs px-2'
          onClick={() =>
            appendCourse({
              id: `c_${Date.now()}`,
              code: 'NEW 101',
              title: 'Course Title',
              sections: [],
              units: '3.0',
              grade: 'GRD',
            })
          }
        >
          <Plus className='h-3 w-3 mr-1' />
          Add Course
        </Button>
      </div>

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

// ---------------------------------------------------------------------------
// ConfigurationPane
// ---------------------------------------------------------------------------

interface ConfigPaneProps {
  data: AppData;
  onChange: (data: AppData) => void;
}

export default function ConfigurationPane({ data, onChange }: ConfigPaneProps) {
  const form = useForm<AppData>({
    resolver: zodResolver(AppDataSchema),
    defaultValues: data,
    mode: 'onChange',
  });

  const { control, watch } = form;

  // Sync every change up to the parent for live preview
  useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as AppData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const { fields: semesters, append: appendSemester, remove: removeSemester } =
    useFieldArray({ control, name: 'semesters' });

  const { fields: phases, append: appendPhase, remove: removePhase } =
    useFieldArray({ control, name: 'enrollment.phases' });

  const { fields: deadlines, append: appendDeadline, remove: removeDeadline } =
    useFieldArray({ control, name: 'enrollment.deadlines' });

  return (
    <FormProvider {...form}>
      <div className='px-4 flex flex-col w-[320px] shrink-0 h-screen'>
        <div className='py-3'>
          <h1 className='text-sm font-semibold'>Enrollment Configuration</h1>
        </div>

        <Tabs defaultValue='student' className='flex flex-col flex-1 min-h-0'>
          <TabsList className='w-auto shrink-0'>
            <TabsTrigger value='student' className='text-xs'>
              Profile
            </TabsTrigger>
            <TabsTrigger value='semesters' className='text-xs'>
              Semesters
              <Badge variant='secondary' className='h-4 px-1.5 text-[10px] ml-1'>
                {semesters.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value='enrollment' className='text-xs'>
              Enrollment
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value='student' className='flex-1 min-h-0'>
            <ScrollArea className='h-full'>
              <div className='space-y-1'>
                <CollapsibleGroup title='Identity'>
                  <Grid2>
                    <Field name='student.name' label='Full Name' className='col-span-2' />
                    <Field name='student.initial' label='Avatar Initial' />
                    <Field name='student.career' label='Career' />
                  </Grid2>
                  <Grid2>
                    <Field name='student.major' label='Major' className='col-span-2' />
                    <Field name='student.majorDegree' label='Degree' className='col-span-2' />
                    <Field name='student.level' label='Level' />
                    <Field name='student.expectedGraduation' label='Expected Grad' />
                    <Field name='student.termsInAttendance' label='Terms in Attendance' />
                  </Grid2>
                </CollapsibleGroup>
                <Separator />
                <CollapsibleGroup title='Units'>
                  <Grid2>
                    <Field name='student.totalUnits' label='Total' />
                    <Field name='student.transferUnits' label='Transfer' />
                    <Field name='student.pnpTotal' label='P/NP Total' />
                    <Field name='student.pnpPassed' label='P/NP Passed' />
                  </Grid2>
                </CollapsibleGroup>
                <div className='h-4' />
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Semesters Tab */}
          <TabsContent value='semesters' className='flex-1 min-h-0'>
            <ScrollArea className='h-full'>
              <div className='space-y-2'>
                {semesters.map((sem, si) => (
                  <SemesterCard
                    key={sem.id}
                    semIndex={si}
                    canRemove={semesters.length > 1}
                    onRemove={() => removeSemester(si)}
                  />
                ))}
                <Button
                  variant='outline'
                  size='sm'
                  className='w-full h-7 text-xs'
                  onClick={() =>
                    appendSemester({
                      id: `sem_${Date.now()}`,
                      label: 'New Semester',
                      courses: [],
                    })
                  }
                >
                  <Plus className='h-3 w-3 mr-1' />
                  Add Semester
                </Button>
                <div className='h-4' />
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Enrollment Tab */}
          <TabsContent value='enrollment' className='flex-1 min-h-0'>
            <ScrollArea className='h-full'>
              <div className='space-y-1'>
                <CollapsibleGroup title='Active Semester'>
                  <Field name='enrollment.semester' label='Active Semester Tab' />
                </CollapsibleGroup>

                <Separator />

                <CollapsibleGroup title={`Phases (${phases.length})`}>
                  <div className='space-y-2'>
                    {phases.map((p, i) => (
                      <Card
                        key={p.id}
                        title={(watch(`enrollment.phases.${i}.label` as Path<AppData>) as string) || 'Phase'}
                        onRemove={() => removePhase(i)}
                        defaultOpen={false}
                      >
                        <Field name={`enrollment.phases.${i}.label` as Path<AppData>} label='Label' />
                        <Grid2>
                          <Field name={`enrollment.phases.${i}.start` as Path<AppData>} label='Start Date' />
                          <Field name={`enrollment.phases.${i}.startTime` as Path<AppData>} label='Start Time' />
                          <Field name={`enrollment.phases.${i}.end` as Path<AppData>} label='End Date' />
                          <Field name={`enrollment.phases.${i}.endTime` as Path<AppData>} label='End Time' />
                        </Grid2>
                      </Card>
                    ))}
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full h-7 text-xs'
                      onClick={() =>
                        appendPhase({
                          label: 'New Phase',
                          start: 'Jan 1',
                          startTime: '8:00am',
                          end: 'Jan 31',
                          endTime: '11:59pm',
                        })
                      }
                    >
                      <Plus className='h-3 w-3 mr-1' />
                      Add Phase
                    </Button>
                  </div>
                </CollapsibleGroup>

                <Separator />

                <CollapsibleGroup title={`Deadlines (${deadlines.length})`}>
                  <div className='space-y-2'>
                    {deadlines.map((d, i) => (
                      <Card
                        key={d.id}
                        title={(watch(`enrollment.deadlines.${i}.label` as Path<AppData>) as string) || 'Deadline'}
                        onRemove={() => removeDeadline(i)}
                        defaultOpen={false}
                      >
                        <Field name={`enrollment.deadlines.${i}.label` as Path<AppData>} label='Label' />
                        <Grid2>
                          <Field name={`enrollment.deadlines.${i}.date` as Path<AppData>} label='Date' />
                          <Field name={`enrollment.deadlines.${i}.time` as Path<AppData>} label='Time' />
                        </Grid2>
                      </Card>
                    ))}
                    <Button
                      variant='outline'
                      size='sm'
                      className='w-full h-7 text-xs'
                      onClick={() =>
                        appendDeadline({
                          label: 'New Deadline',
                          date: 'Jan 31',
                          time: '11:59pm',
                        })
                      }
                    >
                      <Plus className='h-3 w-3 mr-1' />
                      Add Deadline
                    </Button>
                  </div>
                </CollapsibleGroup>
                <div className='h-4' />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </FormProvider>
  );
}
