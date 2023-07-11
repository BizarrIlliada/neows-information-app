export default function getPayload() {
  const today = new Date();

  const year = today.getFullYear();
  const month = makeTwoDigitNumber(today.getMonth());
  const day = makeTwoDigitNumber(today.getDate());
  const currentDay = makeTwoDigitNumber(today.getDate() - 7);

  return  {
    startDate: `${year}-${month}-${currentDay}`,
    endDate: `${year}-${month}-${day}`,
    apiKey: 'PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx',
  }
}

function makeTwoDigitNumber(num) {
  if (num < 10) {
    return '0' + num;
  } else {
    return num.toString();
  }
}
