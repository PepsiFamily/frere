import React from 'react';
import { Route, Redirect, Switch, Link, HashRouter} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import PageNotFound from './404/page_not_found';
import SplashContainer from './splash/splash_container';
import LogInContainer from './session_form/login_container';
import SignUpContainer from './session_form/signup_container';
import PlatformContainer from './platform/platform_container';
import ConversationsList from '../components/platform/conversations/ConversationsList';
import Modal from './platform/modal/modal';

const App = () => (
    <div>
        <Modal />
        <Switch>
            <AuthRoute exact path="/login" component={LogInContainer} />
            <AuthRoute exact path="/signup" component={SignUpContainer} />
            <Route exact path="/" component={SplashContainer} />

            {/* redirect user back to home server/channel if */}
            {/* bad URL && logged_in? */}
            <ProtectedRoute path="/channels/:serverId/:channelId" component={PlatformContainer} />
            {/* <ProtectedRoute path="/channels/:serverId/:channelId" component={ConversationsList} /> */}
            <Route component={PageNotFound} />
        </Switch>
    </div>
);

export default App;