export function formatDateIndo(param: Date) {
	const d = new Date(param);
	const formatter = new Intl.DateTimeFormat('id-ID');
	return formatter.format(d);
}
export function formatDateTimeIndo(param: Date) {
	const d = new Date(param);
	const formatter = new Intl.DateTimeFormat('id-ID', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
	return formatter.format(d);
}

export function formatInputDate(param: Date | string | undefined) {
	if (!param) return '';
	const d = new Date(param);
	const formatter = new Intl.DateTimeFormat('fr-CA');
	return formatter.format(d);
}

export function formatNumberRibuan(param: number | bigint | undefined) {
	if (!param) return '';
	const formatter = new Intl.NumberFormat('id');
	return formatter.format(param);
}
