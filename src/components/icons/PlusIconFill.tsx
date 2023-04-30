import Image from 'next/image';

type PlusIconFillProps = {
  width?: number;
  height?: number;
};

const PlusIconFill: React.FC<PlusIconFillProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src={
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACt0lEQVR4nO2ay27TUBCG/xWXBahI0LKD56BIbCieCQ3pphItz4Ba8RZQFiCQEFseASjQN6gQS0STtFJE8ZkUCF1TgjCayA0VsR1f44s60qyS2PNl/jOeOcfAsVXUPt/EOcNYMIw1w1gXRlMI+0I4cH1fGFv62eA7NTQ6DUyhCNYmnDSEO8LYMITfwnCiuP7GEN4axrJeC5O23UWcFsY9YZiowfs6wTaE1c41nJoIhDDYMHZSAxj1bWPBygxAUy+MxxkC/C+7F5r5VCH26pgRwodJQcghDON9dw7TqUB0LVzWdE8aQv6tnbbGkAhCCBcGZTQvCB5mZudrDRdjQWj1yENOEiCzWCXaEJ7lHbyMyuxJ5BKbe9DskxnCjfBlltDKO2Dx9+1QD033iZ13sE5gVhgrYbJh5x2ojPcvgQvfbQDzDtIJlRULS0Gy2kj7hnYNVwxjNnUQwhv/eSJGKz7Oj/xJ6YIw+j3C2VFZMRaykEBWIMJwuox5r/XxsGwghvHAKyPrZQMRxsvRhU5olxCk6VWxfpQNxDC+eWXkIEmJRUxLWJp/pgqiwcQGIVxNF4SrI61W2UCEsVXd8msYa6UDIdyvbovSaWCqZE3jL8+m0b3ZuwxuOJuwxDo+133tCeHKazkLCWThNuF2JUbdj4s44QsyyAphtQCBOoGyItwNhBhmpQDbpOLnhHboHUc9nyhkJhh/bAvXQ0EckdjTAmbjUSSIQ4npxnFhskHYHLvAfbMyj/NFOVbYq2MGiQ96MhqDQ8qpJTVcSgQxhJnDdB4yM4RNPWxCFoehWjkmBPI807N3PZ/IWGrNyCU2rrkVbUVbhRQBdvWJncsbEAMgC0vu+yX9yGuA0dcuVhvA2KU1bdPZwCbUdRvTEF7pPC2M3vClGkbPED7peKqTnQ5F32/hTOqBHBuKYX8BDr4Hkf5sOnQAAAAASUVORK5CYII='
      }
      alt="plus-icon"
      width={width}
      height={height}
    />
  );
};

export default PlusIconFill;
