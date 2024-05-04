export const getYesterdayDate = (): Date =>
  new Date(new Date().setDate(new Date().getDate() - 1));
