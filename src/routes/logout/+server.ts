import { json } from '@sveltejs/kit';
import db from '$lib/database';
import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
    const sessionToken = cookies.get('user_session');

    if (sessionToken) {
        await db.session.delete({
            where: { sessionToken },
        });

        // Remove the cookie
        cookies.delete('user_session', { path: '/' });
        throw redirect(303, '/');

    }

    return json({ message: 'Logged out successfully' });
};
