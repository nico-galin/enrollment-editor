import { useState } from 'react';
import type { ReactNode } from 'react';
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
import type { AppData } from './default-data';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}

function Field({ label, value, onChange, className }: FieldProps) {
  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      <Label className='text-xs text-muted-foreground'>{label}</Label>
      <Input
        className='h-7 text-xs'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Grid2({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-2 gap-2'>{children}</div>;
}

function Grid3({ children }: { children: ReactNode }) {
  return <div className='grid grid-cols-3 gap-2'>{children}</div>;
}

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

interface ConfigPaneProps {
  data: AppData;
  onChange: (data: AppData) => void;
}

export default function ConfigurationPane({ data, onChange }: ConfigPaneProps) {
  const update = (updater: (d: AppData) => void) => {
    const next: AppData = JSON.parse(JSON.stringify(data));
    updater(next);
    onChange(next);
  };

  const { student, semesters, enrollment } = data;

  return (
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
        {/* Student Tab */}
        <TabsContent value='student' className='flex-1 min-h-0'>
          <ScrollArea className='h-full'>
            <div className='space-y-1'>
              <CollapsibleGroup title='Identity'>
                <Grid2>
                  <Field
                    label='Full Name'
                    value={student.name}
                    onChange={(v) => update((d) => (d.student.name = v))}
                    className='col-span-2'
                  />
                  <Field
                    label='Avatar Initial'
                    value={student.initial}
                    onChange={(v) => update((d) => (d.student.initial = v))}
                  />
                  <Field
                    label='Career'
                    value={student.career}
                    onChange={(v) => update((d) => (d.student.career = v))}
                  />
                </Grid2>
                <Grid2>
                  <Field
                    label='Major'
                    value={student.major}
                    onChange={(v) => update((d) => (d.student.major = v))}
                    className='col-span-2'
                  />
                  <Field
                    label='Degree'
                    value={student.majorDegree}
                    onChange={(v) => update((d) => (d.student.majorDegree = v))}
                    className='col-span-2'
                  />
                  <Field
                    label='Level'
                    value={student.level}
                    onChange={(v) => update((d) => (d.student.level = v))}
                  />
                  <Field
                    label='Expected Grad'
                    value={student.expectedGraduation}
                    onChange={(v) =>
                      update((d) => (d.student.expectedGraduation = v))
                    }
                  />
                  <Field
                    label='Terms in Attendance'
                    value={String(student.termsInAttendance)}
                    onChange={(v) =>
                      update((d) => (d.student.termsInAttendance = v))
                    }
                  />
                </Grid2>
              </CollapsibleGroup>
              <Separator />
              <CollapsibleGroup title='Units'>
                <Grid2>
                  <Field
                    label='Total'
                    value={student.totalUnits}
                    onChange={(v) => update((d) => (d.student.totalUnits = v))}
                  />
                  <Field
                    label='Transfer'
                    value={student.transferUnits}
                    onChange={(v) =>
                      update((d) => (d.student.transferUnits = v))
                    }
                  />
                  <Field
                    label='P/NP Total'
                    value={student.pnpTotal}
                    onChange={(v) => update((d) => (d.student.pnpTotal = v))}
                  />
                  <Field
                    label='P/NP Passed'
                    value={student.pnpPassed}
                    onChange={(v) => update((d) => (d.student.pnpPassed = v))}
                  />
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
                <Card
                  key={sem.id}
                  title={sem.label || 'Semester'}
                  onRemove={
                    semesters.length > 1
                      ? () => update((d) => d.semesters.splice(si, 1))
                      : null
                  }
                >
                  <Field
                    label='Label'
                    value={sem.label}
                    onChange={(v) => update((d) => (d.semesters[si].label = v))}
                  />

                  <div className='flex items-center justify-between pt-1'>
                    <span className='text-[11px] font-medium text-muted-foreground uppercase tracking-wide'>
                      Courses ({sem.courses.length})
                    </span>
                    <Button
                      variant='outline'
                      size='sm'
                      className='h-6 text-xs px-2'
                      onClick={() =>
                        update((d) =>
                          d.semesters[si].courses.push({
                            id: `c_${Date.now()}`,
                            code: 'NEW 101',
                            title: 'Course Title',
                            sections: [],
                            units: '3.0',
                            grade: 'GRD',
                          }),
                        )
                      }
                    >
                      <Plus className='h-3 w-3 mr-1' />
                      Add Course
                    </Button>
                  </div>

                  <div className='space-y-2'>
                    {sem.courses.map((course, ci) => (
                      <Card
                        key={course.id}
                        title={`${course.code?.split('\n')[0]} — ${course.title?.slice(0, 18)}`}
                        onRemove={() =>
                          update((d) => d.semesters[si].courses.splice(ci, 1))
                        }
                        defaultOpen={false}
                      >
                        <Field
                          label='Code'
                          value={course.code}
                          onChange={(v) =>
                            update(
                              (d) => (d.semesters[si].courses[ci].code = v),
                            )
                          }
                        />
                        <Field
                          label='Title'
                          value={course.title}
                          onChange={(v) =>
                            update(
                              (d) => (d.semesters[si].courses[ci].title = v),
                            )
                          }
                        />
                        <Grid2>
                          <Field
                            label='Units'
                            value={course.units}
                            onChange={(v) =>
                              update(
                                (d) => (d.semesters[si].courses[ci].units = v),
                              )
                            }
                          />
                          <Field
                            label='Grade'
                            value={course.grade}
                            onChange={(v) =>
                              update(
                                (d) => (d.semesters[si].courses[ci].grade = v),
                              )
                            }
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
                              update((d) =>
                                d.semesters[si].courses[ci].sections.push({
                                  type: 'LEC',
                                  days: 'MWF',
                                  time: '10:00A–10:59A',
                                }),
                              )
                            }
                          >
                            <Plus className='h-3 w-3 mr-1' />
                            Add
                          </Button>
                        </div>

                        <div className='space-y-1.5'>
                          {course.sections.map((sec, xi) => (
                            <div key={xi} className='rounded p-2 space-y-1.5'>
                              <div className='flex items-center justify-between'>
                                <span className='text-[11px] font-medium text-muted-foreground'>
                                  Section {xi + 1}
                                </span>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='h-4 w-4 text-muted-foreground hover:text-destructive'
                                  onClick={() =>
                                    update((d) =>
                                      d.semesters[si].courses[
                                        ci
                                      ].sections.splice(xi, 1),
                                    )
                                  }
                                >
                                  <Trash2 className='h-2.5 w-2.5' />
                                </Button>
                              </div>
                              <Grid3>
                                <Field
                                  label='Type'
                                  value={sec.type}
                                  onChange={(v) =>
                                    update(
                                      (d) =>
                                        (d.semesters[si].courses[ci].sections[
                                          xi
                                        ].type = v),
                                    )
                                  }
                                />
                                <Field
                                  label='Days'
                                  value={sec.days}
                                  onChange={(v) =>
                                    update(
                                      (d) =>
                                        (d.semesters[si].courses[ci].sections[
                                          xi
                                        ].days = v),
                                    )
                                  }
                                />
                                <Field
                                  label='Time'
                                  value={sec.time}
                                  onChange={(v) =>
                                    update(
                                      (d) =>
                                        (d.semesters[si].courses[ci].sections[
                                          xi
                                        ].time = v),
                                    )
                                  }
                                />
                              </Grid3>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}

              <Button
                variant='outline'
                size='sm'
                className='w-full h-7 text-xs'
                onClick={() =>
                  update((d) =>
                    d.semesters.push({
                      id: `sem_${Date.now()}`,
                      label: 'New Semester',
                      courses: [],
                    }),
                  )
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
                <Field
                  label='Active Semester Tab'
                  value={enrollment.semester}
                  onChange={(v) => update((d) => (d.enrollment.semester = v))}
                />
              </CollapsibleGroup>

              <Separator />

              <CollapsibleGroup title={`Phases (${enrollment.phases.length})`}>
                <div className='space-y-2'>
                  {enrollment.phases.map((p, i) => (
                    <Card
                      key={i}
                      title={p.label}
                      onRemove={() =>
                        update((d) => d.enrollment.phases.splice(i, 1))
                      }
                      defaultOpen={false}
                    >
                      <Field
                        label='Label'
                        value={p.label}
                        onChange={(v) =>
                          update((d) => (d.enrollment.phases[i].label = v))
                        }
                      />
                      <Grid2>
                        <Field
                          label='Start Date'
                          value={p.start}
                          onChange={(v) =>
                            update((d) => (d.enrollment.phases[i].start = v))
                          }
                        />
                        <Field
                          label='Start Time'
                          value={p.startTime}
                          onChange={(v) =>
                            update(
                              (d) => (d.enrollment.phases[i].startTime = v),
                            )
                          }
                        />
                        <Field
                          label='End Date'
                          value={p.end}
                          onChange={(v) =>
                            update((d) => (d.enrollment.phases[i].end = v))
                          }
                        />
                        <Field
                          label='End Time'
                          value={p.endTime}
                          onChange={(v) =>
                            update((d) => (d.enrollment.phases[i].endTime = v))
                          }
                        />
                      </Grid2>
                    </Card>
                  ))}
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full h-7 text-xs'
                    onClick={() =>
                      update((d) =>
                        d.enrollment.phases.push({
                          label: 'New Phase',
                          start: 'Jan 1',
                          startTime: '8:00am',
                          end: 'Jan 31',
                          endTime: '11:59pm',
                        }),
                      )
                    }
                  >
                    <Plus className='h-3 w-3 mr-1' />
                    Add Phase
                  </Button>
                </div>
              </CollapsibleGroup>

              <Separator />

              <CollapsibleGroup
                title={`Deadlines (${enrollment.deadlines.length})`}
              >
                <div className='space-y-2'>
                  {enrollment.deadlines.map((d, i) => (
                    <Card
                      key={i}
                      title={d.label}
                      onRemove={() =>
                        update((n) => n.enrollment.deadlines.splice(i, 1))
                      }
                      defaultOpen={false}
                    >
                      <Field
                        label='Label'
                        value={d.label}
                        onChange={(v) =>
                          update((n) => (n.enrollment.deadlines[i].label = v))
                        }
                      />
                      <Grid2>
                        <Field
                          label='Date'
                          value={d.date}
                          onChange={(v) =>
                            update((n) => (n.enrollment.deadlines[i].date = v))
                          }
                        />
                        <Field
                          label='Time'
                          value={d.time}
                          onChange={(v) =>
                            update((n) => (n.enrollment.deadlines[i].time = v))
                          }
                        />
                      </Grid2>
                    </Card>
                  ))}
                  <Button
                    variant='outline'
                    size='sm'
                    className='w-full h-7 text-xs'
                    onClick={() =>
                      update((d) =>
                        d.enrollment.deadlines.push({
                          label: 'New Deadline',
                          date: 'Jan 31',
                          time: '11:59pm',
                        }),
                      )
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
  );
}
