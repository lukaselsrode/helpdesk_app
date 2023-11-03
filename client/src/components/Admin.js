import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

// Styles (CSS-in-JS format)
const styles = {
  ticketList: {
    maxHeight: '300px',
    overflowY: 'scroll',
    border: '1px solid #ccc',
    padding: '10px',
    width: '300px'
  },
  ticket: {
    borderBottom: '1px dashed #ccc',
    padding: '10px 0',
    ':lastChild': {
      borderBottom: 'none'
    }
  },
  ticketTitle: {
    fontWeight: 'bold',
    color: 'green' 
  },
  clickableTicket: {
    cursor: 'pointer'
  }
};

function useTickets() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://lukaselsrode.pythonanywhere.com/get_q')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  return data;
}

const Ticket = ({ status, description,email,name }) => {
  const navigate = useNavigate();  

  const handleClick = () => {
    navigate('/ticket-response', { state: { status, description,email,name } });
  }

  return (
    <div style={{...styles.ticket, ...styles.clickableTicket}} onClick={handleClick}>
        <div style={styles.ticketTitle}>Status: {status}</div>
        <div className="ticket-description">Description: {description}</div>
    </div>
  );
};


const TicketList = () => {
  const tickets = useTickets();  

  return (
    <div style={styles.ticketList}>
      {tickets.map((ticket, index) => (
        <Ticket key={index} status={ticket.status} description={ticket.description}  email={ticket.email} name={ticket.name} />
      ))}
    </div>
  );
};

export default TicketList;
