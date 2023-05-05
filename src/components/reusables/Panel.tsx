import React from 'react';
import className from 'classnames';

interface PanelProps {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  [rest:string]: any;
}

const Panel: React.FC<PanelProps> = ({ children, ...rest }) => {
  const classes = className(
    'w-full text-neutral',
    rest.className
  );
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Panel;
