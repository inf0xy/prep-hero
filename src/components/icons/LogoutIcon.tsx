import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type LogoutIconProps = {
  width?: number;
  height?: number;
};

const LogoutIcon: React.FC<LogoutIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABeklEQVR4nO2ZS0oDQRBAx4WCuosrjXvxKAlCRBQXegHRneAl4kHEZTyDEES9gKg48YPoys9qhCcNLbbjLMJQ1dqk3gGq6k1XVzc9WWYYhvGvASaAHaAPvCHDO3AK7AHTmsXPAefocgksan157eK/yIEZaQHXNjHZlxZwPR/Scy0lFLsJHJTi30nEDpO8lhI0heNPAg9B/DwTTvAD0eDfOdrAALgGWskJqGICo7ICwBrw7KYQsJzaJh4DnoI0BbCe2go8llLJSEQUWPFFy0rEnELAaoXEB7CZzDmAtMQwAv4kdaeoJkWt6TSkwC1xGGgJuHtMDHItgRZwlWwLKZzIRcUm3qgbMJoA0sXHFAA6SR9k/B4EyV0l7sWL/4MWyv0060gGjraJVTCBUVgBYMlvYnchbEsHf0n9YatfEjiSkgDmgUPtp8Vt4tLVeF4/i1T8DdAQFfASs/5PiiYXwIJ48YHEOLAFHFe8WNfF/ao6AXaBKbXiDcMwMm0+AfjiWnLqUanRAAAAAElFTkSuQmCC'
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR4nO2Zu0pDQRCGj4WC2mnlpRfTnuYQ2P/PhRQJgkEMFvoCop3gS+iDiKU+gyCivoBo0HhBtPJSRYgsHiEeFILOLC7ZHxZONTPf7pzZYTaKgoKCgv61crncEMl1AIcAXkh2BNYrgGMAm5VKZVQt+Hw+P0nyVCjon9Y5gFmtndcOvpOuq3K5PC4KYNPGUfCddG2LAticzzjYsyklYbtUKk2R3MnYv4kkBeC524F1Kmk/SZJhAHfdaSSdQl+OOFIQgBqAFoAmgKp3AKoKAP1yAiQbAB5tFSJZ9w1gAMDDpw8AbWPMkm8ncN/tRwzCFQCABRu0OITLKkRy8RuIN5Ir3twDlIboBSC9SZuaTR4+oOpaANcuOlUALS2AlgsA/qbR6xGgSvLC2xRSuJHb2Z/YGLPsQxltiAbvEqBQKMx7fZEhUwi8ayVI3ooH7zqFSF7Zama/xQy7rkLiCgD9cAIk5+xPnI5VatLGn7webCEzWgSwLwVBcprkrupo0Riz5qjT7KQbtKUxXj9xBHCZJMlYJC1jzIR9SVHe+bNisTgTaSmO40GSqyQPshPrPwRtn6qOAGzEcTyiFnxQUFBQpK13Ql2ERGRyOKAAAAAASUVORK5CYII='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="journal icon"
    />
  );
};

export default LogoutIcon;
