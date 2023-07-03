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
          ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABdUlEQVR4nO2YXUpDMRCFg9Ki77oI0Z3oMsQNiD9PrXU5WUChPecSwXL14a5Ai3tQ6IsUrgy0EgrW+5OYSueDeUvCOZlJQsYYRVEURVkhz/N9AAMAU5JzkuWamAF4BnBhrd01GyJ+8ovon+JhOBweJjUAYNBQ/DLeRqPRSUoD06UYAFdFUXTWjZcdX5j+LjUAHwBOTQroCbHWdqvOE8Ei3MuErHNp/hp65VB3rpSOlFDLEiz9TZCKAHAnZzO6AWE8Hh8B+AxoolyU5cQ5t/ffMlCuRC+aAQBnoc9AURQdktfemi/BDcgtRPJ+5cF7D3ULWWu7/qbUMtD0Hciy7DiE+Eab2lK8c84dmMAwsoEZySeS5/1+fye0+FYGzIZANZAYagYSQ81AYqgZSAw1A4mhZiAx3LYMzJu0VWJh6/7I/MYWyZuUJqy1XQC3tf7E0oOJ2FWI35XI2zV3Y8Zjpb6QIAPFLYDXCu31mDFfaOhVFq8oiqJsFV979psgWFfbPwAAAABJRU5ErkJggg=="
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABhUlEQVR4nO2YTUoDQRCFGyVB93oIW3e9SL3XA3OAuM0NxAuIPysxXkzBgJ7BBO+gkI0ElDZghoBxfnrSEeuD2k0z71VVd9NljKIoiqIsISK7gB9C/ATCGeE/VsQU4BOQnQ4Gg22zCeIJjn4R/UPwPsuy/aQGAD+sJ34eAF8AHKUzIH7yLUh47pzrrPo+ZHzebotWg/g3AH2TAhSEWGu7pdcB/SB8YYIzwJ+ZdcNCO1RdG1ontFCTFmSxHUMSwkECfxP2ZusGAr1e74Dw77FMcHFAjPI83/lTFeByCK9bMwBkx7H3gHOuQ+FFoQrP0Q2EU4jC26UL7zXWKWSt7RaTUslA3XvAe38YQ3ytpDYUf5e7fM9Ehi0bmEL4SOGJMWYrtvhGBsyGQDWQGGoFEkOtQGKoFUgMtQKJoVYgMfxXFUDNsUpb2KovsuJgC8guU5qw1nYBf1XpTRxmMK1NFdYxlZBGw932AuBDqblQIHwY3BJ+XGK83p5o+fr3OGgpLV5RFEX5V3wCjVnbBoxAYScAAAAASUVORK5CYII='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="dashboard icon"
    />
  );
};

export default FolderOutlineIcon;
