export const timeConverter = (UNIX_timestamp) => {
  var time = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  var date = time.getDate();
  var time = date + " " + month + " " + year;
  return time;
};
