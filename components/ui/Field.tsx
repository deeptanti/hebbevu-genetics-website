import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Field - label + control + hint/error.
 * CONTROL BOUNDARY IS GRAPHITE (7.3:1), NEVER STONE (brief §6 contrast trap).
 * Focus uses the global 2px brown outline. Errors use `danger` - the only place it appears.
 */
const controlBase =
  "transition-ui type-body block w-full rounded-sm border bg-white px-4 py-3 text-ink min-h-7 hover:border-ink";

interface BaseProps {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

type InputProps = BaseProps & { as?: "input" } & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">;
type SelectProps = BaseProps & {
  as: "select";
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "className">;
type TextareaProps = BaseProps & { as: "textarea" } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className">;

export type FieldProps = InputProps | SelectProps | TextareaProps;

export function Field(props: FieldProps) {
  const { label, name, hint, error, required, className } = props;
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const cls = cn(controlBase, error ? "border-danger" : "border-graphite");
  const aria = { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy };

  let control: ReactNode;
  if (props.as === "select") {
    const { options, placeholder, as: _as, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    control = (
      <select id={id} required={required} className={cls} {...aria} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else if (props.as === "textarea") {
    const { as: _as, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    control = <textarea id={id} required={required} className={cls} rows={4} {...aria} {...rest} />;
  } else {
    const { as: _as, label: _l, hint: _h, error: _e, className: _c, ...rest } = props;
    control = <input id={id} required={required} className={cls} {...aria} {...rest} />;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-label text-graphite">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="normal-case tracking-normal"> (optional)</span>}
      </label>
      {control}
      {hint && !error && (
        <p id={`${id}-hint`} className="type-small text-graphite">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="type-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
