import createUser from '@/lib/actions/user.actions';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		// Do something with payload
		// For this guide, log payload to console
		// const { id } = evt.data;
		const eventType = evt.type;

		if (eventType === 'user.created') {
			const { id, first_name, last_name, email_addresses } = evt.data;

			const user = {
				clerkId: id,
				firstName: first_name!,
				lastName: last_name!,
				email: email_addresses[0].email_address,
			};
			// Call server action
			await createUser(user);
			return NextResponse.json({ success: true });
		}

		return new Response('Webhook received', { status: 200 });
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error verifying webhook', { status: 400 });
	}
}
