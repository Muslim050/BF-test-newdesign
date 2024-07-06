// ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState(localStorage.getItem('selectedBgColor') || '#090E35');
  const [textColor, setTextColor] = useState('#383737');

  useEffect(() => {
    const getContrastColor = (hexColor) => {
      const rgb = parseInt(hexColor.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#ffffff';
    };

    const contrastTextColor = getContrastColor(bgColor);
    setTextColor(contrastTextColor);
    localStorage.setItem('selectedBgColor', bgColor);
  }, [bgColor]);

  return (
    <ThemeContext.Provider value={{ bgColor, setBgColor, textColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
// const { textColor } = React.useContext(ThemeContext);
// ${textColor}