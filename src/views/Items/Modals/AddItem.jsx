import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddItem extends Component {
    state = {
        name: '',
        unit_price: '',
    };

    _setItemName = event => {
        this.setState({ name: event.target.value });
    };

    _setUnitPrice = event => {
        this.setState({ unit_price: event.target.value });
    };

    _addItem = () => {
        const { name, unit_price } = this.state;

        if (name && Number(unit_price)) {
            this.props.addItemFunc({name, unit_price}, this.props.refresh, this.setState({ name: '', unit_price: ''}));
        }
    };

    getModalStyle() {
        const top = 30;
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
                aria-labelledby="Add Item"
                aria-describedby="Modal for adding items"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD ITEM"
                                cardSubtitle="Fill the form below to add item to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setItemName }
                                                    defaultValue={ this.state.name }
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
                                                    defaultValue={ this.state.unit_price }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addItem}>Add</Button>
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






