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
      // src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADYklEQVR4nO1YSWtUQRCeCEYQVDQ/wLsLcYEE0QgexBdmpr+vJ7yIHnPI1aPgJaKgFzXGuJA/IAoRD9GTC2LAQ04uUSOKh3gIQY0SNYJLIkX6YDr9+i2ZiTi8gobhTVfVV921dqGQU0455ZRTTkukUqm0WimlSJ4AMATgJYAJAN/NmjDfhmSP7BWewj+mBgAHSA6S/EZyLuUSnkGRIbKWFTlJAHicAbRzYV4Wag68UqlsJHm7WsC52JBboqMm4OWESE55ALwG0A/goNa6OQzDDd3d3StlyW8A2+Q/khcAvPLImar6bQA4RnI2QuFNkrvSylRKtZr4ccmdFZ3VAn8+AvjDLMBtItlC8n6Ejt6lgj/t8NNfAI739PSsKFSPGkgeAfDDoe9UJokkuxzCPiil9vn4AGwF0EdylORXs0blJrXWW2J42wBMOm6iKxV4E3AzNnj5HsUTBMEqAJcB/PZkGbm9i2EYNvoOgOR7i2/Gp3sBhWG4TjKKJeCzUmq7D7zHj12G3PMZobVuJvnJznKCLdYAkgN2RpDS7+MBcCVDzu+PwVFy3OZAHPgWm0kCOYHP24rGAXQopdbIAqSEcMx2p3K5vDlG9kmLR/S0+HqbEQvIU99VR6TZcSlc9r5isbhe/rP2nvPJliJI8ollxIizdyLZ7nCdVp8Cw/fcUtARtVdrHVp7nyUseHaxa1+0EcCwtelanHBjwPTffOIyUXuDIFhr6ZhOogPAVcvw4VgDhKnaBpgMl8WA67EGuFzIFzAeF6Jnb2daF6pUKrsTuZAriKVPl0BKGcRjErAO8E0A3qUJ4mC+OL5IFMRRaVRGQJ8SaQ8kJdqZSAJWfN74facNXniUUpt8skmeSZNGnYVMmLTWRR+PtAcZCllfzMGEDtfxF7KoVkLKupR3D08jybspDLjjc03Oe8KXTK1EVDMnDZZUXZ8RZiKz3WmB28jJx4DfafdBqZq5mHZ6Uim118cn7YEEp2QYOUWz5PfZOJ/XWu8H8HHJ7bRvoCH5sxYDDYCjrtvLPNDEjZQAHiRpNRLIbwPwqCYjZYKhXobvGxlmYxkh95iXurmaDvVJn1UAvCF5ieQhGX6kcElgmwzVpLXeAeCwTG0k3y7rs0pdPGzVxdNi3Tzu1svzek455ZRTToX/nv4AnoXEv7aE43AAAAAASUVORK5CYII="
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADj0lEQVR4nO1YSWsVQRB+EVQQVIw/wLsaEhUi4gIeRERRIajo0cMDTaa+r14IES9PFMzFLSYq+QOioHhQTy6Igoec4hpF8aAHEVeMC2iMUuM7mM5Mz8zLi2KYgoZmpqv6q+5au1DIKaeccsopp3FSsVicUQI2KrCfxEUCgwReEvhaGTYftH+2xtYaT+EfUx2AtSTOKfFZiZ8Zx2fjNRkm668iJ4NNBAaqAB05CAyYzAkH3t6+ex6By7UCru6AXLI9Ju7UiXfxpyhPSPSUgG2qbY2qWl8sFqfasDmApvAfcJyQx7FyiHc1vw1S9ioxEr2pXACwLKtMAEsr/hMld8T2rAl4BY7FXPfNaoCPka/aTOB69G3I0fGC74oQPKzAvnK5PKVQO6ojBUp8i1DiYFUSAeyMAP9GNVjt41PVBlK6FXKfkE82bG43KSILfbwkVxLyyt3XsGQF30TIFxe8fY/jCYJgOiknCfnhiTTDCuktl8vTvAcAee0EiC++vUdRZ2fnbIsojoAPpVKwyAs+xo5j/OeaX4m2RqW8d6OcYUtUQIE+NyJY6k/gOZU5eRE9PpklkQ1jbhPoSxERxjB1JfA0uDyEPFeRlo6Ojpk2AGxWyiPXnEgu8Mkm5YAj94dhjFtfp0S/w3DXd9VRYTYEr1rvrtuza9ec8N/owznikx0mQeKOo3h/ZO0EYJ1rOpZsfBv8PiU8GMUn0hK3tgRscczoXpJ8w+AmO8MaBeSWE3/PJAkP+SAf/+Qzk4lbGwTBLOe2PqbZQymnHcVvJSpgTLVWwKJIVQoAZxMViDIhn8PEmZA5bPzaYGtWEyK5PJUJRTsxBsyRstVK8sgc1l3X2to6V4kXWZw4CILpSnmYyok9YXS/bxMrD8IM60Qic1izeRuVkx8NnhhuD4L5PtkEDmUJo5GJzJhIrvfzSG/2RCbdPpmViDWSKZHFlRJhWte2xjgeyxUkrqZWAHLFZ5qq2qzEUFWlRFwxFxZYqg0JSvS45uSajZ28D3y7yJKIOih9Mecrp63UBbDKx2flgTmnRZjKKQ7ZnJTDSTZfEllDyNtxl9O+hoaQ7xPR0CjQGXV7VTc0SS0lgRtpSo0kIrlSKbcnpKVM0dSPKOV8Fb1xXUlkRfhSF+0rtWvqUz+rEE8JnACw3ZofS1zm2DZsTnKxquwIuzbi2V99VpkUD1uT4mlx0jzuTpbn9ZxyyimnnAr/Pf0CgcvL0PRP9EMAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="preview icon"
    />
  );
};

export default PreviewIconColor;
