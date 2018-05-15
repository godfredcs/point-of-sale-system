import React, { Component } from 'react';
import { Grid, Button } from 'material-ui';
import { connect } from 'react-redux';

import AddItemModal from './Modals/AddItem';
import EditItemModal from './Modals/EditItem';
//import DeleteItemModal from './Modals/DeleteItem';

import { RegularCard, ItemsTable, ItemGrid } from 'components';

import Loader from '../../Loader';

import { getAllItems, addItem, showAddItemModal, showEditItemModal, showDeleteItemModal } from '../../actions';

class Items extends Component {
    componentWillMount() {
        this.props.getAllItems();
    }

    _showAddItemModal = () => {
        this.props.showAddItemModal(this.props.openAddItemModal);
    };

    _showEditItemModal = () => {
        this.props.showEditItemModal(this.props.openEditItemModal);
    };

    _showDeleteItemModal = () => {
        this.props.showDeleteItemModal(this.props.openDeleteItemModal);
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
                                <Button
                                    style={ styles.addItemButton }
                                    onClick={ this._showAddItemModal }>ADD ITEM</Button>
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

                <AddItemModal 
                    open={this.props.openAddItemModal}
                    close={this._showAddItemModal}
                    addItemFunc={this.props.addItem}
                    refresh={this.props.getAllItems}
                />

                <EditItemModal 
                    open={this.props.openEditItemModal}
                    close={this._showEditItemModal}
                    refresh={this.props.getAllItems}
                />

                <Loader open={this.props.show_item_loader} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { items, show_item_loader, openAddItemModal, openEditItemModal, openDeleteItemModal } = state.items;
    return { items, show_item_loader, openAddItemModal, openEditItemModal, openDeleteItemModal };
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
