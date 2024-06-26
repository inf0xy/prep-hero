import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type SmallClockIconProps = {
  width?: number;
  height?: number;
};

const SmallClockIcon: React.FC<SmallClockIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO2Zy0vUURTHp3yQNtYiFQzCwtAJN61C0YWJiK5cVrZsEeSiZRs18Q9oKRLRJotCC9y1qtDePoJAlJCCVmEWRIte5CcOnoGfpzszv8d1VvOFHwy/ued7zvfec1/nl0qVUELxABwHHgFHdoH7MPAEyPjmzjroBDbYxjKw3yN3FfBaub8C3b64sw4uAL/ZiQfAXg/ce4B7hvsPMOQj8DLgGm7cBCo8+KhQLhfEd1lc4jQw6yDdAsaSBu7wdxn46/D3EDgYlawReOsg+w4M5JngQ8AdnSNfNO3k2dR38t8loCkHx4D6sJBYGsMG3w58cpB8BE6atuXAeeA50fEMGLQpIj7Ul4XE1F4o+D7gh8P4FdDgaPuO5FgDeg13g/q0kNj68gmoB94bI1khqgJtqoEb+Md146fKsTpJbPWFRqEV+KaTdVyWOSNwKUcA0n4RGAG6gBbZK/TJ6LvRPPaCBaDOLLHjyi0xteYNPmDYL/npGB0Zbost7anmUOTbXCJuWm0t1oIitL3Mlf6w/C6H1Tl6bh04lYC3zZGy2ZHYFztghyNXzsuZ6JAH7lo9A1lM+gq+L0fweXdha1CgbWUOET1Jgy93LJXrYXo+ioDASNh0Wo19lFBS2aSC2Aqb81EFBDZRO7HPpuICeGHI7kawjSxAAMwY06epONCzje395iIIyDj8HosjQA5mQSxEtI8lQKAHvyAupqJCT45BjBRRwFVjPhVHwBtD0lVEAd3GfCmOADnDB9FcRAEtxnwjjoBfhiRdRAFpY/7Th4CaJAKAAxFsa3wI8JpCesUcDiMETylkl7LTCQWEFsL/k3gxjoDbhmQ0ov2wBhtZCDBm2t6KI0CqB4mWMgkuhJDZEEt4rI2syRys5HdLZKLCQrpM2xPmf/F7NI7flKNcMh2LaOfyeCUg5LGjjZQsg5hP4nDQ0RttSUSYEek07zscx+kzSWuj9iIvl47apCIcvuqAD8bXSqILjRL3OvJWrn+VHoOvBOYcfvyU2bXo5BJR66nn5xz8E16CD1TJpNSBI53aE/B2ONJG8NJrWSXQU7kKWzNRPg3pUnkfN1Z3Y44FRWQ/BbmwrJeRbr0apvXJ6LsxxyZle35HVW43REg6TeIfE97TpoCQHh3upFjx/lEv4j5xTkofOQq1uSBt52WT8vGh0Auk9CGHLrmAayF4Uy9F8nzW0vuUtol3timhhBJSFv8AbqQf6VLIQCsAAAAASUVORK5CYII='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAES0lEQVR4nO1Zz48VRRBuFIjgogdZEk0IGo27Pi8mk2zeDtPfN83umvXEaaPi0QOJHDx64cfGP4AjIcZ4EQkblYQbJyDgb0UTEqIxBhNPBNGEeBAwsqTcfjhb9HtvpqfZ06ukL+91V31fd3V1VY0xIxnJ2gnJ50iesdZuT607z/OnAJwjOWkehJAsSF4juUzy+7m5uUdT6e52u5tIfuN1/2mt3WVSirX2TZK3vYHeOGmMeSiB+nUkl6q6Afxjrd3XWvPCwsLDAA4r4D0jH2RZtqGtjSzLNoiuPjYOC4YoxSTHSJ4KKL5DctEkFgBvk/w3QOL07Ozs442UOed2kLwUUPZXWZa7+11wOXYAx+WOkPzDu91tANflN/kPwFvOuWdDOsqy3C02Apt2STDV3YlpAFcDSn4j+ZICvd5a+wbJL0IuMGR8DmCPdhGx4W3pzbsq2AaCJzkP4O+Asa+ttU/quSR/jgCugf1krX25qltsic3AXME235fA9PT0NpJX1MIlCXO9OVmWbSb5flvgAXDvVe340LoqOgk2wTjwFJxzL5K8IZcVwLsS5hTBi31AyPzvSB4gWTrnJuStkCGPk/wG4OCA9csAvi2KYrwCZ51g8IHjhmAzdQTAK+Kf+nTkuPtEpaWiKJ6vpXxlkyYAfOzX3udSioTg2SOYTKx4t7lv5wD8Yq2ditVLshtw2f9OguQj0YADhkI+f2ZmZuaJBLq3+hxI6z+aCvx8CPywV1ivGTS30+ls7ENiti349TpUitvU2fkmBHonod0JwI/RqYSIf6RWXdi6Pt+UgIg8VIGL/ZqJFQBfKmUn6q6NISAC4BN1Cp+ZFsXLqt1vEipjCXDlzdCn/kxjApKY6dDWZH0sARGfDN5ba63da5qKzyqrIA6sFQEAh9T6YzEEflBKyrUiYK3dpdZfjCFwvaqkif+3JeCcm1DrrzUmQPKWUjK2VgS4Ug1W79/N1gTyPN/ShsDU1NRjddfmeb6lNYHULuRLzP11iLhELrQqlAFwLQnUJmLVJZY6I4bAR0rJwYbr93uwjYmQXFS2P2xMQLoHbUOZgKtB5NSwEB71kEnrQyVWd8Q3GysaTqRU4F/QqQTJp2PsGt0ukTIwStH/+sYAvNMjAuBsYM5JZfNCtEGpRQO70TUtpXIiRfX3six36nTaWvtq296oLuSl6NhqEktRFOMAflW2LrcqaESk6aT9Vso/KQNTge90OhtJntd2krXZpekUIpHiJIqiGA+BB3DEpBLpkvlWh44gV4b2KwdIWZY7A24j4L9K2lap+GiwseXLwNqfhnyo/DT0Lkgh/yDu2D0SlU9BoSEt9EM+FZj0WaWMSf/bYqDOWK7uvO7KJRffdD06gETUAHAkudsMEmk6+eNuC/5y8o96dUViNMnXpfURatQOGHJvLvhHKsWHwvYirQ9JuqQAl8TP1xNSFN0C8LtvvR/zc+Jym5GMZCRGy10FTW+RgwVtiwAAAABJRU5ErkJggg=='
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="small clock icon"
    />
  );
};

export default SmallClockIcon;
