const formatSecondsToDigitalClock = (timeInSeconds: number): string => {
  const absoluteSeconds = Math.abs(Math.floor(timeInSeconds));

  const sign = timeInSeconds < 0 ? '-' : '';
  const minutes = String(Math.floor(absoluteSeconds / 60));
  const seconds = String(absoluteSeconds % 60).padStart(2, '0');

  return `${sign}${minutes}:${seconds}`;
};

const formatSecondsToDigitalClockWithMilliseconds = (timeInSeconds: number): string => {
  const absoluteTime = Math.abs(timeInSeconds);
  const sign = timeInSeconds < 0 ? '-' : '';
  const minutes = String(Math.floor(absoluteTime / 60));
  const seconds = String(Math.floor(absoluteTime)).padStart(2, '0');
  const milliseconds = String(Math.floor((absoluteTime * 1000) % 1000)).padStart(3, '0');

  return `${sign}${minutes}:${seconds}.${milliseconds}`;
};

const formatToLocaleMoney = (number: number): string => {
  return number.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
};

export { formatSecondsToDigitalClock, formatSecondsToDigitalClockWithMilliseconds, formatToLocaleMoney };
