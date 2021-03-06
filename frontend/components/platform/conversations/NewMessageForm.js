import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { API_ROOT, HEADERS } from '../../../constants/constants';

class NewMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({ conversation_id: nextProps.conversation_id });
    }

    handleChange (e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit (e) {
        e.preventDefault();
        const channelId = this.props.match.params.channelId;
        const newMessage = {
            message: {
                conversation_id: parseInt(channelId),
                user_id: this.props.currUser.id,
                username: this.props.currUser.username,
                text: this.state.text
            }
        };
        
        fetch(`${API_ROOT}/api/messages`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(newMessage)
        });
        this.setState({ text: '' });
    }

    render () {
        return (
            <div className="newMessageFormWrap">
                <form className="newMessageForm" onSubmit={this.handleSubmit}>
                    {/* <label>New Message:</label> */}
                    {/* <br /> */}
                    <input className="newMessageInput normFont"
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Say hello!"
                    />
                    {/* <input type="submit" /> */}
                </form>
            </div>
        );
    };
}

const msp = state => {
    return {
        currUser: state.session.user
    }
}

export default withRouter(connect(msp)(NewMessageForm));