import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Forum from './pages/Forum';
import Join from './pages/Join';
import ServerPage from './pages/Server';
import Sponsor from './pages/Sponsor';
import Guide from './pages/Guide';
import Tactics from './pages/Tactics';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Links from './pages/Links';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Wiki from './pages/Wiki';
import WikiWeapons from './pages/wiki/Weapons';
import WikiClasses from './pages/wiki/Classes';
import WikiVehicles from './pages/wiki/Vehicles';
import WikiMaps from './pages/wiki/Maps';
import WikiFactions from './pages/wiki/Factions';
import WikiModes from './pages/wiki/Modes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/join" element={<Join />} />
        <Route path="/server" element={<ServerPage />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/tactics" element={<Tactics />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/links" element={<Links />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/wiki/weapons" element={<WikiWeapons />} />
        <Route path="/wiki/classes" element={<WikiClasses />} />
        <Route path="/wiki/vehicles" element={<WikiVehicles />} />
        <Route path="/wiki/maps" element={<WikiMaps />} />
        <Route path="/wiki/factions" element={<WikiFactions />} />
        <Route path="/wiki/modes" element={<WikiModes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
