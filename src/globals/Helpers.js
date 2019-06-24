import moment from 'moment';

export default {
    formattedCedis(amount) {
        return `GHC ${ Number(amount).toFixed(2) }`;
    },

    formattedDate(date) {
        return moment(date).format('Do MMMM YYYY');
    },

    formattedDateTime(date) {
        return moment(date).format('Do MMMM YYYY, h:mm:ss a');
    },

    from() {
        let from = new Date();
        from.setHours(0, 0, 0, 0);
        return from;
    },

    to() {
        let to = new Date();
        to.setHours(23, 59, 59, 999);
        return to;
    },

    isAdmin(role_name) {
        return role_name === 'admin';
    }
}
