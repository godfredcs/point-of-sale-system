import React, { Component } from 'react';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput, CustomSelect } from 'components';

class EditTransaction extends Component {
    state = {
        name: '',
        type: 'cash in',
        phone: '',
        amount: '',
        commission: '',
    }

    _setName = event => {
        this.setState({ name: event.target.value });
    };

    _setType = event => {
        this.setState({ type: event.target.value });
    };

    _setPhone = event => {
        this.setState({ phone: event.target.value });
    }

    _setAmount = event => {
        this.setState({ amount: event.target.value });
    };

    _setCommission = event => {
        this.setState({ commission: event.target.value });
    };

    _clear = () => {
        this.setState({
            name: '',
            type: 'cash in',
            phone: '',
            amount: '',
            commission: '',
        });
    };

    _editMobileMoney = () => {
        const { name, type, phone, amount, commission } = this.state;

        if (name && type && Number(phone) && Number(amount) && Number(commission)) {
            this.props.editMobileMoney({name, type, phone, amount, commission}, this.props.refresh, this._clear);
        }
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
                aria-labelledby="Edit Mobile Money"
                aria-describedby="Modal for editing mobile money"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            
                            <RegularCard
                                cardTitle="EDIT MOBILE MONEY"
                                cardSubtitle="Fill the form below to edit mobile money transaction"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Name"
                                                    id="name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    onChange={ this._setName }
                                                    defaultValue={ this.state.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomSelect
                                                    labelText="Type"
                                                    id="type"
                                                    formControlProps={{ fullWidth: true }}
                                                    onChange={ this._setType }
                                                    value={ this.state.type }
                                                    items={["cash in", "cash out"]}
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Phone"
                                                    id="phone"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setPhone }
                                                    defaultValue={ this.state.phone }
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
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    labelText="Commission"
                                                    id="commission"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setCommission }
                                                    defaultValue={ this.state.commission }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._editMobileMoney}>Add</Button>
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

const EditModalWrapped = withStyles(styles)(EditTransaction);

export default EditModalWrapped;






