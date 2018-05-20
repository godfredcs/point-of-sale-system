import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

class AddItem extends Component {
    state = {
        item_index: '',
        unit_quantity: 0.00,
        whole_quantity: 0.00,
    }

    calculate = type => {
        if (!this.state.item_index && this.state.item_index !== 0) {
            console.log("id is not set")
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
                    return Number(this.state.unit_quantity) * Number(item.unit_price);
                
                case "whole_amount":
                    return Number(this.state.whole_quantity) * Number(item.whole_price);

                case "total_amount":
                    let unit_price = Number(this.state.unit_quantity) * Number(item.unit_price);
                    let whole_price = Number(this.state.whole_quantity) * Number(item.whole_price);

                    return unit_price + whole_price;

                default:
                    return 0.00;
            }
        }
    };



    // Function for adding sales to database.
    _addSale = () => {
        const { name, unit_price } = this.state;
        this.props.addItemFunc({name, unit_price});
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
                                            <ItemGrid xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Unit quantity"
                                                    id="unit-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ unit_quantity: event.target.value })}
                                                    defaultValue={ this.state.unit_quantity }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Unit price"
                                                    id="unit-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("unit_price")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={4}>
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
                                            <ItemGrid xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    labelText="Whole quantity"
                                                    id="whole-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={event => this.setState({ whole_quantity: event.target.value })}
                                                    defaultValue={ this.state.whole_quantity }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={4}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ this.calculate("whole_price")() }
                                                />
                                            </ItemGrid>
                                            <ItemGrid xs={12} sm={12} md={4}>
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
                                        //onClick={this._addItem}
                                        onClick={()=>console.log(this.state)}
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

const AddModalWrapped = withStyles(styles)(AddItem);

export default AddModalWrapped;






