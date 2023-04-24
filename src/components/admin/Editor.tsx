import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react';
// import MarkdownEditor from '@uiw/react-markdown-editor';
import MarkdownEditor from '@uiw/react-md-editor'

interface EditorProps {
  // onChange: (value: string) => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

// const Editor: React.FC<EditorProps> = ({ onChange }) => {
//   const [value, setValue] = useState('');

// const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//   setValue(e.target.value);
//   onChange(e.target.value);
// };
// const handleChange = (value: string, viewUpdate: any) => {
// setValue(e.target.value);
// onChange(e.target.value);
//   console.log(value);
// };
// onChange?(value: string, viewUpdate: ViewUpdate): void;
// return <MarkdownEditor value={value} onChange={handleChange} />;
// <div>
//   <MarkdownEditor value={markdown} onChange={handleChange} />
//   <div>
//     <h2>Preview:</h2>
//     <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
//   </div>
// </div>;
// };

const Editor: React.FC<EditorProps> = ({ value, setValue }) => {
  return (
    <MarkdownEditor
      value={value}
      onChange={(value) => {
        setValue(value!);
      }}
    />
  );
};

export default Editor;
