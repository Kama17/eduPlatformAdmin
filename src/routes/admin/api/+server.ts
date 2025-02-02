import db from '$lib/database.js';
import { type RequestHandler } from "@sveltejs/kit";


export const POST: RequestHandler = async ({ request, cookies }) => {
    // Access the request object and parse the JSON body
    const { action, userEmail } = await request.json(); // Fixed typo here

    // Handle the "deactivate" action
    if (action === "deactivate") {
      try {
        await db.user.update({
          where: {
            email: userEmail, // Use the correct variable
          },
          data: {
            active: "no", // Update the user status to "false"
          },
        });

        // Return success response with the updated progress
        return new Response(JSON.stringify("User deactivated"), { status: 200 });
      } catch (error) {
        // Handle potential errors (e.g., user not found)
        return new Response(JSON.stringify({ error: "Failed to deactivate user" }), { status: 500 });
      }
    } else if (action === "renew") {

        try {
            await db.user.update({
              where: {
                email: userEmail, // Use the correct variable
              },
              data: {
                active: "yes", // Update the user status to "false"
              },
            });

            // Return success response with the updated progress
            return new Response(JSON.stringify("User renewed"), { status: 200 });
          } catch (error) {
            // Handle potential errors (e.g., user not found)
            return new Response(JSON.stringify({ error: "Failed to renew user" }), { status: 500 });
          }
    } else if (action === "delete") {
        try {
            // Delete the user by email
            await db.user.delete({
              where: {
                email: userEmail, // Ensure this variable contains the correct email
              },
            });

            // Return success response
            return new Response(JSON.stringify("User deleted successfully"), { status: 200 });
          } catch (error) {
            // Handle potential errors (e.g., user not found)
            return new Response(JSON.stringify({ error: "Failed to delete user" }), { status: 500 });
          }

    }

    // Return a response if the action is not recognized
    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  };
