import Image from 'next/image';

type ClockIconLightProps = {
  width?: number;
  height?: number;
};

const ClockIconLight: React.FC<ClockIconLightProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADeUlEQVR4nO2Zy0tVURTGf+aDrq8GaWAQJYoaTRxFoQO7SNjIoWXDBoENGjaxkv6AhhISTTJJMsFZoxJ7vwwEUUIMGklZEA3sQffGjnXittrneM7Z+97R/WBP7t3rW+vbZ52919oHyiijpGgH7gP7isC9F5gHuigSeoEPQB5YBOo8cmeAF8L9GcjiGWeAH+IgGLPADg/cFcC04v4JnPPATSVwVZEH4wZQ7cFHtXDZfFyVGFKhHpizkOaAMfzjPPDL4u8esCsp2X5gyUL2FRiMeMHNY5+Sd+STpJ0Zm/Kb+W8EaAvhGBQf2u+SxBQLR4ENC8l7oFvNrQJOA09CUiBqPAaGLSnSLb70/A2JLRIDwJbF+DnQYpn7NkXgeqwCxxV3i/jUc7fEbyj2AOvKaFq2uQC1wHUPgesxofxkLLvTusQYiUPAF3lZr8g2VyjwdUgAZv4r4CLQB3TKWVEnh5P57VKEfR54CTQX+KuQGHISk4ktFk5IfuqnsxoSuFmpjrjkIu6O2NpSqlAEEouJKTVqQ1ZuDTjswHvEkrLBk9iJR9hy3tREuz1wN0kNpPmv4QkDIcFvdwprmyjUhIjodw2+yrJVrsVc+SQCgieh02nFpZRADin9wsbN+aQCkINKv9gnccBTRXY7gW0aAQYzyu4RKdFuWf2OEgjosvhtTRH/n8JMb22UQABS+BXaniUFphSJOWFLJeCysp0kBd4oElMKlEpAVtmaQzQxNhVJkvx3FdCpbE0vnhjfFYnp0EoloF7ZfsODgAZHAY0JbBt8CPCdQqbFHI0ppNNHCumt7JijgCRCssrG9BmJcUuRmGYkCUYl2DRCxtTcm2kEjHjYyhpjCJmLsYWnOsjaVGGVk9zEs5A+NfegpZQ4kNLvf9clpg10gdkeLxQIeWCZM6t8PnRxOGxZDdMGuiJ4Ir3q9x5LOT3k4qjS0sivS/PhG83AO+Vr2bWhQS6ddN7OSxvoCzXAgsWPt2v2iRARTZ5WfsHCP45HZKQfyFvSadv7ygj0WNLGjGe+r1WClQq72JpJ+GnIbJV3Q86FlSK9Y39FBJ+CbGNRmpGsCKqX0SW/jVkOqbxaeX0r5x0ZuXTKex7jxUibKPTL43YNfLkYH/XiwuzRp+Tqw3ZRGzZycsIOefpQ6AWtUnRNSuG3KU2RGR+lJJ6UOalrmzLKKIN/8BvivEZEWl1G0gAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="check-circle-icon"
    />
  );
};

export default ClockIconLight;
