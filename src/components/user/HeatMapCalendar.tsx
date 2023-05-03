import { useAppSelector } from '@/hooks/hooks';
import classes from './HeatMapCalendar.module.scss';
import {
  Month,
  months,
  weekdays,
  getHeatmapColor,
  weeksInMonth
} from '@/helpers/heatmap-util';

interface HeatmapCalendarProps {
  data: { [key: string]: number }; // key format : 'YYYY-MM-DD'
  showWeekdays?: boolean;
  className?: string;
}

const defaultProps = {
  data: {},
  showWeekdays: false,
  className: '',
};

const HeatMapCalendar: React.FC<HeatmapCalendarProps> = ({
  data,
  showWeekdays,
  className,
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const today = new Date();
  const thisYear = today.getFullYear();

  const renderMonth = (monthIndex: number, month: Month) => {
    const weeks = [];
    let count = 0;
    const { firstWeek, lastWeek } = weeksInMonth(monthIndex, thisYear);

    for (let week = firstWeek; week <= lastWeek; week++) {
      const days = [];
      let weekdayCount = 0;
      let firstWeekday = new Date(`${monthIndex + 1}/1/${thisYear}`).getDay();
      const daySkip = firstWeekday;

      while (weekdayCount < weekdays.length) {
        if (week === firstWeek && firstWeekday > 0) {
          while (firstWeekday > 0) {
            days.push(
              <div
                key={weekdays[weekdayCount]}
                className={`rounded ${classes[`heatmap-day--${theme}`]}`}
                style={{
                  visibility: 'hidden'
                }}
              />
            );
            firstWeekday--;
            weekdayCount++;
          }
          continue;
        }

        const dayOfWeek = weekdays[weekdayCount];
        const date = new Date(
          thisYear,
          monthIndex,
          1 + (week - 1) * 7 + weekdayCount - daySkip
        );
        const readableDate = date.toDateString();
        const dateString = date.toISOString().substring(0, 10);
        const value = data[dateString] || 0;
        const color = getHeatmapColor(theme!, value);
        const tooltip =
          value === 0
            ? `No submissions on ${readableDate}`
            : `${value} ${
                value === 1 ? 'submission' : 'submissions'
              } on ${readableDate}`;
        count++;

        days.push(
          <div
            key={dayOfWeek}
            className={`rounded ${classes[`heatmap-day--${theme}`]}`}
            style={{
              backgroundColor: color as string,
              visibility:
                count > months[monthIndex].totalDays ? 'hidden' : 'visible'
            }}
            data-tooltip={tooltip}
          />
        );
        weekdayCount++;
      }

      weeks.push(
        <div key={week} className={classes['heatmap-week']}>
          {days}
        </div>
      );
    }
    return weeks;
  };

  const renderedCalendar = months.map((el, index) => (
    <div className={classes['heatmap-calendar__month']} key={`${el}-${index}`}>
      {showWeekdays && (
        <div className={classes['heatmap-weekdays']}>
          {weekdays.map((dayOfWeek) => (
            <div
              key={dayOfWeek}
              className={`${
                dayOfWeek === 'Mon' ||
                dayOfWeek === 'Wed' ||
                dayOfWeek === 'Fri'
                  ? 'opacity-1'
                  : 'opacity-0'
              } ${classes['heatmap-weekday']}`}
            >
              {dayOfWeek}
            </div>
          ))}
        </div>
      )}
      <div className={classes['heatmap-month-date']}>
        <div className={classes['heatmap-month']}>
          <span className={classes[`heatmap-month__name-${theme}`]}>
            {months[index].name}
          </span>{' '}
        </div>
        <div className={classes['heatmap-grid']}>
          {renderMonth(index, months[index])}
        </div>
      </div>
    </div>
  ));

  return (
    <div
      className={`${classes['heatmap-calendar']} ${className}`}
    >
      {renderedCalendar}
    </div>
  );
};

HeatMapCalendar.defaultProps = defaultProps;

export default HeatMapCalendar;
