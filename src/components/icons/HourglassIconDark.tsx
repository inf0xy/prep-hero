import Image from 'next/image';

type HourglassIconDarkProps = {
  width?: number;
  height?: number;
};

const HourglassIconDark: React.FC<HourglassIconDarkProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3klEQVR4nN3VvUoDQRSG4RReQxSExNiIiCAk1Vbb73XkTnJHIZW3kDKtRcgKgkWwsJTHIqfYIomzayagB04z853vHebMT6937sAUzx1zmgpY2sUywbSp/RkQkDKKylNq/xegiKIqQVuFtmgDuMQXZgnaWWj7yYAoXOATj0c099hi3so8iod4RY3RnvkRNqEZtgaEyR3esMagMX6Nl1j9UyfzhtkEH1jhInIVY5NfmQdgnA2QsEXveOhqftNo8u2BJtedm5z1mOIq60Vzhqei/POvaZkNIPeXKfenf+r4Br2IkZ9JgpmSAAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default HourglassIconDark;
