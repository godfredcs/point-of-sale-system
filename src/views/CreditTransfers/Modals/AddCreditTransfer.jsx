import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class AddCreditTransfer extends Component {
    state = {
        number: '',
        amount: '',
    };

    _setNumber = event => {
        this.setState({ number: event.target.value });
    };

    _setAmount = event => {
        this.setState({ amount: event.target.value });
    };

    _addCreditTransfer = () => {
        const { number, amount } = this.state;

        if ((number.length === 10) && Number(amount)) {
            this.props.addCreditTransfer({ number, amount }, this.props.refresh, this._clear, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification && this.props.errorNotification();
        }
    };

    _clear = () => {
        this.props.close();
        this.setState({ number: '', amount: '' });
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
                aria-labelledby="Add Credit Transfer"
                aria-describedby="Modal for adding credit transfers"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="ADD CREDIT TRANSFER"
                                cardSubtitle="Fill the form below to add credit transfer to the system"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Number"
                                                    id="number"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setNumber }
                                                    defaultValue={ this.state.number }
                                                    max={10}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Amount"
                                                    id="amount"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setAmount }
                                                    defaultValue={ this.state.amount }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._addCreditTransfer}>Add</Button>
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

const AddModalWrapped = withStyles(styles)(AddCreditTransfer);

export default AddModalWrapped;






