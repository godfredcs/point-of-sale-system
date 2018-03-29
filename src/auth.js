import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import indexRoutes from 'routes/index.jsx';
import Authenticate from 'views/Authenticate/Authenticate.jsx';

class Auth extends Component {
    render() {
        return (
            this.props.isLoggedIn
                ?   <Router history={ createBrowserHistory() }>
                        <Switch>
                            {
                                indexRoutes.map((prop, key) => {
                                    return (
                                        <Route path={prop.path} component={prop.component} key={key} />
                                    );
                                })
                            }
                        </Switch>
                    </Router>
                :   <Authenticate />
        );
    }
}

const mapStateToProps = state => {
    const { isLoggedIn } = state.users;
    const { show_loader } = state.loader;

    return { isLoggedIn, show_loader };
};

export default connect(mapStateToProps)(Auth);










