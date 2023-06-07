import Image from 'next/image';

type NoteBookIconProps = {
  width?: number;
  height?: number;
};

const NoteBookIcon: React.FC<NoteBookIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABgElEQVR4nO2ZwUoCURSGz7RwE4EPkSs3vUQR9QizaBFoMyKteoJ6gGjRIrKNt3V7JSIrKxcVpiYSFRRCgptIKhP/uGMtpE0zOprw/3A4cGHgfpx7zj3njghF+SNYMg9bnmDJK5bH21gLN2ALoEzfrbq1ALxIx+u1pHnkBeDR2bC2mAGshjE0AGXCPcDP5glgMgLgEYoxicEq5GsZrVXQs2rlId4DWr1eYFoE6EcE3Er9twiMPIBiDmDwEdAlsFc9D7OMch4wOdD8Eo+Q4kwMViGwjJp8FwJvYputBPg2qtiNGmynwf8DLsV2WvWxnd6c9jATW9JuLhkfLUtaiAfaiAfeuqLio1UjEx0A7b/XXAPozc9MhqB2NlBOrqCYSqBYOMZNIeu7ZU4OHADt81eH3gD0R8HgFPbTezg/S6FUyOL+7hIPA7DcxakDoP1tJecNoBEZq8+GQkgm1p0IlNLbKF6PUAQ+ozKnId6jRhO27MKS/CBzoL7YlQMZ1wAUJX/SF/feYNlk71V5AAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="notebook-icon"
    />
  );
};

export default NoteBookIcon;
