import Image from 'next/image';
import { useAppSelector } from '@/hooks/hooks';

type BookmarkIconProps = {
  width?: number;
  height?: number;
};

const BookmarkIcon: React.FC<BookmarkIconProps> = ({ width, height }) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Image
      src={
        theme === 'dark'
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACe0lEQVR4nO3dQW4TQRSE4V4RjhB2IE4BGwQninIWFsAxWKARglMgAWcAVoDE8keRgoDYM56x+6XrddcnZRe3Xr3KjK0sxqWYmZmZmZmZmZlVADwFXgGfgJ90pCgDHgLv6VhRBTwGvtG5ogi4D3xhAEUR8I5BFDXAMwZS1Fx/2tnnF3ABnK88Z68j5pE6JxzweWbWi8yLI1EBP2ZmPc+8OBIVIBUYsXPCqQVG7JxwaoEROyecWmDEzgmnFhixc8KpBUbsnHBqgRE7J5xaYMTOCacWGLFzwqkFRuyccC0CA2dXPyrzNHXbgYE7wGtgAu62nqe52wzM3+X/sVOCCwgqgN3l7y3BBQQUwPzyd0pwAZUL4PDy/yvBBdQv4M2K5R/83VrzFDXRgWtplStcdOBaWuUKFx144Vaz5dbkAioWMF2/2a59c3YBFa+A6cZn/tUl1Loii5rowP+Y+9fDqhJa5QoXHXhp+VtKaJUrXHRgDix/bQmtcoULDjytWf6aElrlylzAtGX5h0qoMM9QBUzHLH+phBPnGaqA6ZTlz5VwwjxDFTDVWP6+Eo6cZ6gCpprLv1nCEa8broCzmAmPO3u4AtSkyZVm0F5zpRm011xpBu01V5pBe82VZtBec6UZtNdcaQbtNVeaQXvNlWbQXnOlGbTXXGkG7TVXmkF7zTU3KPAc+OCnJrYroEtFDYMpahhMUcNgihoGU9QszLrpqYlqeihg01MT1fRQQMq//IwFfHcBmg9uvSyJkegKeLnwJnwJ3CsJkaiAq2/LGEZRBLxlEEWRv8BBAPAI+ErnijLgQe+3o5IB8AR4AXxceLx9Sq13a2ZmZmZmZmZmJZ3fF76gfNPz4awAAAAASUVORK5CYII='
          : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACsklEQVR4nO2dQW4TQRBFewUcAXYgdnMDkPp/m5WPE3EWFsAxWEQIwSkiAWcAVoDEMmikZGO54xm7O1XV/Z80qySl+v95xiNHGqckhBBCCCGEEEIIIUQFAGwBvAfwDcBfkte9HMkz2+32Ockv1iVxRAE555cAflkXxBEFkHxK8od1ORxVAIDP1sVwVAE551fWpXBkAfPdzqFFAfwjeUHy8ZI5rBTY25zmAPheWPYicnEMJOBPYdlFr3yvxYUR4C0wnc1pjrfAdDanOd4C09mc5ngLTGdzmuMtMJ3NaY63wHQ2pzneAtPZnOZ4C0xnc5rjLTCdzWmOt8B0Nqc5FoF3u93D+fCyjyn3HXiapgckPwD4SPKR9T7m3Gfg6ab8258dkiABjQRMe+WXJEhAAwFTofxDEiSgsoDpSPn7EiSgsgCSl8fKX/K7tfZJ3mgdmJUOq1zNkYAxBVyuvDTpDKglADdvtkvfnCWg4hmAvXv+NRJqnZFp1EsQCh89LJVglasLASiUv0aCVa7mtA6MI+UvlWCVqzktA2Nh+UskWOUKKwAryz8m4dx9hhKAE8u/S8I5+wwlAGeWX5Jw6j5DCUCl8g9JOGWfoQSgcvn7Etb+3XACdoV/stfglNnDCfBGmFxhFu01V5hFe80VZtFec4VZtNdcYRbtNVeYRXvNFWbRXnOFWbTXXGEW7TVXmEV7zRVm0V5zhVm011ylRUm+AXClpybaCejySN6wLoQSYF8KdQbYF0NdgsY4kjdKi659aqI3wgtY+9REb/QgIOQrP6KA3xLg8MGtAF6nwDDQGfCu9CY8S8g5P0kBYRQB87dlWN8acuTb0BmSn6yL4eAC9AUO1gB4AeCn9SuUI54Bt+Scn/V+OUoR2Gw2JPmW5Nc7Hm9/HfGw7lYIIYQQQgghhBBCpHD8B9Zf6Q6ja9hDAAAAAElFTkSuQmCC'
      }
      width={width ? width : 20}
      height={height ? height : 20}
      alt="bookmark icon"
    />
  );
};

export default BookmarkIcon;
