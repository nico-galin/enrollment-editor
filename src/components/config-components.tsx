import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';
import type { Path } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import type { AppData } from '../constants/default-data';

// ---------------------------------------------------------------------------
// Field — reads/writes via FormProvider context
// ---------------------------------------------------------------------------

interface FieldProps {
  name: Path<AppData>;
  label: string;
  className?: string;
  type?: string;
}

export function Field({ name, label, className, type }: FieldProps) {
  const { control } = useFormContext<AppData>();
  const { field, fieldState } = useController({ control, name });
  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      <Label className='text-xs text-muted-foreground'>{label}</Label>
      <Input
        type={type}
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
// SelectField
// ---------------------------------------------------------------------------

interface SelectFieldProps {
  name: Path<AppData>;
  label: string;
  options: string[];
  className?: string;
}

export function SelectField({ name, label, options, className }: SelectFieldProps) {
  const { control } = useFormContext<AppData>();
  const { field } = useController({ control, name });
  return (
    <div className={`space-y-1 ${className ?? ''}`}>
      <Label className='text-xs text-muted-foreground'>{label}</Label>
      <Select value={String(field.value)} onValueChange={field.onChange}>
        <SelectTrigger className='h-8 text-xs'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt} className='text-xs'>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

const colsClass = { 2: 'grid-cols-2', 3: 'grid-cols-3' } as const;

export function Grid({ cols, children }: { cols: 2 | 3; children: ReactNode }) {
  return <div className={`grid ${colsClass[cols]} gap-2`}>{children}</div>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
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

export function AddButton({ label, onClick, fullWidth = false }: AddButtonProps) {
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

export function DeleteButton({ onClick, size = 'md' }: DeleteButtonProps) {
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

export function FieldArrayHeader({
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
// Card
// ---------------------------------------------------------------------------

interface CardProps {
  title: string;
  onRemove?: (() => void) | null;
  children: ReactNode;
  defaultOpen?: boolean;
  onTitleChange?: (value: string) => void;
  defaultEditingTitle?: boolean;
}

export function Card({
  title,
  onRemove,
  children,
  defaultOpen = true,
  onTitleChange,
  defaultEditingTitle = false,
}: CardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [editingTitle, setEditingTitle] = useState(defaultEditingTitle);
  const [draft, setDraft] = useState(title);

  const inputRef = useCallback((el: HTMLInputElement | null) => {
    if (el) {
      el.scrollIntoView({ block: 'nearest' });
      el.focus();
      el.select();
    }
  }, []);

  function startEditing() {
    setDraft(title);
    setEditingTitle(true);
  }

  function commitEdit() {
    setEditingTitle(false);
    onTitleChange?.(draft);
  }

  function cancelEdit() {
    setEditingTitle(false);
  }

  const chevron = open ? (
    <ChevronDown className='h-3 w-3 shrink-0 text-muted-foreground' />
  ) : (
    <ChevronRight className='h-3 w-3 shrink-0 text-muted-foreground' />
  );

  return (
    <div className='rounded-md shadow-sm bg-card'>
      <div className='flex items-center justify-between px-3 py-1.5'>
        {onTitleChange ? (
          <div className='flex items-center gap-1 flex-1 min-w-0'>
            <button className='shrink-0' onClick={() => setOpen((o) => !o)}>
              {chevron}
            </button>
            {editingTitle ? (
              <input
                ref={inputRef}
                className='text-xs font-medium flex-1 min-w-0 bg-transparent border-b border-border outline-none p-0 leading-none'
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') commitEdit();
                  else if (e.key === 'Escape') cancelEdit();
                }}
              />
            ) : (
              <span
                className='text-xs font-medium truncate cursor-text hover:text-muted-foreground'
                onClick={startEditing}
              >
                {title}
              </span>
            )}
          </div>
        ) : (
          <button
            className='flex items-center gap-1 flex-1 min-w-0 text-left'
            onClick={() => setOpen((o) => !o)}
          >
            {chevron}
            <span className='text-xs font-medium truncate'>{title}</span>
          </button>
        )}
        {onRemove && <DeleteButton onClick={onRemove} />}
      </div>
      {open && <div className='px-3 pb-3 space-y-2 pt-2'>{children}</div>}
    </div>
  );
}
