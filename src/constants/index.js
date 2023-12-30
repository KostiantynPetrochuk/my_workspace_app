export const API_URL = import.meta.env.VITE_API_URL;

export const ROLES = {
  User: "User",
  Admin: "Admin",
};

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TIME_LOGS: "/timeLogs",
  TIME_SHEET: "/timeSheet",
  ADMIN: "/admin",
  UNAUTHORIZED: "/unauthorized",
};

export const FIRST_PART_DAYS = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

export const LAST_PART_DAYS = {
  Monday: 6,
  Tuesday: 5,
  Wednesday: 4,
  Thursday: 3,
  Friday: 2,
  Saturday: 1,
  Sunday: 0,
};

export const DAYS = {
  0: {
    UA: "Понеділок",
    EN: "Monday",
  },
  1: {
    UA: "Вівторок",
    EN: "Tuesday",
  },
  2: {
    UA: "Середа",
    EN: "Wednesday",
  },
  3: {
    UA: "Четвер",
    EN: "Thursday",
  },
  4: {
    UA: "П'ятниця",
    EN: "Friday",
  },
  5: {
    UA: "Субота",
    EN: "Saturday",
  },
  6: {
    UA: "Неділя",
    EN: "Sunday",
  },
};

export const MONTHS = {
  0: {
    UA: "Січня",
    EN: "January",
  },
  1: {
    UA: "Лютого",
    EN: "February",
  },
  2: {
    UA: "Березня",
    EN: "March",
  },
  3: {
    UA: "Квітня",
    EN: "April",
  },
  4: {
    UA: "Травня",
    EN: "May",
  },
  5: {
    UA: "Червня",
    EN: "June",
  },
  6: {
    UA: "Липня",
    EN: "July",
  },
  7: {
    UA: "Серпня",
    EN: "August",
  },
  8: {
    UA: "Вересня",
    EN: "September",
  },
  9: {
    UA: "Жовтня",
    EN: "October",
  },
  10: {
    UA: "Листопада",
    EN: "November",
  },
  11: {
    UA: "Грудня",
    EN: "December",
  },
};

export const API_ROUTES = {};
