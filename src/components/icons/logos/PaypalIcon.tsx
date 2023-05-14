import Image from 'next/image';

type PaypalIconProps = {
  width?: number;
  height?: number;
};

const PaypalIcon: React.FC<PaypalIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/paypal.png"
      alt="Paypal Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default PaypalIcon;
