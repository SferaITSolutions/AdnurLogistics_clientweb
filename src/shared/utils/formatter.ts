// ✅ Telefon formatlash (+998 99 999 99 99)
export const formatPhone = (value: string, withoutPrefix?: boolean): string => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');

  let formatted = digits;

  if (formatted.startsWith('998')) {
    formatted = formatted.slice(3);
  }

  const formattedNumber =
    (formatted.substring(0, 2) ? formatted.substring(0, 2) : '') +
    (formatted.substring(2, 5) ? ' ' + formatted.substring(2, 5) : '') +
    (formatted.substring(5, 7) ? ' ' + formatted.substring(5, 7) : '') +
    (formatted.substring(7, 9) ? ' ' + formatted.substring(7, 9) : '');

  return withoutPrefix ? formattedNumber : '+998 ' + formattedNumber;
};

export const formatPhoneTR = (value: string, withoutPrefix?: boolean): string => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');

  let formatted = digits;

  if (formatted.startsWith('90')) {
    formatted = formatted.slice(2);
  }

  const formattedNumber =
    (formatted.substring(0, 3) ? '' + formatted.substring(0, 3) + '' : '') +
    (formatted.substring(3, 6) ? ' ' + formatted.substring(3, 6) : '') +
    (formatted.substring(6, 8) ? ' ' + formatted.substring(6, 8) : '') +
    (formatted.substring(8, 10) ? ' ' + formatted.substring(8, 10) : '');

  return withoutPrefix ? formattedNumber : '+90 ' + formattedNumber;
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

export const deformatPhoneTR = (value: string): string => {
  if (!value) return '';
  let digits = value.replace(/\D/g, '');
  if (!digits.startsWith('90')) {
    digits = '90' + digits;
  }
  return digits;
};
