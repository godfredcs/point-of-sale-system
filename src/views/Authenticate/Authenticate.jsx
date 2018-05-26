import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import { RegularCard, Button, CustomInput, ItemGrid, Snackbar } from 'components';

import { emailChanged, passwordChanged, login } from '../../actions';

class Authenticate extends Component {
    state = {
        tr: false,
        tc: false,
    };

    _onChangeEmail = event => {
        this.props.emailChanged(event.target.value);
    };

    _onChangePassword = event => {
        this.props.passwordChanged(event.target.value);
    };

    _onClick = () => {
        const { email, password } = this.props;

        if (!email || !password || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            this.showNotification('tc')
            return;
        }

        this.props.login({ email, password }, this._clearCredentials);
    };

    // Callback function to clear user's credentials after successful login.
    _clearCredentials = () => {
        this.props.emailChanged('');
        this.props.passwordChanged('');
    };

    showNotification(place) {
        var x = [];
        x[place] = true;
        this.setState(x);

        setTimeout(function() {
            x[place] = false;
            this.setState(x);
        }.bind(this), 3000);
    }

    notificationMessage = type => {
        if (type === 'success') {
            return 'Sale added successfully';
        } else {
            return 'Error Could not log user in';
        }
    };

    render() {
        return (
            <div>
                <Grid container justify="center" alignItems="center" style={styles.container}>
                    <ItemGrid xs={12} sm={4} md={4}>
                        <RegularCard
                            cardTitle="LOG IN"
                            cardSubtitle="Log in to your account"
                            style={styles.container}
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Email address"
                                                id="email-address"
                                                formControlProps={{ fullWidth: true }}
                                                type="email"
                                                onChange={this._onChangeEmail}
                                                defaultValue={this.props.email}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                labelText="Password"
                                                id="password"
                                                formControlProps={{ fullWidth: true }}
                                                type="password"
                                                onChange={this._onChangePassword}
                                                defaultValue={this.props.password}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                </div>
                            }
                            
                            footer={
                                <Button color="primary" onClick={this._onClick}>Log in</Button>
                            }
                        />
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tr"
                                    color="success"
                                    icon={AddAlert}
                                    message={this.notificationMessage('success')}
                                    open={this.state.tr}
                                    closeNotification={() => this.setState({'tr': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>

                <Grid container justify='center'>
                    <ItemGrid xs={12} sm={12} md={10} lg={8}>
                        <Grid container>
                            <ItemGrid xs={12} sm={12} md={4}>
                                <Snackbar
                                    place="tc"
                                    color="danger"
                                    icon={AddAlert}
                                    message={this.notificationMessage('error')}
                                    open={this.state.tc}
                                    closeNotification={() => this.setState({'tc': false})}
                                    close
                                />
                            </ItemGrid>
                        </Grid>
                    </ItemGrid>
                </Grid>
            </div>
        );
    }
}

const styles = {
    container: {
        paddingTop: '50px',
    }
};

const mapStateToProps = state => {
    const { email, password } = state.users;

    return { email, password }; 
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, login })(Authenticate);