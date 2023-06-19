import Image from 'next/image';

type DebugPlayIconProps = {
  width?: number;
  height?: number;
};

const DebugPlayIcon: React.FC<DebugPlayIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7ElEQVR4nO2aMUvDQBTHX0VEQXRxcFALuRfBgriJIBLovRQXRzdxdvMj6Fdw9Cs4i4uri7iJiAi19C4FBZeiIAoSSW2ElgQ1baG5ez+4JUPgfsnd/e/dATAMwzAMwzBMT6D2d8BmUFOIis6cBi2AtQI0hULLJga0ByEUwEYBGDclL9waLYG1AnSrvQktD0s322NgqYCw3a5dVV4FiwWEqOQnKjouPXmTYCLY1WGhSCeJEJqqbiAJTAO7O3u/OSUUHbW+fPIfcbLY8GbAFLCrg/Fzp+GvCyVvU4bGo9ByF0wWEFGseePRaiC0fE8cFopORVCZB1MFxDiKloWmy+S5QTZR0z6EByNgqoAIL/RGo44KRS8pc0M+AxT+UUCMW5eOUHRuTIDCfwpoEUIhmgSFoufcByjMIqBNsebNRstirgMU9iDg5x2Bv5UeoOQD1ss+mCwgwqnSdC4DFPZJQIxbL28IRXe5CVDYZwERc2pt4jtA0cfQBygcgIAYV1dWUMuroQ5QOEABnQFKvg5lgEIWQDwEkCdB4mUQOQgRR2HkzRDxdhh+wdqCiGdzScyxtShatLks7th6MIK2H40J6w9HdU6ru1lJGeP5q+9nxZhAkxVjAk1WOgKNtdfklNUXJX27r8oyDMMwDMMwkC++AAHAGJPK/Ps9AAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default DebugPlayIcon;
