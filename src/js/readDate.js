function zerofy(digit) {
  let stringfromDigit = digit.toString();
  if (stringfromDigit.length === 1) {
    stringfromDigit = `0${stringfromDigit}`;
  }
  return stringfromDigit;
}

export default function readDate(date) {
  const newDate = new Date(date);

  let year = newDate.getFullYear();
  year = year.toString().substring(2, 4);

  let month = newDate.getMonth() + 1;
  month = zerofy(month);

  let day = newDate.getDate();
  day = zerofy(day);

  let hour = newDate.getHours();
  hour = zerofy(hour);

  let minutes = newDate.getMinutes();
  minutes = zerofy(minutes);

  const readedDate = `${hour}:${minutes} ${day}.${month}.${year}`;

  return readedDate;
}
