import Image from 'next/image';

type SavedListIconProps = {
  width?: number;
  height?: number;
};

const SavedListIcon: React.FC<SavedListIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADpklEQVR4nO2XTWgTaRjHR6G0+WzTNpl5ba20NgVhYQ9lhZWIoNWZUk+iIGq0yx6soFTQ4mmpC4ugImamUtAiSuPJi7WKpW2amLSxmhirVgU9KOy6UPcgqHio7bx/edOdRmvjV5N0ivPAc0mY5/39nvnPkHCcUUYZ9dUF/54G+Juew9+ErHRn0z+40FTPZauSB2QL3q9J7P47ewLZhvdPtSGQrow74J/nCI20rEYumjME0pRxB1p+gAjFD3iAB/xKjAq/LEiByL5VwKgwjPuu2IITuH3Ag9ifPwOjPHCftevXBSUQbV6FsUuVwD0XcJe182JGBQZ+q0G2OtBYg2u7K0FH+Cn4ESdwp3QSMVeVrgUCGrzXjccdZWzrGjyQKAXiJSd1I8BAe7xuXPFWo3t7Nbq2LUf3rir07q1E+NAyTNya3jyQKAFulwBxx2vEiuswXLwCd3nLvApc3r4cT86XY6y7DK+CBBNxIZV3Dfwj+GIg5gBuOUBvFoEOF0GN2l+p0cKHatTWpw5alZwKsM0/ai9PvWXuuT6NjAb+CXwh6I1C0KgddMgOOmiDOmj7K6cCLO9XdlQjcXwp6MhM+JIPtl6cAp8FXo3YKMLmg/PyEDOJq143hv6owGT8/61/JjJT4Bq8jcGPI2LZ+s3wmRLQmr11Qgcr8C5a+vWRiVjfIGze8F3wmRZg3bPTjUDzsi9GhsHTiBW4bprb76NMC/Q31mCguWKWyNinI6PB07AVCJprdSXQu8uNxJGyz2xdg7eAXrcAIdMeXQlc87rx9CyfNjJs6ww82SEz1AHTuTkJKBJBJvvoOh4vuhwfRWY8aIMathxOdsjyloHToBl0wMQEHupGQJYITjTwUIdSW3/cUYRTm1zT/8gQMJWpQVOnGjBRGiiA2ldAEeKKdCHgEwku/O5Mwv970Y7zjU4cqxOSn888F/0FHrUvP0H78oHe/LW6EWjf7ELX/lIcreNxUkx9N9vZaOUWoyfPi/78Kt08Az6RJMHlGZ9/N2CuBZQ0rQ8BUXguS8Lmtg38RkUizxaSwIQsCfKpNU6rdt2JLeUmWSSHFVEY17eAKAz61vM/pbu+rX5JjSIKAd0JyKLwsk0kza2t3OIvzQDHLVLqhZ2KSP6bdwFZIlSRSKcsCc5vndXeUOFgUVNEouZMQBbJ5AcHjfok4pnrTJ9EPGxW6m6SSS5bpUhChyKRMUXkW07XcnmZmnu6lstjM9lsWRTOZGquUUYZxem/3gMOzRTdYAQwqgAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="list-icon"
    />
  );
};

export default SavedListIcon;
