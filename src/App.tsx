import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import Rewards from './pages/Rewards';
// import Login from './pages/Login';
// import History from './pages/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-200">
         {/* A Navbar component would go here */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards" element={<Rewards />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/history" element={<History />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App