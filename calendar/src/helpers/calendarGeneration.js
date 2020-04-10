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

export const generateMonth = (m, y, e) => {
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
  const bonded = bondEvents(altered, e)
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

const bondEvents = (month, events) => {
  let positions = [];
  month.forEach(day => {
    const daily = []
    const remove = []
    if (day.d) {
      console.log(day.date)
      events.forEach(event => {
        const start = event.start;
        const end = event.end;
        const ender = isSameDay(end, day.d);
        const starter = isSameDay(start, day.d);
        const betweener = start < day.d && end > day.d;
        if (starter && ender) {
          const p = findFirstAvailableSpot(positions)
          positions.push(p)
          event.position = p
          daily.push({event: event, style: 'single'})
          remove.push(p)
        } else if (starter) {
          const p = findFirstAvailableSpot(positions)
          positions.push(p)
          event.position = p
          daily.push({event: event, style: 'start'})
        } else if (ender) {
          let p = event.position
          if (day.date === 1) {
            positions.push(p)
          }
          remove.push(event.position)
          daily.push({event: event, style: 'end'})
        } else if (betweener){
          let p = event.position
          if (day.date === 1){
            positions.push(p)
          }
          daily.push({event: event, style: 'between'})
        }

      })
    }
    day.positions = positions
    positions = positions.filter(p => !remove.includes(p))
    day.events = daily
  })
  return month
}

const findFirstAvailableSpot = (p) => {
  let i = 0;
  while (true) {
    if (!p.includes(i)) {
      return i
    }
    i++
  }
}

