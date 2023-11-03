import React from 'react';

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
    fontWeight: 'bold'
  }
};

const Ticket = ({ title, description }) => (
  <div style={styles.ticket}>
    <div style={styles.ticketTitle}>{title}</div>
    <div className="ticket-description">{description}</div>
  </div>
);

const TicketList = () => {
  // Sample tickets data
  const tickets = [
    { title: 'Ticket #1', description: 'Short description for ticket #1' },
    { title: 'Ticket #2', description: 'Short description for ticket #2' }
    // Add more tickets data as needed
  ];

  return (
    <div style={styles.ticketList}>
      {tickets.map((ticket, index) => (
        <Ticket key={index} title={ticket.title} description={ticket.description} />
      ))}
    </div>
  );
};

import React from 'react';
import './TicketResponse.css';


const TicketResponse = ({id,description,status,name,email}) => {
    const HandleSubmit = (e) => {
        e.preventDefault();
        e.console.log('Email Sent to :',name,' at ',email);
    };

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <label htmlFor={id}>Ticket Description:</label>
                <p>{description}</p>
                <label htmlFor={status}>Status:</label>
                <select id="status" name="status">
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Closed</option>
                </select>
                <label htmlFor="response">Response:</label>
                <textarea id="response" name="response" rows="4" cols="50"></textarea>
                <button type="submit">Respond</button>
            </form>
        </div>
    );
};
  
export default TicketResponse(0,'I have no idea how','New','lukase','lukas.elsrode@gmail.com');
