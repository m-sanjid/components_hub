"use client";

import * as React from "react";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandX,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconMail,
} from "@tabler/icons-react";

// Context for form state
interface AuthFormContextValue {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
  isSubmitting: boolean;
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  errors: Record<string, string | null>;
  setErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | null>>
  >;
}

const AuthFormContext = React.createContext<AuthFormContextValue | undefined>(
  undefined,
);

const useAuthForm = () => {
  const context = React.useContext(AuthFormContext);
  if (!context) {
    throw new Error("Auth components must be used within an AuthForm");
  }
  return context;
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  ({ className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(
        className,
        "flex items-center justify-center gap-2 rounded-md border bg-neutral-50 px-4 py-2 dark:bg-neutral-950",
      )}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {children}
    </motion.button>
  ),
);
Button.displayName = "Button";

// AuthForm - Main container
interface AuthFormProps {
  children: React.ReactNode;
  onSubmit?: (
    data: Record<string, string>,
    mode: "login" | "signup",
  ) => Promise<void> | void;
  mode?: "login" | "signup";
  className?: string;
  loading?: boolean;
}

export function AuthForm({
  children,
  onSubmit,
  mode = "login",
  className,
  loading = false,
}: AuthFormProps) {
  const [currentMode, setCurrentMode] = React.useState<"login" | "signup">(
    mode,
  );
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string | null>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataObj = new FormData(e.currentTarget);
    const values = Object.fromEntries(formDataObj.entries()) as Record<
      string,
      string
    >;

    setIsSubmitting(true);
    try {
      await onSubmit?.(values, currentMode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contextValue: AuthFormContextValue = {
    mode: currentMode,
    setMode: setCurrentMode,
    isSubmitting: loading || isSubmitting,
    formData,
    setFormData,
    errors,
    setErrors,
  };

  return (
    <AuthFormContext.Provider value={contextValue}>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          className={cn(
            "w-full max-w-md space-y-6 rounded-xl border bg-white p-6 shadow-lg backdrop-blur-sm dark:bg-neutral-900",
            className,
          )}
        >
          <motion.form
            noValidate
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, staggerChildren: 0.05 }}
          >
            {children}
          </motion.form>
        </motion.div>
      </div>
    </AuthFormContext.Provider>
  );
}

// AuthHeader - Title and subtitle
interface AuthHeaderProps {
  title?: { login: string; signup: string };
  subtitle?: { login?: string; signup?: string };
  className?: string;
}

export function AuthHeader({
  title = { login: "Welcome back", signup: "Create account" },
  subtitle = {
    login: "Enter your credentials to access your account",
    signup: "Enter your information to get started",
  },
  className,
}: AuthHeaderProps) {
  const { mode } = useAuthForm();

  return (
    <motion.div
      className={cn("space-y-2 text-center", className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="text-2xl font-semibold tracking-tight"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.3 }}
      >
        {mode === "login" ? title.login : title.signup}
      </motion.h1>

      <AnimatePresence mode="wait">
        {subtitle && (
          <motion.p
            key={mode}
            className="text-muted-foreground text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "login" ? subtitle.login : subtitle.signup}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AuthToggleLinkProps {
  labels?: { login: string; signup: string };
  footerText?: {
    login: string; // e.g., "Don't have an account?"
    signup: string; // e.g., "Already have an account?"
  };
  className?: string;
}

export function AuthToggleLink({
  labels = { login: "Sign in", signup: "Sign up" },
  footerText = {
    login: "Don't have an account?",
    signup: "Already have an account?",
  },
  className,
}: AuthToggleLinkProps) {
  const { mode, setMode } = useAuthForm();

  return (
    <motion.div
      className={cn(
        "text-muted-foreground mt-4 text-center text-sm",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {mode === "login" ? (
        <span>
          {footerText.login}{" "}
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="text-foreground font-semibold tracking-tight hover:underline"
          >
            {labels.signup}
          </button>
        </span>
      ) : (
        <span>
          {footerText.signup}{" "}
          <button
            type="button"
            onClick={() => setMode("login")}
            className="text-foreground font-semibold tracking-tight hover:underline"
          >
            {labels.login}
          </button>
        </span>
      )}
    </motion.div>
  );
}

// AuthField - Form field
interface AuthFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  className?: string;
  showOnlyFor?: "login" | "signup";
}

interface AuthFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  showOnlyFor?: "login" | "signup";
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  className?: string;
  validate?: (value: string) => string | null; // return error message or null
}

export function AuthField({
  name,
  label,
  type = "text",
  required = false,
  showOnlyFor,
  placeholder,
  icon,
  showPasswordToggle = false,
  className,
  validate,
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const inputId = `field-${name}`;
  const isPassword = type === "password";
  const actualType = isPassword && showPassword ? "text" : type;

  // run validation live
  React.useEffect(() => {
    if (!validate) return;
    if (value.length === 0) {
      setError(null);
      return;
    }
    setError(validate(value));
  }, [value, validate]);

  const { mode, setFormData, setErrors } = useAuthForm();

  React.useEffect(() => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [value, error, name, setFormData, setErrors]);

  if (showOnlyFor && showOnlyFor !== mode) {
    return null;
  }

  if (name === "email") {
    validate = (value) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email address";
      return null;
    };
  }
  if (validate && name === "password") {
    validate = (value) => {
      if (!value) return "Password is required";
      if (value.length < 8)
        return "Password must be at least 8 characters long";
      return null;
    };
  }
  if (validate && name === "name") {
    validate = (value) => {
      if (!value) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters long";
      return null;
    };
  }

  return (
    <motion.div
      className={cn("space-y-2", className)}
      initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.2 }}
    >
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-center justify-between text-sm leading-none font-medium transition-colors",
          isFocused && "text-primary",
        )}
      >
        {label}
        <AnimatePresence mode="wait">
          {error === null && value && (
            <motion.span
              key="valid"
              className="flex items-center gap-1 text-xs text-green-600"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
            >
              <IconCircleCheckFilled className="h-3 w-3" /> Looks good
            </motion.span>
          )}
          {error && (
            <motion.span
              key="error"
              className="flex items-center gap-1 text-xs text-red-500"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
            >
              <IconCircleXFilled className="h-3 w-3" /> {error}
            </motion.span>
          )}
        </AnimatePresence>
      </label>

      <div className="group relative">
        {icon && (
          <motion.div
            className={cn(
              "text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2",
              isFocused && "text-primary",
            )}
            animate={{ scale: isFocused ? 1.1 : 1 }}
          >
            {icon}
          </motion.div>
        )}

        <motion.input
          id={inputId}
          name={name}
          type={actualType}
          required={required}
          placeholder={placeholder}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            "placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md bg-neutral-100 px-3 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-neutral-800",
            icon && "pl-10",
            isPassword && showPasswordToggle && "pr-10",
            isFocused ? "border-0 shadow-sm" : "border",
            error && "border-red-500",
          )}
          whileFocus={{ scale: 1.01 }}
        />

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <IconEyeOff className="text-muted-foreground h-4 w-4" />
            ) : (
              <IconEye className="text-muted-foreground h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}

// AuthTextArea - Textarea field
interface AuthTextAreaProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  showOnlyFor?: "login" | "signup";
}

