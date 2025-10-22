// ✅ Telefon formatlash (+998 99 999 99 99)
export const formatPhone = (value: string): string => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');

  let formatted = digits;

  if (formatted.startsWith('998')) {
    formatted = formatted.slice(3);
  }

  return (
    '+998 ' +
    (formatted.substring(0, 2) ? formatted.substring(0, 2) : '') +
    (formatted.substring(2, 5) ? ' ' + formatted.substring(2, 5) : '') +
    (formatted.substring(5, 7) ? ' ' + formatted.substring(5, 7) : '') +
    (formatted.substring(7, 9) ? ' ' + formatted.substring(7, 9) : '')
  );
};

// ✅ Telefon deformatlash (998999999 -> 998999999999)
export const deformatPhone = (value: string): string => {
  if (!value) return '';
  let digits = value.replace(/\D/g, '');
  if (!digits.startsWith('998')) {
    digits = '998' + digits;
  }
  return digits;
};
