import { useCallback, useState } from 'react';

const useCopy = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = useCallback((content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error('Error copying content:', error);
      });
  }, []);

  return {
    isCopied,
    setIsCopied,
    handleCopyClick
  };
};

export default useCopy;
