import { type RequestHandler } from "@sveltejs/kit";
import db from '$lib/database';


export const POST: RequestHandler = async ({request, cookies} ) => {

        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');




        const user = await db.user.findUnique({
            where: { email: email as string },
        });

        if (user && user.password === password && user.active === "yes") {
            const sessionToken = crypto.randomUUID()
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24)

            await db.session.deleteMany({
                where: { userId: user.id },
            });

            await db.user.update({
                where: { id: user.id },
                data: {
                    loginCount: { increment: 1}, // Increment the login count by 1
                    lastLogin: new Date(), // Set the last login timestamp to now
                },
            });

            await db.session.create({
                data: {
                    sessionToken,
                    userId: user.id,
                    expiresAt
                }
            })
        // Set the cookie for the session
        cookies.set('user_session', sessionToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

            return new Response("OK");
        }

        return new Response("Access denied", { status: 403 });
};
