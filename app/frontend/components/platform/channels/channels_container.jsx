import React from 'react';
import { connect } from 'react-redux';
// can grab currentServer from state or url; or import receiveCurrentServerId from serveractions
import { withRouter } from 'react-router-dom';
import { fetchChannels } from '../../../actions/channel_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';
import { receiveCurrentChannelId } from '../../../actions/ui_actions';
import Channels from './channels';

const msp = ({ session, entities: { users, channels }, ui: { currServerInfo: { serverId, serverAlias }, currChannelInfo: { channelId, channelAlias } } }) => (
    {
        currentUser: users[session.id],
        // PASS CHANNELS FROM SERVER??
        channels: channels,
        currentServerId: serverId,
        currentServerName: serverAlias,
        currentChannelId: channelId,
        currentChannelName: channelAlias
    }
);

const mdp = (dispatch) => (
    {
        fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
        closeModal: () => dispatch(closeModal()),
        receiveCurrentChannelId: (channelId, alias) => dispatch(receiveCurrentChannelId(channelId, alias))
    }
);

export default withRouter(connect(msp, mdp)(Channels));