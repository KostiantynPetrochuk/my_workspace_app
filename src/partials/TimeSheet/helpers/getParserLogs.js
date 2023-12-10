import { format, subDays, addDays } from "date-fns";
import { FIRST_PART_DAYS, LAST_PART_DAYS } from "../../../constants";

const FIRST_DAY_OF_MONTH = 1;

const getParsedLogs = (userLogs, lastDay, currentDate) => {
  const parsedLogs = [];
  for (
    let currentDay = FIRST_DAY_OF_MONTH;
    currentDay <= lastDay;
    currentDay++
  ) {
    const currentLog = userLogs.find((log) => log.day === currentDay);
    if (currentDay !== FIRST_DAY_OF_MONTH && currentDay !== lastDay) {
      if (currentLog) {
        parsedLogs.push(currentLog);
        continue;
      } else {
        parsedLogs.push({ day: currentDay, logs: [] });
        continue;
      }
    }

    const targetDate = currentDate.setDate(currentDay);
    const dayOfWeek = format(new Date(targetDate), "EEEE");

    if (currentDay === FIRST_DAY_OF_MONTH) {
      for (let k = FIRST_PART_DAYS[dayOfWeek]; k > 0; k--) {
        const first = subDays(targetDate, k);
        parsedLogs.push({ logs: null, day: first.getDate() });
      }
      if (currentLog) {
        parsedLogs.push(currentLog);
      } else {
        parsedLogs.push({ logs: [], day: currentDay });
      }
    }

    if (currentDay === lastDay) {
      if (currentLog) {
        parsedLogs.push(currentLog);
      } else {
        parsedLogs.push({ logs: [], day: currentDay });
      }
      for (let j = FIRST_DAY_OF_MONTH; j <= LAST_PART_DAYS[dayOfWeek]; j++) {
        const last = addDays(targetDate, j);
        parsedLogs.push({ logs: null, day: last.getDate() });
      }
    }
  }
  return parsedLogs;
};

export default getParsedLogs;
