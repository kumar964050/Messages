export const formatMessageDate = createdAt => {
  const date = new Date(createdAt);
  const now = new Date();

  const optionsTime = {hour: '2-digit', minute: '2-digit', hour12: true};
  const time = date.toLocaleTimeString('en-IN', optionsTime).toLowerCase();

  const optionsDay = {weekday: 'short'}; // Sun, Mon
  const weekDay = date.toLocaleDateString('en-IN', optionsDay);

  const optionsMonth = {month: 'short', day: '2-digit'}; // Feb 22
  const monthDate = date.toLocaleDateString('en-IN', optionsMonth);

  const optionsYear = {year: 'numeric', month: 'short', day: '2-digit'}; // 2024 Jan 22
  const fullDate = date.toLocaleDateString('en-IN', optionsYear);

  const isSameWeek = (d1, d2) => {
    const startOfWeek = new Date(d2);
    startOfWeek.setDate(d2.getDate() - d2.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return d1 >= startOfWeek && d1 <= endOfWeek;
  };

  if (isSameWeek(date, now)) {
    return `${weekDay} ${time}`;
  } else if (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${monthDate} ${time}`;
  } else if (
    date.getMonth() === now.getMonth() - 1 &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${monthDate} ${time}`;
  } else {
    return `${fullDate} ${time}`;
  }
};
