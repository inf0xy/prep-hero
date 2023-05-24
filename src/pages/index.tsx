import CodeSnippet from '@/components/reusables/CodeSnippet';
import HeatMapCalendar from '@/components/user/HeatMapCalendar';
import { useAppSelector } from '@/hooks/hooks';
import classes from '@/styles/HomePage.module.scss';

export const data = {
  '2023-05-01': 2,
  '2023-05-02': 5,
  '2023-05-03': 6,
  '2023-05-04': 8,
  '2023-05-05': 10,
  '2023-05-06': 12,
  '2023-05-07': 14,
  '2023-05-08': 16,
  '2023-05-09': 18,
  '2023-05-10': 20,
  '2023-05-11': 22,
  '2023-05-12': 24,
  '2023-05-13': 26,
  '2023-05-14': 28,
  '2023-05-15': 30,
  '2023-05-16': 32,
  '2023-05-17': 34,
  '2023-05-18': 36,
  '2023-05-19': 38,
  '2023-05-20': 40,
  '2023-05-21': 42,
  '2023-05-22': 44,
  '2023-05-23': 46,
  '2023-05-24': 48,
  '2023-05-25': 50,
  '2023-05-26': 52,
  '2023-05-27': 54,
  '2023-05-28': 56,
  '2023-05-29': 58,
  '2023-05-30': 60,
  '2023-05-31': 62
};

const code = `class Solution {
  public:
      int numTrees(int n) {
        int dp[n+1];
        if(n==0 || n==1) return n;
        dp[0]=1; dp[1]=1;
        for(int i=2;i<=n;i++)
        {
            dp[i]=0;
            for(int j=0;j<i;j++)
            {
                dp[i]+=dp[j]*dp[i-j-1];
            }
        }
          return dp[n];
      }
  };`;

const HomePage = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes.homepage} ${classes[`homepage--${theme}`]}`}>
      <HeatMapCalendar data={data} />
      {/* <div
        className="p-16 h-fit"
      >
        <CodeSnippet value={code} language="python" />
      </div> */}
    </div>
  );
};

export default HomePage;
