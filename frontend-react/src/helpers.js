
export function lastNumberOfDays(number) {
  const today = new Date();
  return [...Array(number).keys()].map(deltaDays => {
    const date = new Date();
    date.setDate(today.getDate() - deltaDays);
    return date;
  });
}
