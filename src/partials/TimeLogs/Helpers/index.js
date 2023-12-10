export const getButttonState = (status) => status === "in" ?? false;

export const getLogsList = (user) => {
  const preparedLogsList = [];

  user?.timelogsHistory.forEach((log) => {
    if (log.status === "in") {
      const logBody = {
        status: "in",
        date: log.entries.in.date,
      };

      preparedLogsList.push(logBody);
    }
    if (log.status === "out") {
      const logBodyIn = {
        status: "in",
        date: log.entries.in.date,
      };
      const logBodyOut = {
        status: "out",
        date: log.entries.out.date,
      };
      preparedLogsList.push(logBodyIn);
      preparedLogsList.push(logBodyOut);
    }
  });

  return preparedLogsList;
};
