import { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import Panel from './Panel';
import ChevronUp from '@/components/icons/ChevronUp';
import ChevronDown from '@/components/icons/ChevronDown';
import { useAppSelector } from '@/hooks/hooks';
import { Option } from '@/types/dataTypes';
import classes from './DropDown.module.scss';
import variables from '@/styles/variables.module.scss';

interface DropDownProps {
  options: Option[];
  onChange: (selected: Option) => void;
  value: Option;
  defaultText: string;
  width: string;
}

const DropDown: React.FC<DropDownProps> = ({
  options,
  onChange,
  value,
  defaultText,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement | null>(null);
  const { theme } = useAppSelector((state) => state.theme);

  const transition = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useEffect(() => {
    const handler = (event: React.MouseEvent<HTMLElement>) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler as any, true);
    return () => {
      document.removeEventListener('click', handler as any);
    };
  }, []);

  const handleOptionClick: (selected: Option) => void = (selectedOption) => {
    setIsOpen(false);
    onChange(selectedOption);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const renderOptions = options.map((option, index) => (
    <div
      key={option.value + index}
      className={`${classes['option-item']} ${
        theme === 'dark' ? 'text-white hover:bg-[#656565]' : 'text-gray-500 hover:bg-[#e7e7e7]'
      }  rounded-md cursor-pointer p-3`}
      onClick={() => handleOptionClick(option)}
    >
      {option.label}
    </div>
  ));

  return (
    <div
      ref={divEl}
      className="relative text-[1.4rem] font-medium"
      style={{ width }}
    >
      <Panel
        className={`
        ${
          theme === 'dark'
            ? `bg-[${variables.darkBackground100}]`
            : `bg-[${variables.lightBackground200}] shadow border`
        } flex justify-between items-center cursor-pointer font-light rounded-md
        `}
        onClick={handleToggle}
      >
        <span
          className={`px-5 font-medium text-gray-200 ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-500'
          }`}
        >
          {defaultText}
        </span>
        <div className={`flex items-center justify-center w-fit h-[3rem] px-1`}>
          <div className="relative w-7 h-full mr-3">
            <ChevronDown
              className={`absolute top-[25%] left-[5%] text-lg ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-500'
              } ${
                isOpen ? classes['arrow-down_hide'] : classes['arrow-down_show']
              }`}
            />
            <ChevronUp
              className={`absolute top-[25%] left-[5%] text-lg ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-500'
              } ${
                isOpen ? classes['arrow-up_show'] : classes['arrow-up_hide']
              }`}
            />
          </div>
        </div>
      </Panel>
      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <Panel
              className={`absolute top-full p-3 mt-[4px] z-50 rounded-md ${
                theme === 'dark' ? 'bg-[#3a3a3a]' : `bg-white shadow-lg`
              }`}
              onClick={() => {}}
            >
              {renderOptions}
            </Panel>
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default DropDown;
