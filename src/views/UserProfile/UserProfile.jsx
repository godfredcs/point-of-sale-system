import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import {
    ProfileCard, RegularCard, Button, CustomInput, ItemGrid, UserProfileTable
} from 'components';

import AddUserModal from './Modals/AddUser';

import { getUsers, addUser, updateUser, openAddUserModal, logout } from '../../actions';

import avatar from 'assets/img/faces/marc.jpg';

class UserProfile extends Component {
    state = { 
        willChangePassword: false,
        firstname: '',
        lastname: '',
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    };

    componentDidMount() {
        this.getUsers();
    }

    // Log the user out.
    _logout = () => {
        this.props.logout();
    };

    // Render subtitle according to role.
    renderSubtitle = () => {
        if (this.props.user.role) {
            switch(this.props.user.role.name) {
                case 'super_admin':
                    return 'Super Admin';

                case 'admin':
                    return 'Admin';

                default:
                    return 'Admin';
            }
        } else {
            return 'N/A';
        }
    };

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    // Get all users in the system.
    getUsers = () => {
        if (this.isSuperAdmin()) {
            this.props.getUsers();
        }
    };

    // Function for updating the user's profile details
    updateProfile = () => {
        let update_details = {};

        const { firstname, lastname, old_password, new_password, confirm_new_password } = this.state;

        // Make sure at least a field is filled.
        if (!firstname && !lastname && (!old_password || !new_password || !confirm_new_password)) {
            return;
        }

        // Make sure all the three fields for password are filled.
        if (old_password || new_password || confirm_new_password) {
            if (!old_password || !new_password || !confirm_new_password) {
                return;
            }
            
            if (new_password === confirm_new_password) {
                update_details.old_password = old_password;
                update_details.password = new_password;
            }
        }

        if (firstname) {
            update_details.firstname = firstname;
        }

        if (lastname) {
            update_details.lastname = lastname;
        }

        // Check if the object is not empty.
        if (Object.keys(update_details).length) {
            update_details.email = this.props.user.email;

            this.props.updateUser(this.props.user.id, update_details);
        }
    };

    render() {
        const { user } = this.props;

        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={8}>
                        <RegularCard
                            cardTitle="Edit Profile"
                            cardSubtitle="Complete your profile"
                            content={
                                <div>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={12}>
                                            <CustomInput
                                                disabled
                                                labelText="Email address"
                                                id="email-address"
                                                formControlProps={{ fullWidth: true }}
                                                type="email"
                                                defaultValue={ user ? user.email : '' }
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Firstname"
                                                id="firstname"
                                                formControlProps={{ fullWidth: true }}
                                                defaultValue={ user ? user.firstname : '' }
                                                value={this.state.firstname}
                                                onChange={event => this.setState({ firstname: event.target.value })}
                                            />
                                        </ItemGrid>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Lastname"
                                                id="lastname"
                                                formControlProps={{ fullWidth: true }}
                                                defaultValue={ user ? user.lastname : '' }
                                                value={this.state.lastname}
                                                onChange={event => this.setState({ lastname: event.target.value })}
                                            />
                                        </ItemGrid>
                                    </Grid>

                                    <div>
                                        {
                                            this.state.willChangePassword
                                            ? <div>
                                                <Grid container>
                                                    <ItemGrid xs={12} sm={12} md={12}>
                                                        <CustomInput
                                                            type="password" 
                                                            labelText="Old Password"
                                                            id="oldPassword"
                                                            formControlProps={{ fullWidth: true }}
                                                            value={this.state.old_password}
                                                            onChange={event => this.setState({ old_password: event.target.value })}
                                                        />
                                                    </ItemGrid>
                                                </Grid>
                                                <Grid container>
                                                    <ItemGrid xs={12} sm={12} md={6}>
                                                        <CustomInput
                                                            type="password" 
                                                            labelText="New Password"
                                                            id="newPassword"
                                                            formControlProps={{ fullWidth: true }}
                                                            value={this.state.new_password}
                                                            onChange={event => this.setState({ new_password: event.target.value })}
                                                        />
                                                    </ItemGrid>
                                                    <ItemGrid xs={12} sm={12} md={6}>
                                                        <CustomInput
                                                            type="password"
                                                            labelText="Confirm New Password"
                                                            id="confirmNewPassword"
                                                            formControlProps={{ fullWidth: true }}
                                                            value={this.state.confirm_new_password}
                                                            onChange={event => this.setState({ confirm_new_password: event.target.value })}
                                                        />
                                                    </ItemGrid>
                                                </Grid>
                                            </div>
                                            : null
                                        }
                                    </div>                                 
                                </div>
                            }
                            
                            footer={
                                <div style={ styles.footerButtons }>
                                    <Button color="primary" onClick={ this.updateProfile }>
                                        Update Profile
                                    </Button>

                                    <Button color="danger" onClick={() => this.setState({ willChangePassword: !this.state.willChangePassword })}>
                                        { !this.state.willChangePassword ? 'Change Password' : 'Cancel' }
                                    </Button>
                                </div>
                            }
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                        {
                            this.isSuperAdmin()
                                ? <div style={ styles.centerItems }>
                                    <Button color="primary" round onClick={() => this.props.openAddUserModal(true)}>
                                        Add User
                                    </Button>
                                </div>
                                : null
                        }

                        <ProfileCard
                            avatar={avatar}
                            subtitle={this.renderSubtitle()}
                            title={this.props.user ? `${this.props.user.firstname} ${this.props.user.lastname}` : ''}
                            footer={
                                <Button color="primary" round onClick={this._logout}>Logout</Button>
                            }
                        />
                    </ItemGrid>
                </Grid>
                <Grid>
                    {
                        this.isSuperAdmin()
                            ? <ItemGrid xs={12} sm={12} md={12}>
                                <RegularCard
                                    cardTitle="Users"
                                    cardSubtitle="List of users added to the system"
                                    content={
                                        <UserProfileTable 
                                            tableHeaderColor="primary"
                                            tableHead={['No.','Firstname','Lastname', 'Email', 'Role', 'Date Added','Date Updated', '']}
                                            tableData={this.props.users}
                                            editItem={this._showEditItemModal}
                                        />
                                    }
                                />
                            </ItemGrid>
                            : null
                    }
                </Grid>

                <AddUserModal 
                    open={this.props.open_add_user_modal}
                    close={() => this.props.openAddUserModal(false)}
                    addUser={this.props.addUser}
                    refresh={this.props.getUsers}
                />
            </div>
        );
    }
}

const styles = {
    centerItems: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFf',
        marginBottom: 30,
    },
    footerButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
};

const mapStateToProps = state => {
    const { users, user, open_add_user_modal } = state.users;
    return { users, user, open_add_user_modal };
};

export default connect(mapStateToProps, { getUsers, addUser, updateUser, openAddUserModal, logout })(UserProfile);
