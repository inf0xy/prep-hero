import Image from 'next/image';

type PassIconProps = {
  width?: number;
  height?: number;
};

const PassIcon: React.FC<PassIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWElEQVR4nO2Y/0sTYRzHH7M0zbQsrRQyzUmZq9a088tk8/J0s+f8Pqc5N81bhCD0HyREf0C/RF/ot6CQKMXSLHRmpanZdC7drs2bQYkFitEPGekT07KS1MfN8oR7weu3u/fn/dw93B0HgICAgICAgIDAHzAj9CGDk37IcPQlPSffDNYTjJOOZDj43uCk0Zyw88w7uBOsBypYZYjBCa2/ys/JcPD1GQfcC/hMNasMZDi6d2H53+7EW9fWAnykmlX6GjjYsnj5H3JwGCDgBfjEeXR+A8PB2mXLu7aSkx7l3QIYJ7yMU97ghFOGkex0wCcMHF2DdeU5OF05DDWATzAcPMtwEOF58pzbg6os8gDtKLVlVcs7lIWVDtW3yuEstKwO1QW3B5XbKbLCnvm5wp4xqX+Tkbsa5V2Z5faMLxX2TIThNbcHaa1UpJ6lPupZCs1qo2b0NqrGk/I6K3lYZ6Mm5jPZJbRR9XKjfKNbg04PJW/V2cgBnY1ECy2zklfdCdaxafvLbOTo3zJ1C7WSbW5/A7mey9pBeb12SIEWs3RQ0eRaJG6m1k6FaocU7FKZ2p8OKsynzLLtwF2KB1LOlVhkCMPuYjOxa7k89cv0oBKLrA8ns9gic5QOpu4BnqDpJ25ozIkIxyJzIqcZIA4uluXaBpp+og0vixhTWxKjPSo/uwATsa/AlGAv7EtAOBaY4scLTFLFwhx1rdq7sC/+HlaOKf5TXr/0mMfl54dbYoPzXh19kv9KgnDM65VM5fdKyuYDEPDK75Vcxz23wHQkA6w2SjbaN6dHfDOnR4yw7BbP5PSIa1zls3viLuKck90tns7tiisC/wwEvGBX7EW6KxZh+yK2A/dY2H2gCvwPsjpF5aoO0VRWZwxaLVWdIo9eiitG9TyKzHwWNaF8FoU8N/IKWAvS28JFVHsES7VHIPfdW6euBd5grTjxOGxHWmv4U9IYjlZqWmuYUW6MWPvfJMrGaF9FS+gtRcsutALNcmPQNsAbEPBKbd5ek/ooGC1rc7BDbgzZDfhISmNAZXJj4NfkpkD0N5OaAj/IHmyNAXwmocE/k2jwmyTu+6PfPX7fbzyp0V8C1gPSu777pfU+t+PrN41J63wmpXWb7hANPqK17iUgICAgIAD4zHd5fAGgfbEhmQAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="pass-icon"
    />
  );
};

export default PassIcon;
