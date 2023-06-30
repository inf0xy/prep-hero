import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type CurlyBracketsIconProps = {
  width?: number;
  height?: number;
};

const CurlyBracketsIcon: React.FC<CurlyBracketsIconProps> = ({
  width,
  height
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+0lEQVR4nO2bO29UMRCFLSQeoiELSHS0UAA1DfQoBCqeG/gDBDrEX6DiURBEg1IjakLDI9CRlKSE0KQC7c45E1geUYxmIwSKgr1hfb03rD/ptj7jueMZX3uuc4VCoVAo/DMishvQcQqnCM5R9BOE311ibEwbe1WDUyLaNG03KFqtL/sBvQ/hV0L92ie13noapg3opNmSWi8IydOEynpG5XTAH4+q6NnUmutC4Q0IVyIG5XaARcMKoNdclQAYDU5eeAvAAe/99tTaNqaNbRoBJ/wgeTy1dhfv/TaCHwKTf+IyQXA6EA0LZmtyURFtBkMQS5dcJoClyyFbVPR8BaL6OCiqeshlQlt6JPwy9FFyUUIXQqIi0nCZsPofSYrvkotC2AmJeu+3ukys5qNgRegkF2Xmslc7e1gcoCUCWJaAlhzAkgS1VAEOWxkUkUZEUFxmCEXIpna7PZJMDMCp8N6bL5KJ9WqT6MuwTTiZTUxEm8nEerXJziHDL+V5EiERvRp7+977LS4zptnDi5noe/IQLgc+Ot6q6j43IEwbovMB+5Y37AQRaQAYi3mX4BsAe9yAIbmX4GwsSm1OPX2yM1JeumeCwrtVnPv1d16oN0PR2nN5ZHDy+hrAUVdTzDazsTgAFUUAf5+/P1hc9DtdTfDe70i2BNrt9ohtIqyORpLgrCUgV48kOBdJgs/sTmPDu0MRnQiXQZ2vexlU0St9iYjoRCQxzgxwI/QqZFvfk/+F1dFwiOm4y4xdxMTCPqEYxmIbjWRivdokOhO2CaND/TncarV2pRb0fZWXxGS3h8UBWiKAZQloyQEsSVBLFeAwlkFsogYJgp+Ti3LoW2QQbZI67P7nJikRvbiJ2uTOVbXuFgLrbtplguDTgAPeV5aPgKUTkVbZ2yQPVtUqa2NTeOevUWgt9eQxVyUArte1Wbrvq7AN3hbXrV3+jBvADxOTA/5hogPovew/TKw9LRLRCxR92L0vFP0I4TeXGBvTxjYN0zLNpE0QhUKhUHDDx0+FbYB+/KXDYgAAAABJRU5ErkJggg=='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADJElEQVR4nO2bO2wUMRCGR0g8REMCSHRpoQBqGuhRCFQBQggn3Uzs2fPsnSgQ5bVUPApANCg1oiY0vDtCSUoIPRRBCAVClKDJQyCU8yY5r+/C+ZO29T8ej2e861mARCKRSCS2DOLV/RnKZUsyYcm9syRfGGUeAqNj6tirGhOW8lHVhk5hTH2AUe5bdD+YZOnfJ7TeehqqbUnuqS0QE0u1c4wyu55RMR3wxxHyzVLtPMQgI3edSRZ9BsV2wOqzyCh1KJOsKoP+ybubXG0czvN8d2htHVPHXtZoGQnul6nWTkEZDA83d1mSTx7xJxAJJplsuQjoZtTW4KKW8lFvCFZrY8FFW9oiV7y2jLuL4UVRHvsdUD8KkcgwO+5NiiSPgosyuhmfaJZl/RAJrf8FDvgQXJRJ5nyixpidEAnd4wUVYS64KEcue11nDycHSIoATltAUg7glAQlVQHutTKYZVm/VxBlFiJjyX312dSoNPqCifG4O1vg8RcQGYvupd8mdyaamKV8FCKj3yH9NrnnQYQMubxo9ZvN5g6IjGoWLgyKhJj8gkfgPWL9EHQI1WZy0x4nLGzaCVmW9RvMhzbg3bduzB2ADmOMOcgkU0VRqnPa0Cs7F5QX/SZoyd0p47vfVlFbLMoNX7RuuDyyv9y9YcpPQJeitq3YmBywVE4E0NoWkAfGmL3QJVQqlT3BtkCj0ujTQ4TW0YLBpjQBQYdRG/S+0J+w3TO909j06dCiiN+rbrrbyyCTc22J2BUn+CLhVQcPQq/9trU5+TW0jvqE9FgKkdGLmKKwDyZmMB8qOmhAZDTyvItSlcGefh02xuwLKsjtlpfARLeHkwMkRQCnLSApB3BKgpKqAPdoGZzbNg0SKN+Di3Kvt8jYgiYpY9wx+M+bpC5tlzY5g3KhnH2H3m0wCZGwKE9b73/3sbR8xONy2tcqa1FuGSNHymqV1bEZ5bYn+c0zyUkoEya51q3N0m1fhW3qtrjL2uUzlGGIiTH1Af1ZoZM/TCyfTdDdjf7DxN9o/bckI5bkod4XMspnJvcTAqNj6tiqsaxFMhK0CSKRSCQS0Hv8BqFFoklUHGxEAAAAAElFTkSuQmCC'
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="dashboard icon"
    />
  );
};

export default CurlyBracketsIcon;
