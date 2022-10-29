const getFormattedDate = milliseconds => {
	const date = new Date(milliseconds);

	const formatDecimal = number => `${number < 10 ? `0${number}` : number}`;

	return `${date.getUTCHours()} : ${formatDecimal(date.getMinutes())} : ${formatDecimal(
		date.getSeconds(),
	)}`;
};

export default getFormattedDate;
