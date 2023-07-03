import Image from 'next/image';

type PreviewIconColorProps = {
  width?: number;
  height?: number;
};

const PreviewIconColor: React.FC<PreviewIconColorProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYklEQVR4nO1YSWtUQRCeCEYQVDQ/wLsLcYEE0QgexBdmpr+vJ7yIHnPI1aPgJaKgFzXGuJA/IAoRD9GTC2LAQ04uUSOKh3gIQY0SNYJLIkX6YDr9+i2ZiTi8gobhTVfVV921dqGQU0455ZRTTkukUqm0WimlSJ4AMATgJYAJAN/NmjDfhmSP7BWewj+mBgAHSA6S/EZyLuUSnkGRIbKWFTlJAHicAbRzYV4Wag68UqlsJHm7WsC52JBboqMm4OWESE55ALwG0A/goNa6OQzDDd3d3StlyW8A2+Q/khcAvPLImar6bQA4RnI2QuFNkrvSylRKtZr4ccmdFZ3VAn8+AvjDLMBtItlC8n6Ejt6lgj/t8NNfAI739PSsKFSPGkgeAfDDoe9UJokkuxzCPiil9vn4AGwF0EdylORXs0blJrXWW2J42wBMOm6iKxV4E3AzNnj5HsUTBMEqAJcB/PZkGbm9i2EYNvoOgOR7i2/Gp3sBhWG4TjKKJeCzUmq7D7zHj12G3PMZobVuJvnJznKCLdYAkgN2RpDS7+MBcCVDzu+PwVFy3OZAHPgWm0kCOYHP24rGAXQopdbIAqSEcMx2p3K5vDlG9kmLR/S0+HqbEQvIU99VR6TZcSlc9r5isbhe/rP2nvPJliJI8ollxIizdyLZ7nCdVp8Cw/fcUtARtVdrHVp7nyUseHaxa1+0EcCwtelanHBjwPTffOIyUXuDIFhr6ZhOogPAVcvw4VgDhKnaBpgMl8WA67EGuFzIFzAeF6Jnb2daF6pUKrsTuZAriKVPl0BKGcRjErAO8E0A3qUJ4mC+OL5IFMRRaVRGQJ8SaQ8kJdqZSAJWfN74facNXniUUpt8skmeSZNGnYVMmLTWRR+PtAcZCllfzMGEDtfxF7KoVkLKupR3D08jybspDLjjc03Oe8KXTK1EVDMnDZZUXZ8RZiKz3WmB28jJx4DfafdBqZq5mHZ6Uim118cn7YEEp2QYOUWz5PfZOJ/XWu8H8HHJ7bRvoCH5sxYDDYCjrtvLPNDEjZQAHiRpNRLIbwPwqCYjZYKhXobvGxlmYxkh95iXurmaDvVJn1UAvCF5ieQhGX6kcElgmwzVpLXeAeCwTG0k3y7rs0pdPGzVxdNi3Tzu1svzek455ZRTToX/nv4AnoXEv7aE43AAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default PreviewIconColor;
