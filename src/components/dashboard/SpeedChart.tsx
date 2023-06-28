import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';
import { useAppSelector } from '@/hooks/hooks';
import { Submission } from '@/types/dataTypes';
import variables from '@/styles/variables.module.scss';

Chart.register(CategoryScale);

interface Record {
  duration: number;
  date: string;
}

interface UserData {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
    }
  ];
}

const SpeedChart = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const { submissions, easy_solved, medium_solved, hard_solved } =
    useAppSelector((state) => state.user);

  const getSolveTimes: (problems: Submission[], color: string) => UserData = (
    problems: Submission[],
    color
  ) => {
    const records: Record[] = [];
    problems.forEach((el) => {
      if (el.hasOwnProperty('duration')) {
        records.push({
          duration: el.duration! / 60,
          date: new Date(el.date).toLocaleDateString()
        });
      }
    });

    return {
      labels: records.map((el) => el.date),
      datasets: [
        {
          label: 'Time to solve',
          data: records.map((el) => Math.round(el.duration)),
          fill: false,
          borderColor: color
        }
      ]
    };
  };

  useEffect(() => {
    setUserData(getSolveTimes(submissions, variables.colorSecondary50));
  }, [submissions]);

  const handleShowAllSolveTimes = () => {
    setUserData(getSolveTimes(submissions, variables.colorSecondary50));
  };

  const handleShowEasySolveTimes = () => {
    const easyProblems = easy_solved.map((el) => el.title);
    const problems = submissions.filter((el) =>
      easyProblems.includes(el.title)
    );
    setUserData(getSolveTimes(problems, variables.colorSuccess500));
  };

  const handleShowMediumSolveTimes = () => {
    const mediumProblems = medium_solved.map((el) => el.title);
    const problems = submissions.filter((el) =>
      mediumProblems.includes(el.title)
    );
    setUserData(getSolveTimes(problems, variables.colorWarning200));
  };

  const handleShowHardSolveTimes = () => {
    const hardProblems = hard_solved.map((el) => el.title);
    const problems = submissions.filter((el) =>
      hardProblems.includes(el.title)
    );
    setUserData(getSolveTimes(problems, variables.colorError500));
  };

  const options: any = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4 h-full">
      <div className="flex my-4 ml-10 items-center space-x-8">
        <div
          className="flex space-x-4 cursor-pointer"
          onClick={handleShowAllSolveTimes}
        >
          <div className="p-3 bg-gray-300 rounded-md" />
          <p className="translate-y-[1px]">All</p>
        </div>
        <div
          className="flex space-x-4 cursor-pointer"
          onClick={handleShowEasySolveTimes}
        >
          <span className="p-3 rounded-md bg-green-500" />
          <p className="translate-y-[1px]">Easy</p>
        </div>
        <div
          className="flex space-x-4 cursor-pointer"
          onClick={handleShowMediumSolveTimes}
        >
          <span className="p-3 rounded-md bg-yellow-500" />
          <p className="translate-y-[1px]">Medium</p>
        </div>
        <div
          className="flex space-x-4 cursor-pointer"
          onClick={handleShowHardSolveTimes}
        >
          <span className="p-3 rounded-md bg-red-500" />
          <p className="translate-y-[1px]">Hard</p>
        </div>
      </div>
      <div className='h-full flex items-center'>
        {userData && userData.labels.length > 0 ? (
          <Line data={userData} options={options} />
        ) : (
          <p className='w-fit ml-auto mr-auto text-[2rem] translate-y-[-2rem]'>No Data</p>
        )}
      </div>
    </div>
  );
};

export default SpeedChart;
