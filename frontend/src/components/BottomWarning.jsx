import React from "react";

export function BottomWarning({
  message = "",
  linkText,
  linkHref = "#",
  onLinkClick,
  visible = true,
  onClose,
  variant = "warning", // 'warning' | 'info' | 'error'
  className = "",
}) {
  if (!visible) return null;

  const variants = {
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      text: "text-yellow-800",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.336-.213 3.008-1.742 3.008H3.481c-1.53 0-2.492-1.672-1.742-3.008L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-7a1 1 0 00-.993.883L9 7v4a1 1 0 102 0V7a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-300",
      text: "text-blue-800",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 7a1 1 0 112 0 1 1 0 01-2 0zm1 2a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-300",
      text: "text-red-800",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.593c.75 1.336-.213 3.008-1.742 3.008H3.481c-1.53 0-2.492-1.672-1.742-3.008L8.257 3.1zM10 12a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM9 7a1 1 0 112 0 1 1 0 01-2 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const v = variants[variant] || variants.warning;

  function handleLinkClick(e) {
    if (onLinkClick) {
      e.preventDefault();
      onLinkClick(e);
    }
  }

  return (
    <div
      role="status"
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full mx-4 ${v.bg} ${v.border} ${v.text} border rounded-md shadow-sm flex items-center justify-between px-4 py-3 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{v.icon}</div>
        <div className="text-sm">
          {message}
          {linkText ? (
            <span className="ml-2">
              <a
                href={linkHref}
                onClick={handleLinkClick}
                className={`font-medium underline ${v.text}`}
              >
                {linkText}
              </a>
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {onClose ? (
          <button
            onClick={onClose}
            aria-label="Dismiss"
            className="p-1 rounded hover:bg-slate-100"
          >
            <svg
              className={`h-5 w-5 ${v.text}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
