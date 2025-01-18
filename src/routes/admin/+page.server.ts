import type { PageServerLoad, Actions } from './$types';
import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import prisma from '$lib/server/prisma';

config();

export const load = (async ({ cookies }) => {
	const token = cookies.get('token');
	let loggedIn = false;

	const tokenFromDatabase = await prisma.logins.findFirst({
		where: {
			token: token
		}
	});

	if (tokenFromDatabase) {
		if (tokenFromDatabase.expires >= new Date()) {
			loggedIn = true;
		}
	}

	return {
		loggedIn
	};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, request }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (password === process.env.ADMIN_PASSWORD) {
			const newToken = uuidv4();

			await prisma.logins.create({
				data: {
					token: newToken,
					expires: new Date(Date.now() + 1000 * 60 * 60)
				}
			});

			cookies.set('token', newToken, {
				maxAge: 60 * 60,
				path: '/'
			});

			return {
				attemptSuccessful: true
			};
		} else {
			return {
				attemptSuccessful: false
			};
		}
	},

	addFeeling: async ({ request }) => {
		const formData = await request.formData();
		const over = String(formData.get('over'));
		const message = String(formData.get('message'));

		await prisma.feeling.create({
			data: {
				over: parseInt(over),
				message: message
			}
		});
	}
} satisfies Actions;
