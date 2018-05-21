import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField } from 'material-ui';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const CustomDatepicker = ({ classes, label, value, onChange }) => (
    <form className={classes.container} noValidate>
        <TextField
            id="date"
            label={label}
            type="date"
            value={value}
            className={classes.textField}
            onChange={onChange}
            InputLabelProps={{shrink: true}}
        />
    </form>
);

CustomDatepicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomDatepicker);
