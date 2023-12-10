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

export const API_ROUTES = {};
