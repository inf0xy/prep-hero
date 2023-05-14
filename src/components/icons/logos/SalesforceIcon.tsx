import Image from 'next/image';

type SalesforceProps = {
  width?: number;
  height?: number;
};

const Salesforce: React.FC<SalesforceProps> = ({ width, height }) => {
  return (
    <Image
      src="/salesforce.png"
      alt="Salesforce Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default Salesforce;
