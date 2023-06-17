import Image from 'next/image';

type DebugResetIconProps = {
  width?: number;
  height?: number;
};

const DebugResetIcon: React.FC<DebugResetIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZ0lEQVR4nO1ZS09TQRSeIGh8bHxA51Rk5Yq4wwcRksaeU0OiS3Hjygjo3gViTNhoMHGn4MKtC6JGF/gD+AMsFMqcWtAETAyoGAMafCxqTrkxdO7lcXvvLb1Jv2SSps2ZOd88zuOrUjXUUENwFLp3QS7ToRnvaMZXwDStGb8B0x8ZzucsML4EgwNNhtpVYbBO7TQgSy1g8AEwfgKmgp+hDX3UTENH86nmyBzUjPc9v893NWrGJ84O+3LcTQR/gaHHSYOHQydQXMAiAYxXNONSUMc9TuRLIkeXQyfwn8REW4Oz695OGPoOBp/CdPqaZjoppyQ2Rbt8V2PiXfo0GOrVTKNgaHkTMiNqPFUfKgGHxOwGO5dLMl1tnm/fu+15Jy7uA0M9mnFmg2s15me+bRFwLcL4UzPdDLRbE20NYKi/+A7ca7wOfBKbOJ9PmMwJFRKSfO4sMC2418LhaAjk6GFYzpeEZMYp91qZbhXRFfIMscFJUMlJaKavkEsdCZ1AZCRymQ77TWjGR5EQiIyEwQE72R1jSqq4oDXbvRsMvbdI3FNxAjD2WW9hrioKwO0i8SazH5hW1pOQbK7iBDD4zCpX+lWcoDl93SLwQsUJienMGYvApIoTErOZJrvk3tIImP6uNwqttC0Dx/Nde+x8sKWRZvy93khisooZgaWSe1duHbKDVyhbLbG3yVC770dclD5KjXpVnMIo2IUU02hFvPUAGHzuO5F5HNuy9LCqwmjMpg4A44/S5gZPbW1ZGKwT0cki0aPiVMxppiGr5p8pSiSVDJ8GP5RdTovc51IKKlhIAdNtK3yu+m5oRO6zk4ioB5F57QBy1GknU23KEBGas+cPgcHPVgu5II23igiwQVNftm4qWqW7D8apKEjAmvMlSXSNQPpSsImZRjya+QVRD0JzPkedYHDR5Xw5V8eF8VS9yHzesjgOBCn2WqV5Z7pt33ln/rHQKmERWmVCT2mlqB5gn/SwPpNUnx0qQxd33SeBw54k1saK9LBSv0gnJZWk7LAM+SzfaaYba+VBaYYF+9pE2YOIVukRnYIPg4uBH6yfECty3wayuK+hDa3KrrdMXjioKg3JjpLiNeO8b8eZ5sDg3eqQDAuDdc5fSLekZpfGQzo7iS7OWNKG3jq/9ReryjipbDXUoKoX/wBujW0eudiDpAAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="debug-reset-icon"
    />
  );
};

export default DebugResetIcon;
