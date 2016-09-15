import React from 'react';
import _ from 'lodash';

export default class Images extends React.Component {
    getLink (src) {
        return 'https://static.wixstatic.com/media/' + src;
    }
    render() {
        return (
            <ol>
                {this.props.links.map((link, index) => {
                    return (
                        <li key={`message-${index}`}>
                            <div>
                                <img width="30" height="30" src={this.getLink(link.src)}/>
                            </div>
                        </li>
                    );
                })}
            </ol>
        );
    }

}