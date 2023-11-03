import React from 'react';
//TODO: Create a day instance tag:dayjs @sigkar
import day from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Duration from 'dayjs/plugin/duration';
day.extend(RelativeTime);
day.extend(Duration);

// 1ms short to account for unavoidable setInterval calculations
const THREE_MIN_DEADLINE = 180000;

export type UseCountDownProps = {
  start: boolean;
  deadline: string | number | Date | day.Dayjs;
};

const getDiffInMinsSeconds = (deadline: UseCountDownProps['deadline']) => {
  const remaining = day(deadline).diff(new Date(), 'seconds');
  const minutes = day.duration(remaining * 1000).minutes();
  const seconds = (remaining % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const useCountDown = ({ start, deadline }: UseCountDownProps) => {
  const [timeLeft, setTimeLeft] = React.useState<string | undefined>();
  React.useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTimeLeft(getDiffInMinsSeconds(deadline));
      }, 950);
      return () => clearInterval(interval);
    } else {
      setTimeLeft(getDiffInMinsSeconds(Date.now() + THREE_MIN_DEADLINE));
    }
  }, [start, deadline, setTimeLeft]);

  return { timeLeft };
};
