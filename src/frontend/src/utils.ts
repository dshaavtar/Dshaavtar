// ─── Phone validation ─────────────────────────────────────────────────────────

/**
 * Validates that a phone number has:
 * - 7–15 characters
 * - Digits only, or leading + followed by digits
 * No letters or special chars (other than optional leading +).
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return false;
  const trimmed = phone.trim();
  // Must be 7–15 chars (digits + optional leading +)
  if (trimmed.length < 7 || trimmed.length > 16) return false;
  // Only allow: optional leading + followed by digits
  return /^\+?[0-9]{7,15}$/.test(trimmed);
}

export const PHONE_ERROR_MSG =
  "Please enter a valid phone number (7–15 digits, optionally starting with +)";

// ─── Count guard ──────────────────────────────────────────────────────────────

/**
 * Convert a potentially BigInt or -1 count value to a safe non-negative number.
 * Guards against Motoko returning -1 or undefined for empty states.
 */
export function safeCount(value: unknown): number {
  if (value === undefined || value === null) return 0;
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}
