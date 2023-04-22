import { useState, useEffect, useRef } from 'react';
import Panel from './Panel';
import ChevronUp from '@/components/icons/ChevronUp';
import ChevronDown from '@/components/icons/ChevronDown';
import classes from './DropDown.module.css';

type Option = {
  value: string;
  label: string;
};

interface DropDownProps {
  options: Option[];
  onChange: (selected: Option) => void;
  value: Option;
  defaultText: string;
  width: string
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

  const renderOptions = options.map((option) => (
    <div
      key={option.value}
      className={`${classes['option-item']} hover:text-white hover:bg-[#ff7230] rounded cursor-pointer p-3`}
      onClick={() => handleOptionClick(option)}
    >
      {option.label}
    </div>
  ));

  return (
    <div ref={divEl} className="relative" style={{width}}>
      <Panel
        className={`
          flex justify-between items-center cursor-pointer font-light rounded-r-md rounded-l
        `}
        onClick={handleToggle}
      >
        <span className="px-5">{value?.label || defaultText}</span>
        <div
          className={`flex items-center justify-center w-fit bg-[#e64900] h-[3rem] rounded-tr rounded-br px-1`}
        >
          <div className="relative w-7 h-full">
            <ChevronDown
              className={`absolute top-[25%] left-[5%] text-lg text-white ${
                isOpen ? classes['arrow-down_hide'] : classes['arrow-down_show']
              }`}
            />
            <ChevronUp
              className={`absolute top-[25%] left-[5%] text-lg text-white ${
                isOpen ? classes['arrow-up_show'] : classes['arrow-up_hide']
              }`}
            />
          </div>
        </div>
      </Panel>
      <Panel
        className={`absolute top-full p-3 mt-[3px] ${
          isOpen ? classes['options_show'] : classes['options_hide']
        } rounded`}
        onClick={() => {}}
      >
        {renderOptions}
      </Panel>
    </div>
  );
};

export default DropDown;
