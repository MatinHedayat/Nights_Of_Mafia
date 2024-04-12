import { Route, Routes } from 'react-router-dom';
import {
  Launcher,
  AddPlayers,
  SelectingRoles,
  RandomizeRoles,
  Talking,
  Voting,
  VotingLoading,
  Night,
  NightLoading,
  NightResult,
  Result,
} from './pages/index.js';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Launcher />} />
        <Route path='/add-players' element={<AddPlayers />} />
        <Route path='/selecting-roles' element={<SelectingRoles />} />
        <Route path='/randomize-roles' element={<RandomizeRoles />} />
        <Route path='/talking' element={<Talking />} />
        <Route path='/voting' element={<Voting />} />
        <Route path='/voting-loading' element={<VotingLoading />} />
        <Route path='/night' element={<Night />} />
        <Route path='/night-loading' element={<NightLoading />} />
        <Route path='/night-result' element={<NightResult />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </>
  );
}
