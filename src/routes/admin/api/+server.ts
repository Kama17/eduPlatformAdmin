import client from '$lib/database.js';
import { type RequestHandler } from "@sveltejs/kit";
import {bot} from '$lib/server/bot'

export const POST: RequestHandler = async ({ request, cookies }) => {
    // Access the request object and parse the JSON body
    const { action, userEmail, chatId, userId } = await request.json(); // Fixed typo here

    // Handle the "deactivate" action
    if (action === "deactivate") {
      try {
        await client.db.user.update({
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
            await client.db.user.update({
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
            await client.db.user.delete({
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

    } else if ( action === "activateBot") {
      try {
        // Delete the user by email
        await client.db.bot.update({
          where: {
            chatId: BigInt(chatId), // Ensure this variable contains the correct email
          },
          data: {
            isActive: true
          }
        });

        // Return success response
        return new Response(JSON.stringify("Bot activated successfully"), { status: 200 });
      } catch (error) {
        // Handle potential errors (e.g., user not found)
        return new Response(JSON.stringify({ error: "Failed to activate bot" }), { status: 500 });
      }

    } else if ( action === "botLeaveChat") {
      try {
        // Delete the user by email
        await client.db.bot.delete({
          where: {
            chatId: BigInt(chatId), // Ensure this variable contains the correct email
          }
        });

        bot.leaveChat(chatId)
        // Return success response
        return new Response(JSON.stringify("Bot activated successfully"), { status: 200 });
      } catch (error) {
        // Handle potential errors (e.g., user not found)
        return new Response(JSON.stringify({ error: "Failed to activate bot" }), { status: 500 });
      }

    } else if ( action === "deleteUserFromChat") {
      try {
        // Delete the user by email
        //await client.db.telegramGroups.delete({
          //where: {
           // chatId: BigInt(chatId),
           // userId: userId // Ensure this variable contains the correct email
          //}
        //});

        // Return success response
        return new Response(JSON.stringify("User removed form chat successfully"), { status: 200 });
      } catch (error) {
        // Handle potential errors (e.g., user not found)
        return new Response(JSON.stringify({ error: "Failed removed user form chat" }), { status: 500 });
      }

    }

    // Return a response if the action is not recognized
    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  };

  export const GET: RequestHandler = async ({ request, cookies }) => {



        //bot.leaveChat(chatId)
        // Return success response

    // Return a response if the action is not recognized
    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  };
