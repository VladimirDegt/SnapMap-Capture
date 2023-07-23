function getMonthName(month) {
  const monthNames = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];
  return monthNames[month];
}

function addLeadingZero(number) {
  return number < 10 ? `0${number}` : number;
}

export function formatDateTime(date) {
  const day = addLeadingZero(date.getDate());
  const month = getMonthName(date.getMonth());
  const year = date.getFullYear();
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());

  return `${day} ${month}, ${year} | ${hours}:${minutes}`;
}
