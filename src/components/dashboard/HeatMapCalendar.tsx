import { MouseEvent, RefObject } from 'react';
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
  showWeekdays?: boolean;
  className?: string;
  parentRef?: RefObject<HTMLDivElement>;
}

const defaultProps = {
  data: {},
  showWeekdays: false,
  className: ''
};

const HeatMapCalendar: React.FC<HeatmapCalendarProps> = ({
  showWeekdays,
  className,
  parentRef
}) => {
  const { theme, submissions } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions } = state.user;
    return { theme, submissions };
  });

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const parentDiv = parentRef!.current;
    const heatmapCell = e.target as HTMLDivElement;
    const customTooltipDiv = heatmapCell.parentNode as HTMLDivElement;

    if (parentDiv && heatmapCell) {
      const parentRect = parentDiv.getBoundingClientRect();
      const pseudoRect = heatmapCell.getBoundingClientRect();
      const positionX = pseudoRect.left - parentRect.left;

      if (positionX < 131) {
        customTooltipDiv.classList.remove('middle');
        customTooltipDiv.classList.remove('right');
      } else if (parentDiv.offsetWidth - positionX >= 133 && positionX >= 131) {
        if (!heatmapCell.classList.contains('middle')) {
          customTooltipDiv.classList.add('middle');
        }
        customTooltipDiv.classList.remove('right');
      } else if (parentDiv.offsetWidth - positionX < 133) {
        if (!heatmapCell.classList.contains('right')) {
          customTooltipDiv.classList.add('right');
        }
        customTooltipDiv.classList.remove('middle');
      }
    }
  };

  const data = submissions
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((s) => new Date(s.date).toISOString().slice(0, 10))
    .reduce((acc: { [key: string]: number }, el: string) => {
      acc[el] = acc[el] + 1 || 1;
      return acc;
    }, {});

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
                className={`rounded heatmap-day heatmap-day--${theme}`}
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
          <div key={tooltip} className="custom-tooltip">
            <div
              key={dayOfWeek}
              className={`rounded heatmap-day heatmap-day--${theme}`}
              style={{
                backgroundColor: color as string,
                visibility:
                  count > months[monthIndex].totalDays ? 'hidden' : 'visible',
                display: count > months[monthIndex].totalDays ? 'none' : 'block'
              }}
              onMouseEnter={handleMouseEnter}
            />
            <div className={`tooltip-content ${theme}`}>{tooltip}</div>
          </div>
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
    <div className={`${classes['heatmap-calendar']} ${className}`}>
      {renderedCalendar}
    </div>
  );
};

HeatMapCalendar.defaultProps = defaultProps;

export default HeatMapCalendar;
