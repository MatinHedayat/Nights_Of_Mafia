import { createContext, useContext, useEffect, useState } from 'react';

const initialState = localStorage.getItem('day-number') || 1;
const DayNumberContext = createContext();

export default function DayNumber({ children }) {
  const [dayNumber, setDayNumber] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('day-number', dayNumber);
  }, [dayNumber]);

  return (
    <DayNumberContext.Provider value={{ dayNumber, setDayNumber }}>
      {children}
    </DayNumberContext.Provider>
  );
}

export const useDayNumber = () => useContext(DayNumberContext);
