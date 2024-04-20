import { format } from "date-fns";

export function convertDate(str: any) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

export function fDateTimeSuffix(date: Date | string | number) {
  if (!date) {
    return;
  }
  const convertDate = new Date(date);
  convertDate.setHours(new Date(date).getHours() + 7);

  return format(convertDate, "dd/MM/yyyy HH:mm");
}
