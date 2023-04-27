import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import classes from './ActivityCalendar.module.css';
import { dates } from '@/helpers/formFields';

const today = new Date();

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ActivityCalendar = () => {
  // const randomValues = getRange(200).map((index) => {
  //   return {
  //     date: shiftDate(today, -index),
  //     count: getRandomInt(1, 3)
  //   };
  // });

  const getRandomDates = (totalDays: number, month: string) => {
    const dates = [];
    for (let i = 0; i < totalDays; i++) {
      const randomDate = Math.floor(Math.random() * (totalDays - 1 + 1)) + 1;
      dates.push({
        date: new Date(`2023-${month}-${randomDate}`),
        count: Math.floor(Math.random() * (100 - 10 + 1)) + 10
      });
    }
    return dates;
  };

  const getColor = (count: number) => {
    if (count < 10) {
      return 1;
    } else if (count < 20) {
      return 2;
    } else if (count < 40) {
      return 3;
    } else {
      return 4;
    }
  };

  const renderToolTip = (date: Date, count: number) => {
    if (date) {
      const fullDate = date.toString().slice(0, 16);
      return count > 0
        ? `${count} submissions on ${fullDate}`
        : `No submissions on ${fullDate}`;
    }
    return 'No submissions';
  };

  return (
    <div className={classes['heatmap-container']}>
      {dates.map((el) => (
        <div key={el.month} className={classes.calendar}>
          <p className={classes.month}>{el.abbreviation}</p>
          <CalendarHeatmap
            startDate={new Date(`${new Date().getFullYear()}-${el.month}-01`)}
            endDate={
              new Date(`${new Date().getFullYear()}-${el.month}-${el.days}`)
            }
            values={getRandomDates(el.days, el.month)}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${getColor(value.count)}`;
            }}
            tooltipDataAttrs={(value: any) => {
              return {
                'data-tooltip-id': 'submission-tooltip',
                'data-tooltip-content': renderToolTip(value.date, value.count)
              };
            }}
            showMonthLabels={false}
            onClick={(value) =>
              alert(`Clicked on value with count: ${value.count}`)
            }
          />
          <Tooltip className={classes.tooltip} id="submission-tooltip" />
        </div>
      ))}
    </div>
  );
};

export default ActivityCalendar;
