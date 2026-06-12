function validatePhone(phone) {
  if (!phone) return false;
  const trimmed = phone.trim();
  if (trimmed.length < 7 || trimmed.length > 16) return false;
  return /^\+?[0-9]{7,15}$/.test(trimmed);
}
const PHONE_ERROR_MSG = "Please enter a valid phone number (7–15 digits, optionally starting with +)";
function safeCount(value) {
  if (value === void 0 || value === null) return 0;
  const n = typeof value === "bigint" ? Number(value) : Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}
export {
  PHONE_ERROR_MSG as P,
  safeCount as s,
  validatePhone as v
};
