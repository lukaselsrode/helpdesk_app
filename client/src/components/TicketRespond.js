import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const TicketResponse = () => {
    const location = useLocation();
    const { status: initialStatus, description, email, name } = location.state;

    const [status, setStatus] = useState(initialStatus);
    const [response, setResponse] = useState('');

    const HandleSubmit = (e) => {
        e.preventDefault();

        console.log(`Sending email to ${email} - Dear ${name}, your issue is ${status} \n  ${response} \n Best Regards,\n IT-Services`);  
        axios.post('https://lukaselsrode.pythonanywhere.com/add_q',  {
            'name':name,
            'status':status,
            'description':description,
            'email':email
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('Data sent successfully:', res.data);
        })
        .catch(err => {
            console.error('Error sending data:', err);
        });
    };

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="ticketDescription"> Patron: {name} | Contact: {email}</label>
                <p id="ticketDescription"> Issue: {description}</p>
                
                <label htmlFor="ticketStatus">Status:</label>
                <select id="ticketStatus" name="status" value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                </select>

                <label htmlFor="response">Response:</label>
                <textarea 
                  id="response" 
                  name="response" 
                  rows="4" 
                  cols="50" 
                  value={response} 
                  onChange={e => setResponse(e.target.value)}
                />
                <button type="submit">Respond</button>
            </form>
        </div>
    );
};

export default TicketResponse;
