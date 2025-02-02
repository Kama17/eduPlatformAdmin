import { redirect } from '@sveltejs/kit';
import type { HttpError } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // Import the correct event type
import db  from '$lib/database';
import type { Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
    const sessionToken = event.cookies.get('user_session');

    if (sessionToken) {
        // Validate session from the database
        const session = await db.session.findUnique({
            where: { sessionToken },
            include: { user: true },
        });

        if (session && session.expiresAt > new Date()) {
            // Attach the user info to the locals
            event.locals.user = {
                id: session.user.id,
                email: session.user.email,

            };
        } else if (session) {
            // Session expired, delete it
            await db.session.delete({
                where: { sessionToken },
            });
        }
    }

    // Protect certain routes
    const protectedRoutes = ['/admin'];

    if (protectedRoutes.includes(event.url.pathname) && !event.locals.user) {
        throw redirect(303, '/login');
    }

    return resolve(event);
};

export const handleHttpError = ({ error, event }: { error: HttpError, event: RequestEvent }) => {
    if (error.status === 405) {
        // Handle 405 Method Not Allowed error
        console.error('405 error - Method Not Allowed:', event.url.pathname);
    } else {
        // Handle other types of errors here
        console.error('Unexpected error:', error.body);
    }
};
