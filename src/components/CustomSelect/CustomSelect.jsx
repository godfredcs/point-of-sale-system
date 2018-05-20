import React, { Component } from 'react';
import { withStyles, FormControl, InputLabel, Select, MenuItem } from 'material-ui';
import { Clear, Check } from 'material-ui-icons';
import PropTypes from 'prop-types';

import { customInputStyle } from 'variables/styles';

class CustomInput extends Component {
	render() {
		const { 
			classes, formControlProps, labelText, id, labelProps, inputProps, error, success, 
			onChange, value, items
		} = this.props;

		return (
			<FormControl {...formControlProps} className={formControlProps.className + " " + classes.formControl}>
				{
                    labelText !== undefined 
                        ? (
                            <InputLabel
                                classes={{
                                    root: classes.labelRoot + (error ? " " + classes.labelRootError : success ? " " + classes.labelRootSuccess : ""),
                                }}
                                htmlFor={id}
                                {...labelProps}
                            >
                                {labelText}
                            </InputLabel>
                        )
                        : null
                    }
                <Select
                    id={id}
                    {...inputProps}
                    onChange={onChange}
                    value={value}
                >
                    {
                        typeof items[0] === "object"
                            ? items.map((item, index) => (
                                <MenuItem value={index} key={item.id}>{ item.name }</MenuItem>
                            ))
                            : items.map(item => (
                                <MenuItem value={item} key={item}>{ item }</MenuItem>
                            ))
                    }
                </Select>
				{
					error 
						? <Clear className={classes.feedback + " " + classes.labelRootError}/>
						: success 
							? <Check className={classes.feedback + " " + classes.labelRootSuccess}/>
							: null
				}
			</FormControl>
		);
	}
}

CustomInput.propTypes = {
    classes: PropTypes.object.isRequired,
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool
}

export default withStyles(customInputStyle)(CustomInput);
