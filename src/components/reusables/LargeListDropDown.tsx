import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Panel from './Panel';
import ChevronUp from '@/components/icons/ChevronUp';
import ChevronDown from '@/components/icons/ChevronDown';
import { useAppSelector } from '@/hooks/hooks';
import { Option } from '@/types/dataTypes';
import variables from '@/styles/variables.module.scss';
import classes from './DropDown.module.scss';

interface LargeListDropDownProps {
  options: Option[];
  onChange: (selected: Option) => void;
  value: Option[];
  defaultText: string;
  width: string;
  listName: string;
}

const LargeListDropDown: React.FC<LargeListDropDownProps> = ({
  options,
  onChange,
  value,
  defaultText,
  width,
  listName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useAppSelector((state) => state.theme);
  const divEl = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isLargePhonePortrait = useMediaQuery({ query: '(max-width: 684px)' });
  const isMediumPhonePortrait = useMediaQuery({ query: '(max-width: 554px)' });
  const isSmallPhonePortrait = useMediaQuery({ query: '(max-width: 450px)' });

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

  let position = listName === 'companies' ? 'left-[-28rem]' : '';

  if (isLargePhonePortrait) {
    if (listName === 'categories') {
      position = 'left-[-13.5rem]';
    } else if (listName === 'tags') {
      position = 'left-[-32rem]';
    } else if (listName === 'companies') {
      position = '';
    }
  }

  if (isMediumPhonePortrait) {
    if (listName === 'tags') {
      position = '';
    } else if (listName === 'companies') {
      position = 'left-[-9rem]';
    }
  }

  if (isSmallPhonePortrait) {
    if (listName === 'categories') {
      position = 'left-[-13.5rem]';
    } else if (listName === 'tags') {
      position = 'left-[-13rem]';
    } else if (listName === 'companies') {
      position = '';
    }
  }

  const renderOptions = options.map((option, index) => (
    <span
      key={option.value + index}
      className={`badge border-0 cursor-pointer text-[1.3rem] mr-3 mb-3 px-4 py-5 ${
        value && value.includes(option)
          ? classes[`tags__badge--${theme}--selected`]
          : classes[`tags__badge--${theme}`]
      }`}
      onClick={() => handleOptionClick(option)}
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
        ${
          theme === 'dark'
            ? `bg-[${variables.darkBackground100}]`
            : `bg-[${variables.lightBackground200}] shadow border`
        } flex justify-between items-center cursor-pointer font-light rounded-md
        `}
        onClick={handleToggle}
      >
        <span
          className={`px-5 font-medium ${
            theme === 'dark' ? 'text-[#b1aeb6]' : 'text-gray-500'
          }`}
        >
          {defaultText}
        </span>
        <div className={`flex items-center justify-center w-fit h-[3rem] px-1`}>
          <div className="relative w-7 h-full mr-3">
            <ChevronDown
              className={`absolute top-[25%] left-[5%] text-lg ${
                theme === 'dark' ? 'text-[#b1aeb6]' : 'text-gray-500'
              } ${
                isOpen ? classes['arrow-down_hide'] : classes['arrow-down_show']
              }`}
            />
            <ChevronUp
              className={`absolute top-[25%] left-[5%] text-lg ${
                theme === 'dark' ? 'text-[#b1aeb6]' : 'text-gray-500'
              } ${
                isOpen ? classes['arrow-up_show'] : classes['arrow-up_hide']
              }`}
            />
          </div>
        </div>
      </Panel>
      <Panel
        className={`absolute ${position} top-full px-8 pt-6 pb-5 mt-[4px] ${
          theme === 'dark' ? 'bg-[#3a3a3a]' : `bg-[#fff] shadow-lg`
        } z-50 ${
          isOpen ? classes['options_show'] : classes['options_hide']
        } rounded-md`}
        onClick={() => {}}
        style={{
          width: isSmallPhonePortrait ? '33rem' : '40rem',
          visibility: isVisible ? 'visible' : 'hidden'
        }}
      >
        {renderOptions}
      </Panel>
    </div>
  );
};

export default LargeListDropDown;
