import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

import { editItem } from '../../../actions';

class EditItem extends Component {
    state = {
        id: '',
        name: '',
        unit_price: '',
        whole_price: '',
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

    _setItemName = event => {
        this.setState({ name: event.target.value });
    };

    _setUnitPrice = event => {
        this.setState({ unit_price: event.target.value });
    };

    _setWholePrice = event => {
        this.setState({ whole_price: event.target.value });
    };

    _editItem = () => {
        const 
            id = this.props.edit_item.id,
            name = this.state.name || this.props.edit_item.name,
            unit_price = this.state.unit_price || this.props.edit_item.unit_price,
            whole_price = this.state.whole_price || this.props.edit_item.whole_price;

        if (id && name && Number(unit_price) && (Number(whole_price) || Number(whole_price) === 0)) {
            this.props.editItem(id, {name, unit_price, whole_price}, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, edit_item } = this.props;
        return (
            <Modal
                aria-labelledby="Edit Item"
                aria-describedby="Modal for editing item"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="EDIT ITEM"
                                cardSubtitle="Edit the form below to edit the selected item"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setItemName }
                                                    defaultValue={ edit_item.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Unit price"
                                                    id="unit-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setUnitPrice }
                                                    defaultValue={ edit_item.unit_price }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setWholePrice }
                                                    defaultValue={ edit_item.whole_price }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editItem}>Edit</Button>
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

const mapStateToProps = state => {
    const { edit_item } = state.items;
    return { edit_item };
};

const EditModalWrapped = withStyles(styles)(EditItem);

export default connect(mapStateToProps, { editItem })(EditModalWrapped);
