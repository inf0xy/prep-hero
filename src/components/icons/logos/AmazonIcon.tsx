// type AmazonIconProps = {
//   width?: number;
//   height?: number;
// }

// const AmazonIcon: React.FC<AmazonIconProps> = ({ width, height }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width={width ? width : '48'}
//       height={height ? height : '48'}
//       viewBox="0 0 48 48"
//       id="amazon"
//     >
//       <g fill="none" fillRule="evenodd">
//         <path
//           fill="#343B45"
//           d="M25.403 25.96c-.743 1.482-2.015 2.436-3.393 2.758-.208 0-.527.105-.846.105-2.329 0-3.706-1.802-3.706-4.45 0-3.394 2.012-4.981 4.552-5.726 1.378-.317 2.97-.424 4.558-.424v1.273c0 2.437.105 4.343-1.165 6.464zm1.165-12.608c-1.377.105-2.969.21-4.558.418-2.435.322-4.87.746-6.88 1.7-3.92 1.59-6.57 4.98-6.57 9.959 0 6.257 4.024 9.433 9.113 9.433 1.693 0 3.07-.214 4.337-.528 2.018-.638 3.709-1.804 5.721-3.925 1.166 1.59 1.487 2.335 3.497 4.03.53.209 1.06.209 1.481-.105 1.273-1.062 3.5-2.97 4.663-4.03.53-.423.426-1.06.104-1.586-1.163-1.485-2.331-2.758-2.331-5.619v-9.538c0-4.026.322-7.736-2.645-10.489C30.065.85 26.25 0 23.283 0H22.01C16.612.313 10.894 2.646 9.618 9.323c-.212.85.426 1.166.85 1.27l5.932.743c.635-.107.954-.638 1.058-1.163.528-2.332 2.436-3.498 4.552-3.713h.427c1.272 0 2.65.531 3.389 1.593.847 1.27.742 2.967.742 4.452v.847z"
//         ></path>
//         <path
//           fill="#FF9A00"
//           d="M47.994 35.946v-.002c-.022-.5-.127-.881-.335-1.198l-.023-.03-.025-.032c-.212-.231-.415-.319-.635-.415-.658-.254-1.615-.39-2.766-.392-.827 0-1.739.079-2.656.28l-.003-.063-.923.308-.017.008-.522.17v.022a8.17 8.17 0 0 0-1.684.946c-.322.24-.587.56-.602 1.048a.978.978 0 0 0 .35.75 1.119 1.119 0 0 0 .861.232l.045-.002.034-.006c.452-.096 1.11-.161 1.88-.268.66-.074 1.36-.127 1.967-.127.429-.003.815.028 1.08.084a1.208 1.208 0 0 1 .328.11.955.955 0 0 1 .025.266c.006.508-.208 1.451-.505 2.372-.288.92-.638 1.843-.869 2.456a1.246 1.246 0 0 0-.093.466c-.006.246.096.545.31.743.21.197.48.276.706.276h.011c.339-.003.627-.138.875-.333 2.343-2.106 3.158-5.472 3.192-7.367l-.006-.302zm-6.945 2.92a1.645 1.645 0 0 0-.714.16c-.257.102-.52.221-.768.326l-.364.152-.474.19v.005c-5.15 2.09-10.56 3.315-15.567 3.422-.184.006-.37.006-.548.006-7.874.005-14.297-3.648-20.777-7.248a1.482 1.482 0 0 0-.685-.181c-.291 0-.59.11-.808.313a1.108 1.108 0 0 0-.344.805c-.003.392.209.754.505.988C6.587 43.087 13.253 47.994 22.22 48c.175 0 .353-.006.53-.008 5.704-.128 12.153-2.056 17.16-5.201l.03-.02a17.54 17.54 0 0 0 1.928-1.333c.384-.285.65-.731.65-1.194-.017-.822-.715-1.378-1.468-1.378z"
//         ></path>
//       </g>
//     </svg>
//   );
// };

// export default AmazonIcon;

import Image from 'next/image';

type AmazonIconProps = {
  width?: number;
  height?: number;
};

const AmazonIcon: React.FC<AmazonIconProps> = ({ width, height }) => {
  return (
    <Image
      src="/amazon.svg"
      alt="Amazon Icon"
      width={width ? width : 15}
      height={height ? height : 15}
    />
  );
};

export default AmazonIcon;
