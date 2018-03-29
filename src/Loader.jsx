import React from 'react';
import { Modal } from 'material-ui';

export default ({ open }) => (
    <Modal
        aria-labelledby="Add Item"
        aria-describedby="Modal for adding items"
        open={open}
    >
        <div style={styles.container}>
            <img style={styles.loader} src={require('./assets/img/loading_apple.gif')} alt="loader" />
        </div>
    </Modal>
);
 
const styles = {
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        width: '100px',
    }
};


