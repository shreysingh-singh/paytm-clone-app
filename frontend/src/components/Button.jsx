export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  leftIcon,
  rightIcon,
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition";

  const sizeMap = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const variantMap = {
    primary:
      "bg-sky-600 text-white hover:bg-sky-700 focus:ring-2 focus:ring-sky-300",
    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-50",
  };

  const sizeClass = sizeMap[size] || sizeMap.md;
  const variantClass = variantMap[variant] || variantMap.primary;
  const fullClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      className={`${base} ${sizeClass} ${variantClass} ${fullClass} ${disabledClass} ${className}`}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      )}

      {leftIcon ? (
        <span className="mr-2 inline-flex items-center">{leftIcon}</span>
      ) : null}

      <span>{children}</span>

      {rightIcon ? (
        <span className="ml-2 inline-flex items-center">{rightIcon}</span>
      ) : null}
    </button>
  );
}
