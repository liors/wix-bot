import React from 'react';
import _ from 'lodash';
import './message-list.scss';

export default class MessageList extends React.Component {
    render() {
        return (
            <ol className='message-list'>
                {this.props.messages.map((message, index) => {
                    const messageClass = message.userId !== this.props.userId ? 'is-response' : '';
                    return (
                        <li key={`message-${index}`} className='message-item'>
                            <div className={`message ${messageClass}`}>
                                <div dangerouslySetInnerHTML={{__html: message.text}} />
                            </div>
                        </li>
                    );
                })}
            </ol>
        );
    }

}