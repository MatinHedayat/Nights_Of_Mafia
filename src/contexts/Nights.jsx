import { createContext, useContext, useEffect, useState } from 'react';

const initialState = JSON.parse(localStorage.getItem('nights')) || [];
const NightsContext = createContext();

export default function Nights({ children }) {
  const [nights, setNights] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('nights', JSON.stringify(nights));
  }, [nights]);

  return (
    <NightsContext.Provider value={{ nights, setNights }}>
      {children}
    </NightsContext.Provider>
  );
}

export const useNights = () => useContext(NightsContext);
