import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type DashboardIconProps = {
  width?: number;
  height?: number;
};

const DashboardIcon: React.FC<DashboardIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVR4nO2YQW7CMBBF5xYsgGVPk2NxAHoLVFWtKpUuWVXcBiQKB3gVwpHcSFZsMDCh/+2cjJN5/rOymRBCCFEZYAK8Anv8sAfegKcSiS1+2QLjHJFjEkc+szbcCGAMLENvLzkb2nFyI9ECTENvO+ujzc+cQm5/tURSA17ru1at8L+J2JW/m0QihYmcO3p4S+ThRKzwv0jk0ROhZ8Ylcq9ErrVOIZEUSiSg0eocyMWF3bra6xQS6TuZLrXe3zyRwYvcCwpE2su5ifm9DtrkFC9C8dKTDKcb0K/Q2yJVtGa4fMcini6rS/mJRVbh4bsNBOAj9LyKHzaR4RwYmVOAEfAc9dt0C2YMj1nKtgljdsAvh9Dj3ySEEEIIO59f3oJv6COVHA8AAAAASUVORK5CYII='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABO0lEQVR4nO2YUWrCQBCG5xY+aB97jPx/mNceywO0t5AiilD7mKfS21Ro9QAR6a6k1GWTENtR54N5yGaymT//LIERcRzHcZyBITkBMCe5JVkbiS3JBYD71iJIbgwUXidio6rjrJDgRA3gpdUDf4SqjgGsg5jn7AOxnSyJiBRFcRc+8qfkiBaKUdi2vqGEpHp8qH1lsMRbEyJn3jeJC+noSN/WozVHrk6IdHwvXci1O8JMj7uQ/3LkXNcpXEgKdyTgrUU/7DdyRpj5Ifa9n8KFWIMdWisO5yZidxz0kU0GMAvJa0ti+D0BfQ21zVJJ76nDZz0AvDWFWBpW1x3jqymkCotLuRAArELN1XGxLMuHhlWPqjoSo6jqiORTrPdQ+48EANMLPB/Tk2qDMxWAneHid4cafznhOI7jONKfPWcYDqBGhhEqAAAAAElFTkSuQmCC'
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="dashboard icon"
    />
  );
};

export default DashboardIcon;
