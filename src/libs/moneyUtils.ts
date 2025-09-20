const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

const teens = ['mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn', 'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín'];

const tens = ['', '', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ', 'tỷ tỷ'];

export const convertNumberToWords = (num: number): string => {
  if (num === 0) return 'không đồng';

  let words = '';
  let unitIndex = 0;

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk !== 0) {
      words = convertThreeDigits(chunk) + (units[unitIndex] ? ' ' + units[unitIndex] : '') + ' ' + words;
    }
    num = Math.floor(num / 1000);
    unitIndex++;
  }

  return words.trim() + ' đồng';
};

const convertThreeDigits = (num: number): string => {
  let hundred = Math.floor(num / 100);
  let remainder = num % 100;
  let result = '';

  if (hundred > 0) {
    result += ones[hundred] + ' trăm';
    if (remainder > 0) result += ' ';
  }

  if (remainder >= 10 && remainder < 20) {
    result += teens[remainder - 10];
  } else if (remainder >= 20) {
    let ten = Math.floor(remainder / 10);
    let one = remainder % 10;
    result += tens[ten];
    if (one > 0) result += ' ' + ones[one];
  } else if (remainder > 0) {
    result += 'lẻ ' + ones[remainder];
  }

  return result;
};
