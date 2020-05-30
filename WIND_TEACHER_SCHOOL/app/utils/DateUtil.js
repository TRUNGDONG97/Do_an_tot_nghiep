// import { format } from "date-fns";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

// export default {
// 	formatBirthday: (timestamp, novalue = "") => (timestamp > 0 ? format(timestamp, "DD/MM/YYYY") : novalue),
// 	formatLongDate: timestamp => format(timestamp, "dddd, DD/MM/YYYY"),
// 	formatShortDate: timestamp => format(timestamp, "DD/MM/YYYY"),
// 	formatTime: timestamp => format(timestamp, "HH:mm"),
// 	formatGroupKey: timestamp => format(timestamp, "YYYYMMDD"),
// 	formatTimeDate: timestamp => format(timestamp, "HH:mm DD/MM/YYYY"),
// 	formatDateTime: timestamp => format(timestamp, "DD/MM/YYYY HH:mm"),
// };

export { moment };

export default {
	formatBirthday: (timestamp, novalue = "") => (timestamp > 0 ? moment(timestamp).utcOffset(7).format("DD/MM/YYYY") : novalue),
	formatLongDate: timestamp => moment(timestamp).utcOffset(7).format("dddd, DD/MM/YYYY"),
	formatShortDate: timestamp => moment(timestamp).utcOffset(7).format("DD/MM/YYYY"),
	formatInputDate: timestamp => moment(timestamp).utcOffset(7).format("YYYY-MM-DD"),
	formatTime: timestamp => moment(timestamp).utcOffset(7).format("HH:mm"),
	formatGroupKey: timestamp => moment(timestamp).utcOffset(7).format("YYYYMMDD"),
	formatTimeDate: timestamp => moment(timestamp).utcOffset(7).format("HH:mm DD/MM/YYYY"),
	formatDateTime: timestamp => moment(timestamp).utcOffset(7).format("DD/MM/YYYY HH:mm"),
	formatRelativeLongDate: timestamp => {
		return moment(timestamp).utcOffset(7).calendar(null, {
			sameDay: "[Hôm nay,] DD/MM/YYYY",
			nextDay: "[Ngày mai,] DD/MM/YYYY",
			nextWeek: "dddd, DD/MM/YYYY",
			lastDay: "[Hôm qua,] DD/MM/YYYY",
			lastWeek: "dddd, DD/MM/YYYY",
			sameElse: "dddd, DD/MM/YYYY",
		});
	},
};

export const DefaultFormatString = {
	ISO: "YYYY-MM-DDTHH:mm:ssZ",
	birthday: "DD/MM/YYYY",
	shortDate: "DD/MM/YYYY",
	longDate: "dddd, DD/MM/YYYY",
};

export function format(date, formartString) {
	return moment(date).format(formartString);
}

export function getTimeInMilis(date) {
	return moment(date)
		.utc()
		.valueOf();
}

export function startOfDay(date) {
	return moment(date).startOf("day");
}

/**
 * @param {any} date
 * @returns {{start: number, end: number}}
 */
export function rangeOfDay(date) {
	const mDay = moment(date);
	const startDay = mDay.startOf("day");
	let range = { start: startDay.valueOf() };
	const endDay = startDay.add(1, "d").startOf("day");
	range.end = endDay.valueOf();
	return range;
}
