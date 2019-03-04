import React from 'react';
import ServerItem from './server_item_container';
import { receiveCurrentServerId } from '../../../actions/ui_actions';
import ServerModal from './server_modal';

class Servers extends React.Component {
    constructor(props) {
        super(props);
        this.defaultFocus = this.defaultFocus.bind(this);
    }

    componentDidMount() {
        this.props.fetchServers();
    }

    componentDidUpdate() {
        this.props.closeModal();
    }

    serverItems(servers) {
        const nonHome = servers.filter((server) => server.server_name !== `${this.props.currentUser.id}_@me_home`);
        // use object.values outside ?
        return nonHome.map((server) => (
            // returning nothing if server_name is _home
            
            <ServerItem
                key={server.id}
                server={server}
                receiveCurrentServerId={receiveCurrentServerId}
            />
        ));
    }

    homeServer(servers) {
        // debugger
        const home = servers.filter((server) => server.server_name === `${this.props.currentUser.id}_@me_home`);
        return home.map((server) => (
            <ServerItem
                key={server.id}
                server={server}
                receiveCurrentServerId={receiveCurrentServerId}
            />
        ));
    };

    defaultFocus(serverId) {
        if (this.props.location.pathname.slice(10) === serverId) {
            return "selectedServer";
        }
    }

    updateStoreServerId() {
        const homeServerPath = "@me";
        const currentPath = this.props.location.pathname;
        return (e) => {
            e.preventDefault();
            // USE REGEX TO ONLY CAPTURE /channels/serverId
            if (currentPath !== `/channels/${homeServerPath}`) {
                this.props.receiveCurrentServerId(homeServerPath);
                this.props.history.push(`/channels/@me`);
            }
        };
    }

    render() {
        // handle rendering by servId/chanId in component vs in app.jsx routes
        return (
            <div className="servCo_outerWrapper">
                <div className="servCo_innerWrapper">

                    {/* <ServerItem
                        key={server.id}
                        server={server}
                        receiveCurrentServerId={receiveCurrentServerId}
                    /> */}
                    <div className="serveCo_homeServerIconOuter">
                        {/* ::before in className above, on focus */}
                        {this.homeServer(Object.values(this.props.servers))}
                        {/* <div className="servCo_homeServerIconInner">
                            <a 
                                draggable="false" 
                                className="servCo_homeServerLogoLink"
                                id={this.defaultFocus('@me')}
                                href="/#/channels/@me"
                                onClick={this.updateStoreServerId()}
                            >
                                <i className="servCo_homeServerLogoIcon fas fa-compact-disc fa-2x"></i>
                            </a>
                        </div> */}
                    </div>

                    <div className="servCo_friendsOnline normFont">0 online</div>
                    <span className="servCo_topBarWrapper"></span>
                    <div className="servCo_topBarSep">{/* ::after in className */}</div>
                    

                    {/* START SERVERS HERE */}

                    {/* render server_item_container here for each server? */}
                    {/* <li>{Object.values(this.props.servers).map((server) => server.server_name)}</li> */}
                    {this.serverItems(Object.values(this.props.servers))}


                    {/* Use below block in server index item and place in UL above */}
                    {/* <div className="servCo_STARTSERVERSHERE"> */}
                        {/* <div draggable="true"> */}
                            {/* replace with next div with comment */}
                            {/* <div className={`servCo_innerListIcon${server.id}`}> */}
                            {/* <div className={`servCo_innerListIcon${server.id}`}> */}
                                {/* server & channel ids are hashed */}
                                {/* <a aria-label = {`${server.server_name}`} href={`/channels/${server.id}/${server[server.id].channels.first}`}/></a> */}
                                {/* <a aria-label="testChan" href={`/channels/${server.id}`}>
                                    <div className="servCo_serverIcon"></div>
                                </a> */}

                            {/* </div> */}
                        {/* </div> */}
                    {/* </div> */}
                    {/* END SERVERS */}

                    
                    

                    {/* START OF ADD BUTTON (MODAL) */ }
                    {/* <button className="servCo_AddServerButton lightFont">
                        <span className="servCo_AddServerText">+</span>
                    </button> */}
                    {this.props.otherForm}

                    {/* <CreateServer /> */}

                    {/* {<Modal state={{state:{modalActive: true}}}/>} */}
                    
                    <div className="servCo_DownloadButton">
                        
                    </div>
                    


                    {/* LIKE THE APP? DOWNLOAD THE REAL DISCORD HERE */ }
                </div>
            </div>
        );
    }
}

export default Servers;