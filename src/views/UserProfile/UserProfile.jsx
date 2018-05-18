import React, { Component } from 'react';
import { Grid } from 'material-ui';
import { connect } from 'react-redux';

import {
    ProfileCard, RegularCard, Button, CustomInput, ItemGrid, UserProfileTable
} from 'components';

import AddUserModal from './Modals/AddUser';

import { getUsers, openAddUserModal, logout } from '../../actions';

import avatar from 'assets/img/faces/marc.jpg';

class UserProfile extends Component {

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

    render() {
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
                                                labelText="Email address"
                                                id="email-address"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                type="email"
                                                defaultValue={this.props.user ? this.props.user.email : ''}
                                            />
                                        </ItemGrid>
                                    </Grid>
                                    <Grid container>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="First name"
                                                id="first-name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                defaultValue={this.props.user ? this.props.user.firstname : ''}
                                            />
                                        </ItemGrid>
                                        <ItemGrid xs={12} sm={12} md={6}>
                                            <CustomInput
                                                labelText="Last name"
                                                id="last-name"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                defaultValue={this.props.user ? this.props.user.lastname : ''}
                                            />
                                        </ItemGrid>
                                    </Grid>                                    
                                </div>
                            }
                            
                            footer={
                                <Button color="primary">Update Profile</Button>
                            }
                        />
                    </ItemGrid>
                    <ItemGrid xs={12} sm={12} md={4}>
                        {
                            this.isSuperAdmin
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
                    <ItemGrid xs={12} sm={12} md={12}>
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
                </Grid>

                <AddUserModal 
                    open={this.props.open_add_user_modal}
                    close={() => this.props.openAddUserModal(false)}
                    addUserFunc={this.props.addUser}
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
};

const mapStateToProps = state => {
    const { users, user, open_add_user_modal } = state.users;
    return { users, user, open_add_user_modal };
};

export default connect(mapStateToProps, { getUsers, openAddUserModal, logout })(UserProfile);
