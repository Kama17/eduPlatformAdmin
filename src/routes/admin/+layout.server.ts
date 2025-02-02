import { redirect } from '@sveltejs/kit';
export const load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login'); // Redirect logged-in users to the /student page
    }
    return {
        user: locals.user,
    };
    //return {}; // Allow unauthenticated users to access the login page
};