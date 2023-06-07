import Image from 'next/image';

type CompletedTodoIconProps = {
  width?: number;
  height?: number;
};

const CompletedTodoIcon: React.FC<CompletedTodoIconProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA2ElEQVR4nO3WvQnCUBiF4a/R1glsXMEdYqHgNGpllW8Va51BcQMdQNxB7V65EBBC5MYiuYmcB1IG3psfOGYiIr0BDIEdcAEm1sP4Ax83YGQ9jQ+ewNi6BpgCyxrxM+saIAMeReQWGAD7UvwLWFTd7+5nd6fB6xQ7wL0Ue/3lyTccT7hiB9iUgn/6bJIfIABWFfHhs5lbRHjFTcbneX6MNVQdolZ85wDr4p/IUrfI30BbKBG0hVqCtpBrC7m2kGkLiXyjLZQK2kItQVvItYVcW8i0hURERKwtbzvTDWZ/xqPBAAAAAElFTkSuQmCC"
      width={width ? width : 20}
      height={height ? height : 20}
      alt="complted-todo-icon"
    />
  );
};

export default CompletedTodoIcon;