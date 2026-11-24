/** Join class names. Deliberately tiny — no merging magic, so token misuse stays visible. */
export function cn(...classes: unknown[]): string {
  return classes.filter((c): c is string => typeof c === "string" && c.length > 0).join(" ");
}
