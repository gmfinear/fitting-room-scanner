import React from 'react';
import Cancel from './Cancel';
import Logger from '../PiWik';

export default class HelpInfo extends React.Component {
    state = {
        messagetop: "You got it!", 
        messagebottom: "We'll let a salesperson know to head your way.",
        cancelHidden: false,
        cancelButtonMessage: "Cancel Help Request"
    }

    handleCancel = () => {
        axios.post('https://onesignal.com/api/v1/notifications?included_segments=["include_player_ids"]' , 
        {
            "app_id": "c5e3b183-e135-453e-aebc-bdeb10251ea1",
            "contents": {"en": `CANCELLED: Dressing room 1 requests help.`},
            // "include_player_ids": ["All"]
            "include_player_ids": ["0b3fc7c2-d2d6-46e8-8735-3b1c3804188e"]
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.ONE_SIGNAL_API_KEY
        }}).then(function () {
            Logger.info({
                source: 'user',
                type: 'usage',
                description: 'CANCELLED: Help request'
            })
            this.setState(() => ({
                messagetop: "Request for help cancelled.",
                messagebottom: "Let us know if you change your mind.",
                cancelHidden: true
            }))
        }.bind(this))
    }

    render() {
        return(
            <div className='modal-message'>
                <h3 className="modal-message-h3">{this.state.messagetop}</h3>
                <p className="modal-message-p">{this.state.messagebottom}</p>
                <Cancel 
                    handleCancel={this.handleCancel}
                    cancelHidden={this.state.cancelHidden}
                    cancelButtonMessage={this.state.cancelButtonMessage}
                />
            </div>
          )
    }
}