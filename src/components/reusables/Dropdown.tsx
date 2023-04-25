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
      className={`${classes['option-item']} text-gray-200 hover:bg-[#e64900b5] rounded-md cursor-pointer p-3`}
      onClick={() => handleOptionClick(option)}
    >
      {option.label}
    </div>
  ));

  return (
    <div ref={divEl} className="relative text-[1.4rem] font-medium" style={{ width }}>
      <Panel
        className={`
          bg-[#454545] flex justify-between items-center cursor-pointer font-light rounded-md
        `}
        onClick={handleToggle}
      >
        <span className="px-5 font-medium text-gray-200">{defaultText}</span>
        <div
          className={`flex items-center justify-center w-fit h-[3rem] px-1`}
        >
          <div className="relative w-7 h-full mr-3">
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
        className={`absolute top-full p-3 mt-[3px] bg-[#3a3a3a] z-50 ${
          isOpen ? classes['options_show'] : classes['options_hide']
        } rounded-md`}
        onClick={() => {}}
      >
        {renderOptions}
      </Panel>
    </div>
  );
};

export default DropDown;
