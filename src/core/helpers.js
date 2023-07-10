export default function getPayload() {
  const today = new Date();
  console.log(`${today.toDateString()}`)

  const year = today.getFullYear();
  const month = today.getMonth() >= 10 ? today.getMonth() : '0' + today.getMonth();
  const day = today.getDate();

  const payload = {
    start_date: `${year}-${month}-01`,
    end_date: `${year}-${month}-${day}`,
    api_key: 'PXjG2k4gTiQT1uLnemaLCDAX3RDa7jRbL69WIROx',
  }
  console.log(payload);
}
