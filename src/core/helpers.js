export default function getPayload() {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() >= 10 ? today.getMonth() : '0' + today.getMonth();
  const day = today.getDate();
  const dayWhatWasWeekAgo = today.getDate() - 7;

  return  {
    start_date: `${year}-${month}-${dayWhatWasWeekAgo}`,
    end_date: `${year}-${month}-${day}`,
    api_key: 'PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx',
  }
}
