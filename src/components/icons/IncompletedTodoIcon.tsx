import Image from 'next/image';

type IncompletedTodoIconProps = {
  width?: number;
  height?: number;
};

const IncompletedTodoIcon: React.FC<IncompletedTodoIconProps> = ({
  width,
  height
}) => {
  return (
    <Image
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABGElEQVR4nO3YT0rDQBTH8bexW0/gxit4h3ah4GnUlWTxHpgexLWeQfEGegCp1Ru03X1lIGIJg2nBmIz8PpBNYMLvzR94GTMRkWIAE+AWeAaOrcDw93x7BQ6t0PDJGjiysQFOgPMdws9sbIApsGpCXgMHwF0r/AY4y42PiKeIoMfnsauARSvsyz4z33N40tNVwFUr8F7bZvACEuAiEz5tm1PrkJa4z/Du/tCVIVfETuFHB7hszsR06Czyb6BeaCCoF/ojqBcK9UKhXsjUC4mI/IKqqiYRMXf394hYunud3lkp3L3O/FTXP40Z/F5oWzPz7Q982NivVb6kbZNZgTcrpQDPbKGIuCniXihJB7YpYlnkIRYREbECfALSQ1kkbUgOywAAAABJRU5ErkJggg=="
      width={width ? width : 20}
      height={height ? height : 20}
      alt="incomplted-todo-icon"
    />
  );
};

export default IncompletedTodoIcon;