export function AuthTextArea({
  name,
  label,
  required = false,
  placeholder,
  rows = 4,
  className,
  showOnlyFor,
}: AuthTextAreaProps) {
  const { mode } = useAuthForm();
  const [isFocused, setIsFocused] = React.useState(false);

  const inputId = `field-${name}`;

  // Hide field if showOnlyFor is specified and doesn't match current mode
  if (showOnlyFor && showOnlyFor !== mode) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className={cn("space-y-2", className)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        layout
      >
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm leading-none font-medium transition-colors",
            isFocused && "text-primary",
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>

        <motion.textarea
          id={inputId}
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full resize-none rounded-md border px-3 py-2 text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            isFocused && "border-primary shadow-sm",
          )}
          whileFocus={{ scale: 1.01 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

// AuthSocial - Social auth buttons
const socialIcons = {
  github: IconBrandGithub,
  google: IconBrandGoogle,
  twitter: IconBrandX,
  email: IconMail,
} as const;

interface AuthSocialProps {
  provider: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function AuthSocial({
  provider,
  children,
  icon,
  onClick,
  className,
}: AuthSocialProps) {
  const IconComponent = socialIcons[provider as keyof typeof socialIcons];
  const buttonIcon =
    icon || (IconComponent && <IconComponent className="h-4 w-4" />);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <Button
        type="button"
        onClick={onClick}
        className={cn("h-11 w-full justify-center gap-2", className)}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.3 }}
        >
          {buttonIcon}
        </motion.div>
        {children}
      </Button>
    </motion.div>
  );
}

// AuthSeparator - Visual separator
interface AuthSeparatorProps {
  text?: string;
  className?: string;
}

export function AuthSeparator({ text = "or", className }: AuthSeparatorProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background text-muted-foreground px-2">{text}</span>
      </div>
    </motion.div>
  );
}

// AuthSubmit - Submit button
interface AuthSubmitProps {
  children?: React.ReactNode;
  labels?: { login: string; signup: string };
  className?: string;
  loadingText?: string;
}

export function AuthSubmit({
  children,
  labels = { login: "Sign in", signup: "Create account" },
  className,
  loadingText = "Please wait...",
}: AuthSubmitProps) {
  const { mode, isSubmitting, formData, errors } = useAuthForm();

  const buttonText =
    children || (mode === "login" ? labels.login : labels.signup);

  // Disable if submitting OR errors OR required fields missing
  const hasErrors = Object.values(errors).some((err) => err !== null);
  const hasEmptyRequired = ["email", "password"].some(
    (field) => !formData[field]?.trim(),
  );
  const isDisabled = isSubmitting || hasErrors || hasEmptyRequired;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="pt-2"
    >
      <Button
        type="submit"
        disabled={isDisabled}
        className={cn(
          "h-11 w-full text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <IconLoader2 className="h-4 w-4 animate-spin" />
              <span>{loadingText}</span>
            </motion.div>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {buttonText}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}

// AuthLink - Link to external pages
interface AuthLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AuthLink({
  href,
  onClick,
  children,
  className,
}: AuthLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={cn(
        "text-primary hover:text-primary/80 cursor-pointer text-sm transition-colors",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}
