import { useState, useEffect, useRef } from 'react';
import Panel from './Panel';
import ChevronUp from '@/components/icons/ChevronUp';
import ChevronDown from '@/components/icons/ChevronDown';
import classes from './DropDown.module.css';

type Option = {
  value: string;
  label: string;
};

interface LargeListDropDownProps {
  options: Option[];
  onChange: (selected: Option) => void;
  value: Option[];
  defaultText: string;
  width: string;
}

const LargeListDropDown: React.FC<LargeListDropDownProps> = ({
  options,
  onChange,
  value,
  defaultText,
  width
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divEl = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (event: React.MouseEvent<HTMLElement>) => {
      if (!divEl.current) {
        return;
      }
      if (!divEl.current.contains(event.target as Node)) {
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handler as any, true);
    return () => {
      document.removeEventListener('click', handler as any);
    };
  }, []);

  const handleOptionClick: (selected: Option) => void = (selectedOption) => {
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
    setIsOpen(false);
    onChange(selectedOption);
  };

  const handleToggle = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    } else {
      setIsVisible(true);
    }
    setIsOpen((prev) => !prev);
  };

  const renderOptions = options.map((option, index) => (
    <span
      key={option.value + index}
      className="badge hover:bg-[#e64900b5] border-0 cursor-pointer text-[1.3rem] mr-3 mb-3 px-4 py-5"
      onClick={() => handleOptionClick(option)}
      style={{
        backgroundColor:
          value && value.includes(option) ? '#e64900b5' : '#827a7763'
      }}
    >
      {option.label}
    </span>
  ));

  return (
    <div
      ref={divEl}
      className="relative text-[1.4rem] font-medium"
      style={{ width }}
    >
      <Panel
        className={`
          bg-[#454545] flex justify-between items-center cursor-pointer font-light rounded-md
        `}
        onClick={handleToggle}
      >
        <span className="px-5 font-medium text-gray-200">{defaultText}</span>
        <div className={`flex items-center justify-center w-fit h-[3rem] px-1`}>
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
        className={`absolute top-full px-8 pt-6 pb-5 mt-[3px] bg-[#3a3a3a] z-50 ${
          isOpen ? classes['options_show'] : classes['options_hide']
        } rounded-md`}
        onClick={() => {}}
        style={{ width: '40rem', visibility: isVisible ? 'visible' : 'hidden' }}
      >
        {renderOptions}
      </Panel>
    </div>
  );
};

export default LargeListDropDown;
