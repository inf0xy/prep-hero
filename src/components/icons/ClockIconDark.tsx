import Image from 'next/image';

type ClockIconDarkProps = {
  width?: number;
  height?: number;
};

const ClockIconDark: React.FC<ClockIconDarkProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO2Zy0vUURTHp3yQNtYiFQzCwtAJN61C0YWJiK5cVrZsEeSiZRs18Q9oKRLRJotCC9y1qtDePoJAlJCCVmEWRIte5CcOnoGfpzszv8d1VvOFHwy/ued7zvfec1/nl0qVUELxABwHHgFHdoH7MPAEyPjmzjroBDbYxjKw3yN3FfBaub8C3b64sw4uAL/ZiQfAXg/ce4B7hvsPMOQj8DLgGm7cBCo8+KhQLhfEd1lc4jQw6yDdAsaSBu7wdxn46/D3EDgYlawReOsg+w4M5JngQ8AdnSNfNO3k2dR38t8loCkHx4D6sJBYGsMG3w58cpB8BE6atuXAeeA50fEMGLQpIj7Ul4XE1F4o+D7gh8P4FdDgaPuO5FgDeg13g/q0kNj68gmoB94bI1khqgJtqoEb+Md146fKsTpJbPWFRqEV+KaTdVyWOSNwKUcA0n4RGAG6gBbZK/TJ6LvRPPaCBaDOLLHjyi0xteYNPmDYL/npGB0Zbost7anmUOTbXCJuWm0t1oIitL3Mlf6w/C6H1Tl6bh04lYC3zZGy2ZHYFztghyNXzsuZ6JAH7lo9A1lM+gq+L0fweXdha1CgbWUOET1Jgy93LJXrYXo+ioDASNh0Wo19lFBS2aSC2Aqb81EFBDZRO7HPpuICeGHI7kawjSxAAMwY06epONCzje395iIIyDj8HosjQA5mQSxEtI8lQKAHvyAupqJCT45BjBRRwFVjPhVHwBtD0lVEAd3GfCmOADnDB9FcRAEtxnwjjoBfhiRdRAFpY/7Th4CaJAKAAxFsa3wI8JpCesUcDiMETylkl7LTCQWEFsL/k3gxjoDbhmQ0ov2wBhtZCDBm2t6KI0CqB4mWMgkuhJDZEEt4rI2syRys5HdLZKLCQrpM2xPmf/F7NI7flKNcMh2LaOfyeCUg5LGjjZQsg5hP4nDQ0RttSUSYEek07zscx+kzSWuj9iIvl47apCIcvuqAD8bXSqILjRL3OvJWrn+VHoOvBOYcfvyU2bXo5BJR66nn5xz8E16CD1TJpNSBI53aE/B2ONJG8NJrWSXQU7kKWzNRPg3pUnkfN1Z3Y44FRWQ/BbmwrJeRbr0apvXJ6LsxxyZle35HVW43REg6TeIfE97TpoCQHh3upFjx/lEv4j5xTkofOQq1uSBt52WT8vGh0Auk9CGHLrmAayF4Uy9F8nzW0vuUtol3timhhBJSFv8AbqQf6VLIQCsAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default ClockIconDark;
