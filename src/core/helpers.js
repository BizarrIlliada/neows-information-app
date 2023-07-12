export function makeTwoDigitNumber(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num.toString();
  }
}

export function getPartOfADateFromString(string, part) {
  const result = string.split('-')

  switch (part) {
    case 'day':
      return result[2];
    case 'month':
      return result[1];
    case 'year':
      return result[0];
    default:
      break;
  }
}

export function deepCopy() {}
