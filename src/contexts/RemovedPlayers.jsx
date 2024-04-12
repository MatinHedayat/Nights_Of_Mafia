import { useEffect, useContext, useState, createContext } from 'react';

const initialValue = { mafiaTarget: '', sniperTarget: '' };
const initialState =
  JSON.parse(localStorage.getItem('removed-players')) || initialValue;

const RemovedPlayersContext = createContext();

export default function RemovedPlayers({ children }) {
  const [removedPlayers, setRemovedPlayers] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('removed-players', JSON.stringify(removedPlayers));
  }, [removedPlayers]);

  return (
    <RemovedPlayersContext.Provider
      value={{ removedPlayers, setRemovedPlayers }}
    >
      {children}
    </RemovedPlayersContext.Provider>
  );
}

export const useRemovedPlayers = () => useContext(RemovedPlayersContext);
