import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [['/', 'Overview'], ['users', 'Athletes'], ['teams', 'Teams'], ['activities', 'Activities'], ['leaderboard', 'Leaderboard'], ['workouts', 'Workouts']]

function Overview() { return <section className="content-section overview"><p className="eyebrow">Mergington High / 2026 season</p><h1>Move with purpose.</h1><p className="overview-copy">OctoFit turns everyday effort into visible momentum. Check the board, find a workout, and make today's entry count.</p><div className="overview-rules"><div><strong>01</strong><span>Log what you do</span></div><div><strong>02</strong><span>Lift your team</span></div><div><strong>03</strong><span>Keep showing up</span></div></div></section> }

function App() { return <div className="app-shell"><header className="topbar"><NavLink className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit<span className="brand-sub">TRACKER</span></span></NavLink><nav>{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav></header><main><Routes><Route path="/" element={<Overview />} /><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /></Routes></main><footer>Built for consistency, not perfection.</footer></div> }

export default App
