from flask import Flask,jsonify
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app) 

app.config['TESTING'] = True
app.config['DEBUG'] = True

# Hacky way of getting around making a db
global DEFAULT_Q
DEFAULT_Q = []

def cleanup_queue(queue):
    status_ord = ['new', 'In Progress', 'Resolved']
    
    def sort_by_status(ticket): 
        return status_ord.index(ticket['status'])

    def remove_lower_priority_tickets(user_tickets):
        if len(user_tickets) > 1:
            sorted_tickets = sorted(user_tickets, key=sort_by_status,reverse=True)
            for ticket in sorted_tickets[1:]:
                queue.remove(ticket)
    
    unique_emails = set(t['email'] for t in queue)
    for email in unique_emails:
        user_tickets = [ticket for ticket in queue if ticket['email'] == email]
        remove_lower_priority_tickets(user_tickets)
    return queue


@app.route('/add_q',methods=['POST'])
def add_to_queue():
    global DEFAULT_Q
    if not request.is_json:return jsonify({"message": "Request data is not JSON"}), 415
    ticket_dat = request.get_json()
    app.logger.debug(ticket_dat)
    DEFAULT_Q.append(ticket_dat)
    DEFAULT_Q = cleanup_queue(DEFAULT_Q)
    return jsonify({"message": "Data received"}), 200

@app.route('/get_q',methods=['GET'])
def get_queue():
    return DEFAULT_Q



if __name__ == '__main__':
    app.run(debug=True)