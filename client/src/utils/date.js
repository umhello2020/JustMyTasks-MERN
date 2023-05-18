import moment from 'moment';

export const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
};

export const formatDateTime = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
}

export const formatTime = (date) => {
    return moment(date).format('HH:mm:ss');
}
