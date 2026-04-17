import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Path } from 'react-hook-form';
import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { defaultData, type AppData } from '../constants/default-data';
import { AppDataSchema } from '../schema';

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
  const { field, fieldState } = useController({ control, name });
  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      <Label className='text-xs text-muted-foreground'>{label}</Label>
      <Input
        className={`h-8 text-xs${fieldState.error ? ' border-destructive' : ''}`}
        {...field}
      />
      {fieldState.error && (
        <p className='text-[10px] text-destructive leading-tight'>
          {fieldState.error.message}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// PhotoUpload
// ---------------------------------------------------------------------------

function PhotoUpload() {
  const { control, setValue, watch } = useFormContext<AppData>();
  const photo = watch('student.photo');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setValue('student.photo', reader.result as string, { shouldDirty: true });
    reader.readAsDataURL(file);
  }

  return (
    <div className='flex items-center gap-3'>
      <div
        className='w-12 h-12 rounded-full bg-muted border flex items-center justify-center overflow-hidden shrink-0 cursor-pointer'
        onClick={() => fileRef.current?.click()}
      >
        {photo ? (
          <img src={photo} className='w-full h-full object-cover' />
        ) : (
          <span className='text-[10px] text-muted-foreground text-center leading-tight px-1'>
            No photo
          </span>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <Button
          variant='outline'
          size='sm'
          className='h-7 text-xs'
          onClick={() => fileRef.current?.click()}
        >
          Upload photo
        </Button>
        {photo && (
          <Button
            variant='ghost'
            size='sm'
            className='h-6 text-[10px] text-muted-foreground px-2'
            onClick={() =>
              setValue('student.photo', undefined, { shouldDirty: true })
            }
          >
            Remove
          </Button>
        )}
      </div>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFile}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

const colsClass = { 2: 'grid-cols-2', 3: 'grid-cols-3' } as const;

function Grid({ cols, children }: { cols: 2 | 3; children: ReactNode }) {
  return <div className={`grid ${colsClass[cols]} gap-2`}>{children}</div>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-wide'>
      {children}
    </span>
  );
}

interface AddButtonProps {
  label: string;
  onClick: () => void;
  fullWidth?: boolean;
}

function AddButton({ label, onClick, fullWidth = false }: AddButtonProps) {
  return (
    <Button
      variant='outline'
      size='sm'
      className={fullWidth ? 'w-full h-7 text-xs' : 'h-6 text-xs px-2'}
      onClick={onClick}
    >
      <Plus className='h-3 w-3 mr-1' />
      {label}
    </Button>
  );
}

interface DeleteButtonProps {
  onClick: () => void;
  size?: 'md' | 'sm';
}

function DeleteButton({ onClick, size = 'md' }: DeleteButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={
        size === 'sm'
          ? 'h-4 w-4 text-muted-foreground hover:text-destructive'
          : 'h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive'
      }
      onClick={onClick}
    >
      <Trash2 className={size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'} />
    </Button>
  );
}

interface FieldArrayHeaderProps {
  label: string;
  onAdd: () => void;
  addLabel?: string;
}

function FieldArrayHeader({
  label,
  onAdd,
  addLabel = 'Add',
}: FieldArrayHeaderProps) {
  return (
    <div className='flex items-center justify-between pt-1'>
      <SectionLabel>{label}</SectionLabel>
      <AddButton label={addLabel} onClick={onAdd} />
    </div>
  );
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
        {onRemove && <DeleteButton onClick={onRemove} />}
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
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({ control, name: sectionsName });

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
        />
        <Field
          name={
            `semesters.${semIndex}.courses.${courseIndex}.grade` as Path<AppData>
          }
          label='Grade'
        />
      </Grid>

      <FieldArrayHeader
        label='Sections'
        onAdd={() =>
          appendSection({ type: 'LEC', days: 'MWF', time: '10:00A–10:59A' })
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
            <Grid cols={3}>
              <Field
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.type` as Path<AppData>
                }
                label='Type'
              />
              <Field
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.days` as Path<AppData>
                }
                label='Days'
              />
              <Field
                name={
                  `semesters.${semIndex}.courses.${courseIndex}.sections.${xi}.time` as Path<AppData>
                }
                label='Time'
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

interface SemesterCardProps {
  semIndex: number;
  canRemove: boolean;
  onRemove: () => void;
}

function SemesterCard({ semIndex, canRemove, onRemove }: SemesterCardProps) {
  const { control, watch } = useFormContext<AppData>();
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
    >
      <Field
        name={`semesters.${semIndex}.label` as Path<AppData>}
        label='Label'
      />

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

// ---------------------------------------------------------------------------
// ConfigurationPane
// ---------------------------------------------------------------------------

interface ConfigPaneProps {
  data: AppData;
  onChange: (data: AppData) => void;
  onReset: () => void;
}

export default function ConfigurationPane({
  data,
  onChange,
  onReset,
}: ConfigPaneProps) {
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

  const {
    fields: semesters,
    append: appendSemester,
    remove: removeSemester,
  } = useFieldArray({ control, name: 'semesters' });

  const {
    fields: phases,
    append: appendPhase,
    remove: removePhase,
  } = useFieldArray({ control, name: 'enrollment.phases' });

  const {
    fields: deadlines,
    append: appendDeadline,
    remove: removeDeadline,
  } = useFieldArray({ control, name: 'enrollment.deadlines' });

  return (
    <FormProvider {...form}>
      <div className='px-4 flex flex-col w-full md:w-[320px] shrink-0 flex-1 md:flex-none overflow-y-auto md:h-full'>
        <Tabs defaultValue='student' className='flex flex-col flex-1 min-h-0'>
          <TabsList className='w-auto shrink-0'>
            <TabsTrigger value='student' className='text-xs'>
              Profile
            </TabsTrigger>
            <TabsTrigger value='semesters' className='text-xs'>
              Semesters
              <Badge
                variant='secondary'
                className='h-4 px-1.5 text-[10px] ml-1'
              >
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
                <div className='space-y-2 py-2'>
                  <PhotoUpload />
                  <Grid cols={2}>
                    <Field
                      name='student.name'
                      label='Full Name'
                      className='col-span-2'
                    />
                    <Field name='student.career' label='Career' />
                  </Grid>
                  <Grid cols={2}>
                    <Field
                      name='student.major'
                      label='Major'
                      className='col-span-2'
                    />
                    <Field
                      name='student.majorDegree'
                      label='Degree'
                      className='col-span-2'
                    />
                    <Field name='student.level' label='Level' />
                    <Field
                      name='student.expectedGraduation'
                      label='Expected Grad'
                    />
                    <Field
                      name='student.termsInAttendance'
                      label='Terms in Attendance'
                    />
                  </Grid>
                </div>
                <Separator />
                <CollapsibleGroup title='Units'>
                  <Grid cols={2}>
                    <Field name='student.totalUnits' label='Total' />
                    <Field name='student.transferUnits' label='Transfer' />
                    <Field name='student.pnpTotal' label='P/NP Total' />
                    <Field name='student.pnpPassed' label='P/NP Passed' />
                  </Grid>
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
                <AddButton
                  label='Add Semester'
                  fullWidth
                  onClick={() =>
                    appendSemester({
                      id: `sem_${Date.now()}`,
                      label: 'New Semester',
                      courses: [],
                    })
                  }
                />
                <div className='h-4' />
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Enrollment Tab */}
          <TabsContent value='enrollment' className='flex-1 min-h-0'>
            <ScrollArea className='h-full'>
              <div className='space-y-1'>
                <CollapsibleGroup title='Active Semester'>
                  <Field
                    name='enrollment.semester'
                    label='Active Semester Tab'
                  />
                </CollapsibleGroup>

                <Separator />

                <CollapsibleGroup title={`Phases (${phases.length})`}>
                  <div className='space-y-2'>
                    {phases.map((p, i) => (
                      <Card
                        key={p.id}
                        title={
                          (watch(
                            `enrollment.phases.${i}.label` as Path<AppData>,
                          ) as string) || 'Phase'
                        }
                        onRemove={() => removePhase(i)}
                        defaultOpen={false}
                      >
                        <Field
                          name={`enrollment.phases.${i}.label` as Path<AppData>}
                          label='Label'
                        />
                        <Grid cols={2}>
                          <Field
                            name={
                              `enrollment.phases.${i}.start` as Path<AppData>
                            }
                            label='Start Date'
                          />
                          <Field
                            name={
                              `enrollment.phases.${i}.startTime` as Path<AppData>
                            }
                            label='Start Time'
                          />
                          <Field
                            name={`enrollment.phases.${i}.end` as Path<AppData>}
                            label='End Date'
                          />
                          <Field
                            name={
                              `enrollment.phases.${i}.endTime` as Path<AppData>
                            }
                            label='End Time'
                          />
                        </Grid>
                      </Card>
                    ))}
                    <AddButton
                      label='Add Phase'
                      fullWidth
                      onClick={() =>
                        appendPhase({
                          label: 'New Phase',
                          start: 'Jan 1',
                          startTime: '8:00am',
                          end: 'Jan 31',
                          endTime: '11:59pm',
                        })
                      }
                    />
                  </div>
                </CollapsibleGroup>

                <Separator />

                <CollapsibleGroup title={`Deadlines (${deadlines.length})`}>
                  <div className='space-y-2'>
                    {deadlines.map((d, i) => (
                      <Card
                        key={d.id}
                        title={
                          (watch(
                            `enrollment.deadlines.${i}.label` as Path<AppData>,
                          ) as string) || 'Deadline'
                        }
                        onRemove={() => removeDeadline(i)}
                        defaultOpen={false}
                      >
                        <Field
                          name={
                            `enrollment.deadlines.${i}.label` as Path<AppData>
                          }
                          label='Label'
                        />
                        <Grid cols={2}>
                          <Field
                            name={
                              `enrollment.deadlines.${i}.date` as Path<AppData>
                            }
                            label='Date'
                          />
                          <Field
                            name={
                              `enrollment.deadlines.${i}.time` as Path<AppData>
                            }
                            label='Time'
                          />
                        </Grid>
                      </Card>
                    ))}
                    <AddButton
                      label='Add Deadline'
                      fullWidth
                      onClick={() =>
                        appendDeadline({
                          label: 'New Deadline',
                          date: 'Jan 31',
                          time: '11:59pm',
                        })
                      }
                    />
                  </div>
                </CollapsibleGroup>
                <div className='h-4' />
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className='py-3 border-t border-border'>
          <Button
            variant='ghost'
            size='sm'
            className='w-full h-7 text-xs text-muted-foreground hover:text-destructive'
            onClick={() => {
              form.reset(defaultData);
              onReset();
            }}
          >
            Reset to defaults
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
