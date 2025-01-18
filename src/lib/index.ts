// place files you want to import through the `$lib` alias in this folder.

/**
 * Returns how serious the value is, 'so', 'completely', 'overwhelmingly', 'mostly', 'slightly'
 * @param value the value to check
 * @returns a string representing the seriousness of the value
 */
export function getSeriousness(value: number): string {
	if (value >= 98) {
		return 'so';
	} else if (value >= 86) {
		return 'completely';
	} else if (value >= 71) {
		return 'overwhelmingly';
	} else if (value >= 61) {
		return 'mostly';
	} else if (value >= 51) {
		return 'slightly';
	}

	return '';
}

/**
 * Returns if it is over or back
 * @param over how over it is
 * @param back how back it is
 * @returns a boolean representing if it is over or back
 */
export function isOver(over: number, back: number): boolean {
	return over > back;
}

/**
 * Returns if it is back or over.
 * @deprecated use isOver instead
 * @param over how over it is
 * @param back how back it is
 * @returns a boolean representing if it is back or over
 */
export function isBack(over: number, back: number): boolean {
	return !isOver(over, back);
}

/**
 * Returns the intensity of the colour use in the text gradient
 * @param value the value to check (so, completely, overwhelmingly, mostly, slightly)
 * @returns a string representing the intensity of the value
 */
export function getIntensity(value: string): string {
	switch (value) {
		case 'so':
			return '800';
		case 'completely':
			return '600';
		case 'overwhelmingy':
			return '500';
		case 'mostly':
			return '300';
		case 'slightly':
			return '200';
		default:
			return '500';
	}
}

/**
 * Returns the text gradient for the text
 * @param over how over it is
 * @param back how back it is
 * @returns the tailwind gradient string
 */
export function getBackgroundTextGradient(over: number, back: number): string {
	let gradient = 'bg-gradient-to-r from-';

	if (isOver(over, back)) {
		gradient += 'red-500 to-';

		if (getSeriousness(over) === 'so' || getSeriousness(over) === 'completely') {
			gradient += 'red-800';
		} else if (getSeriousness(over) === 'mostly' || getSeriousness(over) === 'overwhelmingly') {
			gradient += 'yellow-800';
		} else {
			gradient += 'green-800';
		}

		return gradient;
	} else if (over !== back) {
		gradient += 'green-500 to-';

		if (getSeriousness(back) === 'so' || getSeriousness(back) === 'completely') {
			gradient += 'green-800';
		} else if (getSeriousness(back) === 'mostly' || getSeriousness(back) === 'overwhelmingly') {
			gradient += 'yellow-800';
		} else {
			gradient += 'red-800';
		}

		return gradient;
	}

	return gradient + 'yellow-500 to-yellow-600';
}
