import Cookies from 'js-cookie';

export const formatString = (value: string, variables: any) => {
  if (!value) {
    return '';
  }

  return value.replace(/(\{\w+\})|(:\w+)/g, (match: any) => {
    return variables[match.replace(/\{|\}|:/g, '')] || '';
  });
};

// Function to format the amount
export function formatMoney(amount = 0, currencySymbol: string = '', thousands: string = ','): string {
  const locale = Cookies.get('locale');

  try {
    if (locale !== 'en') {
      currencySymbol = '';
      thousands = ',';
    } else {
      currencySymbol = '';
      thousands = ',';
    }

    const negativeSign = amount < 0 ? '-' : '';
    let i = Math.abs(amount).toFixed(0); // Bỏ phần thập phân
    let j = i.length > 3 ? i.length % 3 : 0;

    return negativeSign + i.substr(0, j) + (j ? thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + '' + currencySymbol;
  } catch (e) {
    console.error(e);
    return amount.toString();
  }
}

export function removeSpecialCharactersAndSpaces(inputString: string): string {
  // This regular expression matches any character that is not a word character (alphanumeric).
  const pattern = /[^\w]/g;
  // Use replace to remove matched characters
  const cleanString = inputString.replace(pattern, '');
  return cleanString;
}

export function formatMoneyToNumber(stringWithCommas: string | number): number {
  stringWithCommas = stringWithCommas ? stringWithCommas : '0';
  // Remove all commas from the string
  if (stringWithCommas === null || stringWithCommas === undefined || stringWithCommas === '') {
    return 0;
  }

  const stringWithoutCommas = `${stringWithCommas}`.replace(/,/g, '');
  // Convert the resulting string to a number
  const number = parseInt(stringWithoutCommas, 10);

  // Check if the conversion was successful, if not return NaN
  if (isNaN(number)) {
    throw new Error('Invalid input: not a valid number');
  }

  return number;
}

export const covertPhoneNumberToString = (phoneNumber: string) => {
  return phoneNumber.replaceAll(' ', '');
};

export const formatPhoneNumber = (phone?: string | null) => {
  if (!phone) return '';
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
};

export const formatNumber = (value?: number) => {
  if (!value && value !== 0) return '';
  return new Intl.NumberFormat('vi-VN').format(value);
};
