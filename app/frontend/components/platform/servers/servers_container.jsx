import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchServers } from '../../../actions/servers_actions';
import { receiveCurrentServerId } from '../../../actions/ui_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';
import Servers from './servers';

const msp = ({ session, entities: { users, servers }, ui: { currServerInfo: { serverId, serverAlias } } }) => {
    // debugger
    return {
        currentUser: users[session.id],
        servers: servers,
        currentServerId: serverId,
        currentServerName: serverAlias
    };
};

const mdp = (dispatch) => (
    {
        fetchServers: () => dispatch(fetchServers()),
        closeModal: () => dispatch(closeModal()),
        receiveCurrentServerId: (serverId, alias) => dispatch(receiveCurrentServerId(serverId, alias)),
        createServer: (server) => dispatch(createServer(server)),
        otherForm: (
            <button
                onClick={() => dispatch(openModal('createServer'))}
                className="servCo_AddServerButton lightFont"
            >
                <span className="servCo_AddServerText">+</span>
            </button>
        )
    }
);
// server component itself handles the 
// updating of currentServerId in ui slice of state

export default withRouter(connect(msp, mdp)(Servers));