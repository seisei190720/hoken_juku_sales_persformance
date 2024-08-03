export const calcPercent = (child: number, parent: number) => {
  const percent = (child / parent) * 100;
  const resultPercent = Math.round(percent * 10) / 10;
  const resultPercentUnderHundred = resultPercent > 100 ? 100 : resultPercent;
  return isNaN(resultPercent) ? 0 : resultPercentUnderHundred;
};
