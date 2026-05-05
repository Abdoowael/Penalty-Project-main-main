import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppProviders from './providers/AppProviders';
import AdminRoute from './routes/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Players from './pages/Players';
import PlayerDetails from './pages/PlayerDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import SeizeOpportunity from './pages/SeizeOpportunity';
import AdminApplications from './pages/AdminApplications';

function App() {
  return (
    <AppProviders>
      <Router>
        <Routes>
          {/* Public Pages - no login needed */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/players" element={<Players />} />
          <Route path="/player/:id" element={<PlayerDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/seize-opportunity" element={<SeizeOpportunity />} />

          {/* Admin Only */}
          <Route element={<AdminRoute />}>
            <Route path="/register-opportunity" element={<Register />} />
            <Route path="/admin/applications" element={<AdminApplications />} />
          </Route>
        </Routes>
      </Router>
    </AppProviders>
  );
}

export default App;
