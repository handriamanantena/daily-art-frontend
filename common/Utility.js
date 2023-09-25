import Moment from "moment";


export const formatDateJapanease = (date) => {
    return Moment(date.split('T')[0]).format('YYYY年 MMM月 D日');
}

export const formatDateYYYYMMDD = (date) => {
    return Moment(new Date(date).toISOString().split('T')[0]).format("YYYY-MM-DD");
}