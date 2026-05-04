export function Heading({
  label,
  as = "h1",
  size = "xl",
  align = "left",
  subtitle,
  className = "",
}) {
  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const sizeClass = sizeMap[size] || sizeMap.xl;
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";
  const base = "font-medium p-6 text-slate-900";
  const Tag = as;

  return (
    <>
      <Tag className={`${sizeClass} ${base} ${alignClass} ${className}`}>
        {label}
      </Tag>
      {subtitle ? (
        <p className="text-sm text-slate-500 px-6">{subtitle}</p>
      ) : null}
    </>
  );
}
