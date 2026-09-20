import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '~/utils';

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentOption<T>[];
  ariaLabel: string;
  testId?: string;
}

export default function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  testId,
}: SegmentedControlProps<T>) {
  const selectByOffset = (offset: number) => {
    const currentIndex = Math.max(
      0,
      options.findIndex((option) => option.value === value),
    );
    const nextIndex = (currentIndex + offset + options.length) % options.length;
    onChange(options[nextIndex].value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        selectByOffset(1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        selectByOffset(-1);
        break;
      case 'Home':
        event.preventDefault();
        onChange(options[0].value);
        break;
      case 'End':
        event.preventDefault();
        onChange(options[options.length - 1].value);
        break;
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      data-testid={testId}
      onKeyDown={handleKeyDown}
      className="inline-flex max-w-full flex-wrap rounded-lg bg-surface-tertiary p-0.5"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-xheavy',
              selected
                ? 'bg-surface-primary text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
