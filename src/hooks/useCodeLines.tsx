import {
  useState,
  useEffect,
  useCallback,
  RefObject,
  Dispatch,
  SetStateAction
} from 'react';
import { CodeLine } from '@/types/dataTypes';

const useCodeLines = (
  editorRef: RefObject<HTMLDivElement>,
  setCodeErrorDetail: Dispatch<SetStateAction<string | null>>
) => {
  const [selectedElem, setSelectedElem] = useState<Element | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorEl = editorRef.current?.querySelector(
        '.monaco-mouse-cursor-text'
      );

      const handler = (event: React.MouseEvent<HTMLElement>) => {
        if (!selectedElem) {
          return;
        }
        const target = event.target as Node;

        if (
          editorEl === target ||
          editorEl!.contains(target) ||
          editorEl!.contains(target.parentNode as Node)
        ) {
          selectedElem.classList.remove('code-error-highlight');
          setSelectedElem(null);
          setCodeErrorDetail(null);
        } else {
          return;
        }
      };

      editorEl!.addEventListener('click', handler as any, true);
      return () => {
        editorEl!.removeEventListener('click', handler as any);
      };
    }
  }, [selectedElem]);

  const getCodeLines = useCallback(() => {
    const lines: CodeLine[] = [];
    if (editorRef.current) {
      const lineElems = editorRef.current.querySelectorAll(
        '.monaco-editor .view-line'
      );
      for (let node of lineElems) {
        let line = '';
        const outerSpan = node.querySelector('span');
        if (outerSpan) {
          const spans = Array.from(outerSpan.querySelectorAll('span'));
          line =
            spans && spans.length > 0
              ? spans
                  .reduce(
                    (acc, el) => (acc += el.innerText.replace(/\u00A0/g, ' ')),
                    ''
                  )
                  .trim()
              : '';
        }
        lines.push({ line, node });
      }
    }
    return lines;
  }, []);

  const handleHighLightError = useCallback(
    (codeLines: CodeLine[], codeErrorDetail: string) => {
      for (let codeLine of codeLines) {
        if (codeLine.line === codeErrorDetail) {
          codeLine.node.classList.add('code-error-highlight');
          setSelectedElem(codeLine.node);
          break;
        }
      }
    },
    []
  );

  return {
    getCodeLines,
    handleHighLightError
  };
};

export default useCodeLines;
