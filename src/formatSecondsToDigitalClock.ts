const formatSecondsToDigitalClock = (timeInSeconds: number): string => {
  const absoluteSeconds = Math.abs(Math.floor(timeInSeconds)) || 0;

  const minutes = Math.floor(absoluteSeconds / 60)
    .toString()
    .padStart(0);
  const seconds = (absoluteSeconds % 60).toString().padStart(2, '0');

  return timeInSeconds < 0 ? `-${minutes}:${seconds}` : `${minutes}:${seconds}`;
};

export { formatSecondsToDigitalClock };
