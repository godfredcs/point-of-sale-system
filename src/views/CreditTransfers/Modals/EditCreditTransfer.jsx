import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

class EditCreditTransfer extends Component {
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

    _editCreditTransfer = () => {
        const 
            id = this.props.credit_transfer_to_edit.id,
            number = this.state.number || this.props.credit_transfer_to_edit.number,
            amount = this.state.amount || this.props.credit_transfer_to_edit.amount;

        if (id && (number.length === 10) && Number(amount)) {
            this.props.editCreditTransfer(id, {number, amount}, this.props.refresh, this.props.close, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
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
        const { classes, open, close, credit_transfer_to_edit } = this.props;

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
                                cardTitle="EDIT CREDIT TRANSFER"
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
                                                    defaultValue={ credit_transfer_to_edit.number }
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
                                                    defaultValue={ credit_transfer_to_edit.amount }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editCreditTransfer}>Edit</Button>
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

const EditModalWrapped = withStyles(styles)(EditCreditTransfer);

export default EditModalWrapped;






