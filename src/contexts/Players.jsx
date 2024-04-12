import roleGroupType from '../functions/roleGroupType';
import haveRoleAction from '../functions/haveRoleAction';
import roleSortID from '../functions/roleSortID';
import {
  ADD_PLAYER,
  ADD_PLAYERS_ROLE,
  UPDATE_PLAYERS,
  REMOVE_PLAYER,
  REMOVE_ALL_PLAYERS,
  EDIT_PLAYER,
} from '../data/actionsType';

import { createContext, useContext, useEffect, useReducer } from 'react';

const PlayersContext = createContext();
const initialState = JSON.parse(localStorage.getItem('players')) || [];

const reducerFunc = (players, { type, payload }) => {
  switch (type) {
    case ADD_PLAYER:
      return [...players, payload];

    case EDIT_PLAYER:
      return players.map((player) =>
        player.id === payload.id ? { ...player, name: payload.name } : player
      );

    case ADD_PLAYERS_ROLE:
      return players.map((player, index) => ({
        ...player,
        role: payload.selectedRoles[payload.randomNumbers[index]],
      }));

    case UPDATE_PLAYERS:
      return players.map((player) => ({
        ...player,
        groupType: roleGroupType(player.role),
        hasAction: haveRoleAction(player.role),
        sortId: roleSortID(player.role),
      }));

    case REMOVE_PLAYER:
      return players.filter((player) => player.id !== payload);

    case REMOVE_ALL_PLAYERS:
      return [];

    default:
      break;
  }
};

export default function Players({ children }) {
  const [players, dispatch] = useReducer(reducerFunc, initialState);
  // console.log(players);

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
  }, [players]);

  return (
    <PlayersContext.Provider value={{ players, dispatch }}>
      {children}
    </PlayersContext.Provider>
  );
}

export const usePlayers = () => useContext(PlayersContext);
