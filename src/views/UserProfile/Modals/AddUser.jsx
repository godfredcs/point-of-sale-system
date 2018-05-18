import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddItem extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: 'testing',
        role_id: 2,
    };

    _setFirstname = event => {
        this.setState({ firstname: event.target.value });
    };

    _setLastname = event => {
        this.setState({ lastname: event.target.value });
    };

    _setEmail = event => {
        this.setState({ email: event.target.value });
    };

    _setPassword = event => {
        this.setState({ password: event.target.value });
    };

    resetInput = () => {
        this.setState({ firstname: '', lastname: '', email: '', password: 'testing'});
        this.props.close();
    };

    _addUser = () => {
        const { firstname, lastname, email, password, role_id } = this.state;

        if (firstname && lastname && email && password && role_id) {
            this.props.addUser({ firstname, lastname, email, password, role_id }, this.props.refresh, this.resetInput);
        }
    };

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    
    render() {
        const { classes, open, close } = this.props;

        return (
            <Modal
                aria-labelledby="Add User"
                aria-describedby="Modal for adding users"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD USER"
                                cardSubtitle="Fill the form below to add user to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Firstname"
                                                    id="firstname"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setFirstname }
                                                    defaultValue={ this.state.firstname }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Lastname"
                                                    id="lastname"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setLastname }
                                                    defaultValue={ this.state.lastname }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Email"
                                                    id="email"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setEmail }
                                                    defaultValue={ this.state.email }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Password"
                                                    id="password"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setPassword }
                                                    defaultValue={ this.state.password }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addUser}>Add</Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4,
    },
});

const AddModalWrapped = withStyles(styles)(AddItem);

export default AddModalWrapped;






