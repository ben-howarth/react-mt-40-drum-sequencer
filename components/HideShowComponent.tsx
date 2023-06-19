import React, { useState } from 'react';

type HideShowProps = {
  children: React.ReactNode;
}

export default function HideShow({ children }: HideShowProps){
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>Toggle</button>
      {isVisible && children}
    </div>
  );
};
