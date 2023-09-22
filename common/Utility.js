import Moment from "moment";


export const formatDate = (date) => {
    return Moment(date).format('YYYY年 MMM月 D日');
}