import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Client from './components/Client';
import TicketList from './components/Admin';
import TicketRespond from './components/TicketRespond';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<Client />} />
        <Route path="/" element={<Client />} />
        <Route path="/admin" element={<TicketList />} />
        <Route path="/ticket-response" element={<TicketRespond />}/>
      </Routes>
    </Router>
  );
}

export default App;