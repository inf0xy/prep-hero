import Image from 'next/image';

type TodoListIconProps = {
  width?: number;
  height?: number;
};

const TodoListIcon: React.FC<TodoListIconProps> = ({ width, height }) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAlUlEQVR4nO3WUQqDMBRE0SzPuKxkVmoWMhJoqejDz6ax90DAjyAzIDgpAQDwFLZX280f/Tmf75VSVklNkr98mqR8V+AY/m073xsU3q+z3RUIBQU88qQnF2izf0K5Bz6Gt70EBXJ/0YjwtdZLHgD4EWYLafiPLDTTlJi+QAvys4XEFgLwH8wWEltIbKErtpDYQgAApNAOUDZQ9xd3f1UAAAAASUVORK5CYII="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="todo-list-icon"
    />
  );
};

export default TodoListIcon;
