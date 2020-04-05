const dateToObject = d => {
  d = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    time: d.getTime(),
    day: d.getDay(),
    d
  };
  return d;
};

export const generateMonth = (m, y) => {
  const completeMonth = [];
  let initial = new Date(y, m, 1);
  while (true) {
    completeMonth.push(dateToObject(initial));
    const next = new Date(initial);
    next.setDate(next.getDate() + 1);
    if (next.getMonth() !== initial.getMonth()) {
      break;
    }
    initial = next;
  }
  const diff = completeMonth[0].day;
  const placeholder = [];
  for (let i = 0; i < diff; i++) {
    placeholder.push({ placeholder: true });
  }
  const altered =  placeholder.concat(completeMonth)
  return altered;
};

export const monthToString = m => {
  let month;
  switch (m) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
    default:
      month = "January";
  }
  return month;
};

export const isSameDay = (i, j) => {
    if (i.getDate() === j.getDate() && i.getFullYear() === j.getFullYear() && i.getMonth() === j.getMonth()){
        return true
    }
    return false
}  