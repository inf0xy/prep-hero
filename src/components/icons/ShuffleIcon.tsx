import Image from 'next/image';

type ShuffleIconProps = {
  width: number;
  height: number;
};

const ShuffleIcon: React.FC<ShuffleIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFJklEQVR4nO1aaYgcRRSuaFx3+72ZSSIeBO+oCIIaxQsVvJDoH0WCf0TwIh6geKBiQPSHF3gEf6gowuruvNfrgKD+0CjqqpgfGrwVD9SYhWRdt6t61mi8Ylpe78za09Pdc+3sJNP9Qf3prq6q91W9o95rpTJkyJAhQ4YMGfoA3j1qD004qgk/dQjOU2mDM5o71TB6lfaHY1vnqzTB2HhmgABPE/6pybpQpZUAI41wu2vDuSq1BLBPwu8uwzkqtQRwhYQinJ04gFdSe5apsDSuqV0Um4bVoKxPM1waS4BPAmwTkiIH0QzHaMapxAFmBykbwi81Y9FhuKU8kj9i4V1d7jTNcL8hfMMwbm245hAJv9i5o6IIuK2lgWrb54bwhi2vKKtbgm8bgf00wb2GcLKDdVa9wzV1E5jS4MGacKNmMLGNcGfiwAzTLsPN3rhaPF+CT47sD5rgAfHrCQL9VVmj01h4+H7m+dw+bS/IHS4scTh3iiG8XjO8JG4mYkEfmzHruE6Fl2jOEG6OEGSrIXjGYVw9Q7kjxXZJf/H5DTboB20PHqTmE1OlfdEw3KQJNoWtriG4rJ0xPU8t0oR3asIdtULAByJ0VeAwkgjQDD/KKe9Y4Dh4JTVgCNf6gtcSsbZl4RmeCI3xs7Gty+Vd0rdxBPibUxw8RC0EpgmPNgxf1y4gd3uz32vCx0PqNC4GsLlv6wkQ4V27cKhaSDijy/Ka8K2AEDtdwosbfacJrw0J/1wrBjVMgGb8yR0pHKZ6gUmx3gzvBnTQLdv5FXH9XbZWBi29XGvjdD0ODuVPDqjN5jIVDle9RLmUXya7EAhCNkggE+7nvar2luAqsPgPxaa0M6dmvM4QPtZVg9fqHV0T/lMVTqLHcB/D8GCApHLPjm23oBnuC7pH8d3Vd+6YdYJm/HuOoCJerfoN3uwR/yJgmd+rqoIm/ChAzuuNXN1ui+nRoZOCqmAYbpTn/8f2MLPL6G23UKPrDL+JldZFPN0wPGkIz1D9Dq9OFXC8b498HMJGT67RKm0wDA/VqEJCgNSX8EKBj2Z8OxWq4DCu1gwvarZWVQKkueuu3ANUP8Nla+Wc7hNOyDND+HBAFfrXDXpPq72kXhe4qa2X5xMlNWQYvun7QEhLMjMmFA6rQt+FwmWyTpSkZVVASZqG+xjGR/vyMuQOF5ZIIjKg5+9HXYdFFTTDdwGDuFE8RTtzOpy7ShOuc0aHDlS9xIQIRfhmICFiknZWkhnBk2IIx1pNiEhxp6epsGA2yBC+FkyJmSJepBpAssuhZCi1khipL4/3gISynV/hV4pqF3Jrs98bgqdqSYAN0zy0vN3i6IKR4I2rxZLt8QuQtYu4q6VxPLXIMDwbyuk7mnBNlP1opjrcVRImZnV9jSH4NnR8t3dSGDGEd2vGf0NZ4s/cYu6KOAOZVB6ft9qAV1IDEtW5lLvSEL5gGH6tm4zxE7doHd/pXNq2LjCEW+rHB1eMpJAhbrZalE38P6ARCdM8tFxSVX79LKL5CwlXfeon0FJlns/iaKXGsK7GQ0SWvuS01G9GFAlTJeuAeS6Pw1diwcX6qy5BNkgySs1UgJto9XbJMBwrvroxg34pWoKWkma8Q0phagEhp8u14SxD+IhmeEdOXSvC+3nJuPSbV1IDkqeLarID3fwBohOY0tKClL19u9RAePmNRvUrNFurEoTf0a5X2u0JSIXwcQSkRvgoAlIl/Nw/RWkxePGpN3hZ0mxuES+J7JQhQ4YMGTJkyKBm8R+5TQXz4BVQlwAAAABJRU5ErkJggg=="
      width={width}
      height={height}
      alt="shuffle-icon"
    />
  );
};

export default ShuffleIcon;
