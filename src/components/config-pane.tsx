import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { Path } from 'react-hook-form';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { defaultData, type AppData } from '../constants/default-data';
import { AppDataSchema } from '../schema';
import {
  AddButton,
  Card,
  Field,
  Grid,
  FieldArrayHeader,
} from './config-components';
import { SemesterCard } from './semester-card';

// ---------------------------------------------------------------------------
// PhotoUpload
// ---------------------------------------------------------------------------

function PhotoUpload() {
  const { setValue, watch } = useFormContext<AppData>();
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

  const [newSemId, setNewSemId] = useState<string | null>(null);

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
      <div className='px-4 flex flex-col w-full md:w-[380px] shrink-0 flex-1 md:flex-none overflow-y-auto md:h-full'>
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
            <ScrollArea className='h-full [&_[data-slot=scroll-area-scrollbar]]:hidden'>
              <div className='space-y-2'>
                {semesters.map((sem, si) => (
                  <SemesterCard
                    key={sem.id}
                    semIndex={si}
                    canRemove={semesters.length > 1}
                    onRemove={() => removeSemester(si)}
                    defaultEditingTitle={sem.id === newSemId}
                  />
                ))}
                <AddButton
                  label='Add Semester'
                  fullWidth
                  onClick={() => {
                    const id = `sem_${Date.now()}`;
                    setNewSemId(id);
                    appendSemester({ id, label: 'New Semester', courses: [] });
                  }}
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
