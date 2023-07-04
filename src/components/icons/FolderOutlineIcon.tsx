import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type FolderOutlineIconProps = {
  width?: number;
  height?: number;
};

const FolderOutlineIcon: React.FC<FolderOutlineIconProps> = ({
  width,
  height
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdUlEQVR4nO2YXUpDMRCFg9Ki77oI0Z3oMsQNiD9PrXU5WUChPecSwXL14a5Ai3tQ6IsUrgy0EgrW+5OYSueDeUvCOZlJQsYYRVEURVkhz/N9AAMAU5JzkuWamAF4BnBhrd01GyJ+8ovon+JhOBweJjUAYNBQ/DLeRqPRSUoD06UYAFdFUXTWjZcdX5j+LjUAHwBOTQroCbHWdqvOE8Ei3MuErHNp/hp65VB3rpSOlFDLEiz9TZCKAHAnZzO6AWE8Hh8B+AxoolyU5cQ5t/ffMlCuRC+aAQBnoc9AURQdktfemi/BDcgtRPJ+5cF7D3ULWWu7/qbUMtD0Hciy7DiE+Eab2lK8c84dmMAwsoEZySeS5/1+fye0+FYGzIZANZAYagYSQ81AYqgZSAw1A4mhZiAx3LYMzJu0VWJh6/7I/MYWyZuUJqy1XQC3tf7E0oOJ2FWI35XI2zV3Y8Zjpb6QIAPFLYDXCu31mDFfaOhVFq8oiqJsFV979psgWFfbPwAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABkUlEQVR4nO2YS0oDQRCGByVB93oI0V0OkK2kKl1TJbV2I3MB8bHKw4spGNAzaPAOCm5kQOksnDGQmHmlI9YHs5uG/+//73lUFBmGYRjGHKq6S8BjhzJ1wCmhfC68QN4J+TEGSVR1O9oQ8ZOlohdcDuROj3U/qAECHpcRnyXCLwx8FMyAQ5l+7yjKRdJJWsvu9zs+q1u+aiBvrscQhcDlhKhqe+V1PQYvPKsTpwRyHq0bytWh6FpfHV+hShXE/JnidNYI4JE/m40b8MS9+MAhf9RlgrKzNel2T3f+VAI0nwjKoDEDcT/Gus9A0klaBHKZaeKn2g34p5BDufn5wuPXup5CqtrOb0ohA2XfA/3+yWEd4kttarWO8i0i7kU1Q40a8N9CIA+EfDYcDrfqFl/JQLQhkBkIDFkCgSFLIDBkCQSGLIHAkCUQGPpXCbiSY5Wm0KJ/ZPnBFgFfhTShqm2Hcl3snxh41NRUYS1TCa0w3G1UPMj9SnMhj7/RuyXg51/H642K5nSmAWWwsnjDMAzjX/EFjlpPfKVe1OIAAAAASUVORK5CYII='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="dashboard icon"
    />
  );
};

export default FolderOutlineIcon;
