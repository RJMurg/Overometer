import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async () => {
	const status = await prisma.feeling.findFirst({
		orderBy: {
			timestamp: 'desc'
		}
	});

	if (!status) {
		return {
			over: 50,
			message: '',
			timestamp: new Date(0)
		};
	}

	return {
		over: status.over,
		message: status.message ? status.message : '',
		timestamp: status.timestamp
	};
}) satisfies PageServerLoad;
