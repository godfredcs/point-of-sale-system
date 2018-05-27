import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

class AddSale extends Component {
    state = {
        item_index: '',
        unit_quantity: 0.00,
        whole_quantity: 0.00,
    }

    calculate = type => {
        if (!this.state.item_index && this.state.item_index !== 0) {
            return () => 0.00;
        }

        let item = this.props.items[this.state.item_index];

        return () => {
            switch(type) {
                case "unit_price":
                    return Number(item.unit_price);

                case "whole_price":
                    return Number(item.whole_price);

                case "unit_amount":
                    return (Number(this.state.unit_quantity) * Number(item.unit_price)).toFixed(2);
                
                case "whole_amount":
                    return (Number(this.state.whole_quantity) * Number(item.whole_price)).toFixed(2);

                case "total_amount":
                    let unit_price = Number(this.state.unit_quantity) * Number(item.unit_price);
                    let whole_price = Number(this.state.whole_quantity) * Number(item.whole_price);

                    return (unit_price + whole_price).toFixed(2);

                default:
                    return 0.00;
            }
        }
    };

    // Function for disabling quantity input if corresponding price is 0.
    disableInput = type => {
        if (this.state.item_index || this.state.item_index === 0) {
    
            let item = this.props.items[this.state.item_index];

            if (Number(item[type]) !== 0) {
                return false;
            }
        }

        return true;
    };

    // Function for adding sales to database.
    _addSale = () => {
        const { item_index, unit_quantity, whole_quantity } = this.state;
        const { refreshSales, successNotification, errorNotification } = this.props;

        if (!item_index && item_index !== 0) {
            return;
        }

        if (!Number(unit_quantity) && !Number(whole_quantity)) {
            errorNotification && errorNotification();
            return;
        }

        let item_id = this.props.items[item_index].id;

        this.props.addSale({ item_id, unit_quantity, whole_quantity }, refreshSales, this.clear, successNotification, errorNotification);
    };

    clear = () => {
        this.setState({
            item_index: '',
            unit_quantity: 0.00,
            whole_quantity: 0.00,
        });

        this.props.close();
    }

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
                aria-labelledby="Add Sale"
                aria-describedby="Modal for adding sales"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            
                            <RegularCard
                                cardTitle="ADD SALE"
                                cardSubtitle="Fill the form below to add sale to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomSelect
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    onChange={event => this.setState({ item_index: event.target.value })}
                                                    value={this.state.item_index}
                                                    items={this.props.items}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled={this.disableInput("unit_price")}
                                                    labelText="Unit quantity"
                                                    id="unit-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ unit_quantity: event.target.value })}
                                                    defaultValue={ this.state.unit_quantity }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Unit price"
                                                    id="unit-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("unit_price")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Unit amount"
                                                    id="unit-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("unit_amount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled={this.disableInput("whole_price")}
                                                    labelText="Whole quantity"
                                                    id="whole-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ whole_quantity: event.target.value })}
                                                    defaultValue={ this.state.whole_quantity }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("whole_price")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={4} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole amount"
                                                    id="whole-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("whole_amount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Total amount"
                                                    id="total-amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("total_amount")() }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addSale}
                                    >Add</Button>
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

const AddModalWrapped = withStyles(styles)(AddSale);

export default AddModalWrapped;






