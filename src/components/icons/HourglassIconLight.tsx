import Image from 'next/image';

type HourglassIconLightProps = {
  width?: number;
  height?: number;
};

const HourglassIconLight: React.FC<HourglassIconLightProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABvklEQVR4nO2Zu04CQRSGPwGJiYn26gMovoq+AGJno1baGGPQpSCh1hCopLLyFisLvDQg+kZeopiJW5yMS7LCzCxr5kumAc7/z8weZs7sgGf8yQAlYM9xKwETJgaghPoJtTU/AH4eo5qJGtARs9MJPzPROhG6RVMpJAmEUZAC3V/4AQwg8E8gJj6Fkk6hQ2FUMahbEbrKwxpbwqhuULchdDexyKow6hnUfRG6K1hkFngNjb6AggHN5VCrH2rPYJkrMVv3QG4ErRzwKPQucYCa9Xdh2hqyZlExLaGjNJdwRFkre4+H0FAxUuMAxzS1DlT/EFvVYhskdFI70zqyHyNuR4u5ALIkhDI+1zq0G3MfUe0GmCRh8sCt6JRaEjcifrcOfGor2BRjwjTQFZ17A+bF9wvaytUNYxjnAcylZQD5NKdQNs1/4kzal9GmwY2siWOOLJQSZRyhyt8PYXxqsJgr4IBrYXo3Yv7mgAehp0p1XB5oFg1oFlweaOSR8smg7rOrI+W2MDoxqFsXumqvsEbqX6sE/u10NIF/uRsTn0IDCHwKxbwnbouZahu8E25H6Pp74n95T1xz2Io27ok9GOYbRtiyDK1+bKYAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default HourglassIconLight;
