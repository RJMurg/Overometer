import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { produce } from 'sveltekit-sse';

export const POST: RequestHandler = async () => {
	return produce(async function start({ emit }) {
		while (true) {
			const latestFeeling = await prisma.feeling.findFirst({
				orderBy: {
					timestamp: 'desc'
				}
			});

			const { error } = emit('feelings', JSON.stringify(latestFeeling));

			if (error) {
				return;
			}
		}
	});
};
