import Image from 'next/image';

type ShuffleIconProps = {
  width: number;
  height: number;
};

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ width, height }) => {
  return (
    <Image
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzklEQVR4nO2a24tNURjAl8uEIkoIQzFuNfwBbo+SEqXk8oTGg3jjdWbChIOZ5BrmSXmQJ08eKEW5PCCXRCE8eBAjptzCT8tZ03znNGfPXnufyz6zvl/tTu19vrW+b12+9e3v28YoiqIoiqIoSt0BLAYeAW0mRIAj9HPYhAbQCLwOfRBmAC/FIHSa0EAHweggVGQlAFuBsxHXMWAfsBGYnqqzwXWZC7QAB4CTETpdpZBc0g7n4Mdf4CawqoxGjwC2A3dJR1OSzkcB14CeiKu3RIcXgUkpjV8I3CvR/ucInewzyUNrSxpdIgHGA0uA406BPt4BCxK2uQb4Ltp6BbQCzcCYCLnhQLeQe5x2IrwAJgOXigZhmmcby4EfTv4XsDfODALDgHOi76dWH1MLgINCkTtAQ0y5KcB7J/cbWB9Tzhp/SvT5HJhqagmFSzEX0+HdEDLbPIw/LeSe2YE0tQYYDdwXJ8TaQf7fIYzo9jD+hJB74bvlKoo7Sr845T4BM0v8byXwRziuko6uSG5nppb9QNh9HOUPbAAFfHDPvwLzPdrek8mZL6ZomXaJ+yOBW+LZJuOB2wL2CB5nsgzQANwW/mCdu58Txp8xQxlglojS7O8uNxiWB9ZpmqEOsFoY3Uevz76ve4CuogHYbEKCkAeAkLcAhU6wJygnSOjHIIWBUGeZA6FlwFiTVahsKLw706EwhS9DHyvwMrQjsy9D5HOK4b4OA+eFYoeCSohQvpTYhrpKiZE34LJQ5K2vIs6ry6RoR8Kk6JOqZISBCcBSV62ROfk3wLwUEeM30ZYtgbcDi6qWFief07uesDByAZiYqOP+/pvd9qlNYQT/0thP4AqwIo3hAzjGFhFFJmV2UgW2xCiOtrlgJ9WMx9ClyRVr91elOFqP2EDLldHC+1oENR6d+RCXfWPQn8kBR4M1XnwqawOd1v83FEVRFEVRFMXE5R+V40CBDOVe9QAAAABJRU5ErkJggg=="
      width={width}
      height={height}
      alt="shuffle-icon"
    />
  );
};

export default ShuffleIcon;
