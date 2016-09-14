import React from 'react'
import MessageList from './massage-list/message-list'
import AddMessage from './add-message/add-message'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    onClick (data) {
        fetch('//localhost:8000/bot/emit/', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ userText: data.text })
        })
        .then(response => {
            return response.text();
        })
        .then(text => {
            let messages = this.state.messages;
            var msg = JSON.parse(text);
            messages.push({
                text: msg.text
            });
            this.setState({
                messages: messages
            });
        });
    }
    render () {
        return (
            <div>
                <MessageList
                    messages={this.state.messages}
                    userId={1}
                />
                <AddMessage
                    go={(data)=> { this.onClick(data) }}
                />
            </div>
        )
    }
}