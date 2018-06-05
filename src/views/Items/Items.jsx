import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';
import { AddAlert } from 'material-ui-icons';

import AddItemModal from './Modals/AddItem';
import EditItemModal from './Modals/EditItem';
//import DeleteItemModal from './Modals/DeleteItem';

import { RegularCard, ItemsTable, ItemGrid, Snackbar } from 'components';

import Loader from '../../Loader';

import { getAllItems, addItem, showAddItemModal, showEditItemModal, showDeleteItemModal } from '../../actions';

class Items extends Component {
    state = {
        notificationGroup: 'add',
        tr: false,
        tc: false,
    };

    componentWillMount() {
        this.props.getAllItems();
    }

    // Check if the user is super admin.
    isSuperAdmin = () => {
        return this.props.user.role.name === 'super_admin';
    };

    _showAddItemModal = () => {
        this.setState({ notificationGroup: 'add'}, () => {
            this.props.showAddItemModal(this.props.openAddItemModal);
        })
    };

    _showEditItemModal = () => {
        this.setState({ notificationGroup: 'edit'}, () => {
            this.props.showEditItemModal(this.props.openEditItemModal);
        })
    };

    _showDeleteItemModal = () => {
        this.props.showDeleteItemModal(this.props.openDeleteItemModal);
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
            if (this.state.notificationGroup === 'add') {
                return 'Item added successfully';
            } else {
                return 'Item edited successfully';
            }
        } else if (type === 'error') {
            if (this.state.notificationGroup === 'edit') {
                return 'Error Item could not be edited';
            } else {
                return 'Error Item could not be added';
            }
        }
    };

    render() {
        return (
            <div>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                        <RegularCard
                            padIt
                            cardTitle="Items"
                            cardSubtitle="This is a list of all items in the system"
                            button={ 
                                this.isSuperAdmin() && (
                                    <Button
                                        style={ styles.addItemButton }
                                        onClick={ this._showAddItemModal }>ADD ITEM</Button>
                                )
                            }
                            content={
                                <ItemsTable
                                    tableHeaderColor="primary"
                                    tableHead={['No.','Name','Unit Price', 'Whole Price', 'Date Added','Date Updated', '']}
                                    tableData={this.props.items}
                                    editItem={this._showEditItemModal}
                                />
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
                
                <AddItemModal 
                    open={this.props.openAddItemModal}
                    close={this._showAddItemModal}
                    addItem={this.props.addItem}
                    refresh={this.props.getAllItems}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <EditItemModal 
                    open={this.props.openEditItemModal}
                    close={this._showEditItemModal}
                    refresh={this.props.getAllItems}
                    successNotification={() => this.showNotification('tr')}
                    errorNotification={() => this.showNotification('tc')}
                />

                <Loader open={this.props.show_item_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { user } = state.users;
    const { items, show_item_loader, openAddItemModal, openEditItemModal, openDeleteItemModal } = state.items;

    return { user, items, show_item_loader, openAddItemModal, openEditItemModal, openDeleteItemModal };
};

const styles = {
    addItemButton: {
        color: 'white',
        backgroundColor: 'purple',
    },
};

export default connect(mapStateToProps, { 
    getAllItems, addItem, showAddItemModal, showEditItemModal, showDeleteItemModal, 
})(Items);
