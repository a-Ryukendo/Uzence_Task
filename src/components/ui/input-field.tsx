"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LoaderCircle, X } from "lucide-react";

const inputVariants = cva(
  "flex items-center w-full rounded-md border text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outlined: "border-input bg-transparent",
        filled: "bg-muted border-muted hover:border-input",
        ghost: "border-transparent bg-transparent hover:bg-muted",
      },
      inputSize: {
        sm: "h-9",
        md: "h-10",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "outlined",
      inputSize: "md",
    },
  }
);

const inputElementVariants = cva("w-full h-full bg-transparent px-3 py-2", {
  variants: {
    inputSize: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    inputSize: "md",
  },
});

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  loading?: boolean;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type,
      variant,
      size = 'md',
      label,
      helperText,
      errorMessage,
      invalid = false,
      loading = false,
      disabled = false,
      clearable = false,
      showPasswordToggle = false,
      id,
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalId = React.useId();
    const inputId = id || internalId;
    
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const hasValue = !!value;
    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      const inputEl = e.currentTarget.parentElement?.querySelector('input');
      if (!inputEl) return;

      const syntheticEvent = new Event('input', { bubbles: true });
      Object.defineProperty(syntheticEvent, 'target', { writable: true, value: { value: '' } });
      
      if (onChange) {
          const reactChangeEvent = {
            ...new Event('change', { bubbles: true }),
            target: inputEl,
            currentTarget: inputEl,
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          inputEl.value = '';
          onChange(reactChangeEvent);
      }
      
      if (!isControlled) {
        setUncontrolledValue('');
      }
      
      inputEl.focus();
    };
    
    const handleTogglePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        setShowPassword(prev => !prev);
        e.stopPropagation();
        const inputContainer = e.currentTarget.parentElement;
        const inputEl = inputContainer?.querySelector('input');
        if (inputEl) inputEl.focus();
    }

    const currentType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className={cn("grid w-full items-center gap-1.5", className)}>
        {label && <Label htmlFor={inputId}>{label}</Label>}
        <div
          className={cn(
            inputVariants({ variant, inputSize: size }),
            invalid && "border-destructive focus-within:ring-destructive"
          )}
        >
          <input
            type={currentType}
            className={cn(inputElementVariants({ inputSize: size }), "peer")}
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            aria-invalid={invalid}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {loading && <LoaderCircle className="animate-spin h-4 w-4 mr-3 text-muted-foreground" />}
          {clearable && hasValue && !loading && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-muted-foreground hover:text-foreground mr-2 rounded-full"
              aria-label="Clear input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {showPasswordToggle && type === 'password' && !loading && !disabled && (
            <button
                type="button"
                onClick={handleTogglePassword}
                className="p-1 text-muted-foreground hover:text-foreground mr-2 rounded-full"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {invalid && errorMessage && (
          <p className="text-sm font-medium text-destructive">{errorMessage}</p>
        )}
        {!invalid && helperText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";

export { InputField };
