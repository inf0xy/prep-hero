import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

interface EditorPreviewProps {
  value: string;
  className?: string;
  extraStyle?: object;
}

const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
);

const EditorPreview: React.FC<EditorPreviewProps> = ({
  value,
  className,
  extraStyle
}) => {
  return (
    <EditerMarkdown source={value} className={className} style={extraStyle} />
  );
};

export default EditorPreview;
