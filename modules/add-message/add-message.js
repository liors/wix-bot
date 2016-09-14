import React from 'react';
import './add-message.scss';

export default class Message extends React.Component {
    handleKeyPress(ev) {
        if (ev.which === 13) {
            const trimmedMessage = this.refs.text.value.trim();

            if (trimmedMessage) {
                this.props.go({
                    text: trimmedMessage,
                    userId: this.props.userId
                });
                this.refs.text.value = '';
            }

            ev.preventDefault();
        }
    }

    render() {
        return (
            <div className='message-entry-box'>
               <textarea
                       ref="text"
                       name='message'
                       placeholder='Enter a message...'
                       onKeyPress={this.handleKeyPress.bind(this)}/>
            </div>
        );
    }
}