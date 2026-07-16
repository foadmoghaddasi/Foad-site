export const formatChallengeDateRange = (value: string, isFa: boolean) => {
  const locale = isFa ? "fa-IR-u-ca-persian" : "en-US";
  const startDate = new Date(`${value}T12:00:00Z`);
  const endDate = new Date(startDate);
  endDate.setUTCDate(endDate.getUTCDate() + 6);

  const dayFormatter = new Intl.DateTimeFormat(locale, { day: "numeric" });
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const monthKeyFormatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "numeric",
  });

  const startDay = dayFormatter.format(startDate);
  const endDay = dayFormatter.format(endDate);
  const startMonth = monthFormatter.format(startDate);
  const endMonth = monthFormatter.format(endDate);
  const isSameMonth =
    monthKeyFormatter.format(startDate) === monthKeyFormatter.format(endDate);

  if (isFa) {
    return isSameMonth
      ? `${startDay} تا ${endDay} ${endMonth}`
      : `${startDay} ${startMonth} تا ${endDay} ${endMonth}`;
  }

  return isSameMonth
    ? `${startMonth} ${startDay}–${endDay}`
    : `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
};
