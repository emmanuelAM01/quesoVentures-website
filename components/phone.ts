/**
 * Phone formatting for the contact form.
 *
 * A deliberate copy of packages/sms/src/phone.ts in the portal repo, because
 * these are two separate repositories with no shared package between them and
 * a formatter is not worth publishing one for. If the shape ever changes,
 * change it in both — it is four lines of arithmetic and it has not moved in
 * the entire life of the business.
 */

function digitsOnly(raw: string): string {
  return raw.replace(/\D/g, "");
}

/**
 * A US number as it is being typed: (713) 555-0142.
 *
 * Progressive, so the shape appears from the fourth digit rather than waiting
 * for a complete number. Anything starting with '+' is left alone, because
 * imposing a US shape on an international number would be actively wrong, and
 * a leading country code is dropped rather than pushed into the area code.
 *
 * Deleting needs no special handling. The value is re-derived from the digits
 * every time, so one keystroke removes one digit — no cursor trap where
 * backspace lands on a bracket the formatter immediately puts back.
 */
export function formatPhoneInput(raw: string): string {
  if (raw.trim().startsWith("+")) return raw;

  let d = digitsOnly(raw);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  d = d.slice(0, 10);

  if (d.length === 0) return "";
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/**
 * The same shape, for the one field that takes an email OR a phone number.
 *
 * This form asks for a single contact and accepts either, so the formatting
 * has to be certain before it touches anything. It leaves alone anything
 * holding a letter or an '@', and it unwinds its own brackets if one turns up
 * late — without that, an address opening with digits ("0621emmanuel@…") gets
 * four characters in, becomes "(062) 1", and cannot be recovered without
 * clearing the field.
 */
export function formatContactInput(raw: string): string {
  if (/[a-zA-Z@]/.test(raw)) {
    // Undo our own formatting, and only ever our own: the bracketed prefix
    // this function produces. A dash or a dot anywhere else is left alone,
    // because plenty of real addresses contain both.
    const m = /^\((\d{3})\)\s(\d{1,3})(?:-(\d{1,4}))?/.exec(raw);
    if (!m) return raw;
    return `${m[1]}${m[2]}${m[3] ?? ""}${raw.slice(m[0].length)}`;
  }
  return formatPhoneInput(raw);
}
