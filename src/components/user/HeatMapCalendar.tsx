import classes from './HeatMapCalendar.module.css';

interface HeatmapCalendarProps {
  data: { [key: string]: number };
}

const HeatMapCalendar: React.FC<HeatmapCalendarProps> = ({ data }) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const today = new Date();
  const thisYear = today.getFullYear();
  // const thisMonth = today.getMonth();
  const thisMonth = 1;

  const monthDays = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const endDay = new Date(year, month, daysInMonth).getDay();

    return { daysInMonth, startDay, endDay };
  };

  const weeksInMonth = (month: number, year: number) => {
    const { daysInMonth, startDay, endDay } = monthDays(month, year);
    const firstWeek = Math.ceil((1 + 6 - startDay) / 7);
    const lastWeek = Math.ceil((daysInMonth + (6 - endDay)) / 7);

    return { firstWeek, lastWeek };
  };

  const getHeatmapColor = (value: number) => {
    const colorMap = [
      '#FFF',
      '#B7E3EE',
      '#A1DDE9',
      '#6ECEDC',
      '#4DBED0',
      '#2CACC0',
      '#0C8DA1'
    ];

    if (value === 0) {
      return colorMap[0];
    } else if (value > 6) {
      return colorMap[6];
    } else {
      return colorMap[value];
    }
  };

  const renderCalendar = () => {
    const weeks = [];
    let count = 0;
    const { firstWeek, lastWeek } = weeksInMonth(thisMonth, thisYear);

    for (let week = firstWeek; week <= lastWeek; week++) {
      const days = [];

      for (let i = 0; i < weekdays.length; i++) {
        const dayOfWeek = weekdays[i];
        const date = new Date(thisYear, thisMonth, 1 + (week - 1) * 7 + i);

        const readableDate = date.toDateString();
        const dateString = date.toISOString().substring(0, 10);
        const value = data[dateString] || 0;
        const color = getHeatmapColor(value);
        const tooltip =
          value === 0
            ? `No contributions on ${readableDate}`
            : `${value} ${
                value === 1 ? 'contribution' : 'contributions'
              } on ${readableDate}`;
        count++;
        days.push(
          <div
            key={dayOfWeek}
            className={`rounded ${classes['heatmap-day']}`}
            style={{
              backgroundColor: color,
              visibility: count > 31 ? 'hidden' : 'visible'
            }}
            data-tooltip={tooltip}
          />
        );
      }

      weeks.push(
        <div key={week} className={classes['heatmap-week']}>
          {days}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div className={classes['heatmap-calendar']}>
      <div className={classes['heatmap-weekdays']}>
        {weekdays.map((dayOfWeek) => (
          <div
            key={dayOfWeek}
            className={`${
              dayOfWeek === 'Mon' || dayOfWeek === 'Wed' || dayOfWeek === 'Fri'
                ? 'opacity-1'
                : 'opacity-0'
            } ${classes[`heatmap-weekday ${dayOfWeek.toLowerCase()}`]}`}
          >
            {dayOfWeek}
          </div>
        ))}
      </div>
      <div className={classes['heatmap-month-date']}>
        <div className={classes['heatmap-month']}>
          <span className={classes['heatmap-month-name']}>
            {months[thisMonth]}
          </span>{' '}
        </div>
        <div className={classes['heatmap-grid']}>{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default HeatMapCalendar;
