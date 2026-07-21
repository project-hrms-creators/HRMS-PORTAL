export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  EMPLOYEE: {
    PROFILE: '/employee/profile',
    DIRECTORY: '/employee/directory',
  },
  ATTENDANCE: {
    TODAY: '/attendance/today',
    CHECK_IN: '/attendance/check-in',
    CHECK_OUT: '/attendance/check-out',
    HISTORY: '/attendance/history',
    SUMMARY: '/attendance/summary',
  },
  LEAVE: {
    APPLY: '/leave/apply',
    HISTORY: '/leave/history',
    BALANCE: '/leave/balance',
    CANCEL: '/leave/cancel',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/read',
  },
};
