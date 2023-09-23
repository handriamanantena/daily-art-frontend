import Moment from "moment";


export const formatDateJapanease = (date) => {
    return Moment(date).format('YYYY年 MMM月 D日');
}

export const formatDateYYYYMMDD = (date) => {
    console.log("previouse date: " + date);
    console.log("moment day: " + Moment(date).date());
    let formated = Moment(date).format("YYYY-MM-DD")
    console.log("formated date" + formated);
    return formated
}