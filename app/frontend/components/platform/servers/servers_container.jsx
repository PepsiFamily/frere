import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchServers } from '../../../actions/servers_actions';
import { receiveCurrentServerId } from '../../../actions/ui_actions';
import Servers from './servers';

const msp = ({ session, entities: { users, servers } }) => (
    {
        currentUser: users[session.id],
        servers: servers
    }
);

const mdp = (dispatch) => (
    {
        fetchServers: () => dispatch(fetchServers()),
        receiveCurrentServerId: (serverId) => dispatch(receiveCurrentServerId(serverId))
    }
);
// server component itself handles the 
// updating of currentServerId in ui slice of state

export default withRouter(connect(msp, mdp)(Servers));