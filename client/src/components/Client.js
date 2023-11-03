import React, { useState } from 'react';
import axios from 'axios';

function Client() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data['status']='new';
        const req = JSON.stringify(data, null, 2);
        console.log(req);
        axios.post('https://lukaselsrode.pythonanywhere.com/add_q', req, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(function (response) {
            console.log(response);
            setIsSubmitted(true);  // Set the state to true when request is successful
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    // If isSubmitted is true, render the thank you message, otherwise render the form.
    return isSubmitted ? (
        <div>Thank you for submitting your ticket :)</div>
    ) : (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
                <br /><br />

                {/* Email Input */}
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <br /><br />

                {/* Description Textbox */}
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows="4" cols="50" required></textarea>
                <br /><br />

                {/* Submit Button */}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Client;