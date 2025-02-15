import db from './database.js'

/**
 * @param {number} chatId
 * @param {string | undefined } chatTitle
 */

export async function botAdded(chatId, chatTitle) {
    try {
        // Upsert the bot's chat details in the database
        await db.bot.upsert({
            where: {
                chatId: chatId,
            },
            update: {
                isActive: false, // Update the membership status
            },
            create: {
                chatId: chatId, // Create a new record with chatId
                chatName: chatTitle, // Set the chat title
                isActive: false, // Set the membership status
            },
        });

        // Return success response
        return {
            success: true,
            message: 'Bot added or updated successfully.',
        };
    } catch (error) {
        // TypeScript error handling: cast error to an instance of Error

        console.error('Unexpected error:', error);
    }
}

/**
 * @param {any} chatId
 */
export async function botLeft(chatId) {
    try {
        // Check if the bot entry exists in the database
        const botEntry = await db.bot.findUnique({
            where: {
                chatId: chatId
            }
        });

        if (!botEntry) {
            console.error(`No bot found with chatId: ${chatId}`);
            return;
        }

        await db.bot.delete({
            where: { chatId: chatId }
        });
        console.log(`Bot deleted chatId ${chatId}.`);

        return {
            success: true,
            message: 'Bot removed form chat successfully.',
        };

    } catch (error) {
        console.error('Error updating bot status:', error);
    }
}


/**
 * @param {number} chatId
 * @param {number} userId
 * @param {string} chatName
 */
export async function addTelegramUserIfExists(chatId, userId, chatName) {
   const userDetails = await db.userDetails.findUnique({
        where: { telegramId: userId },
    });

    if (!userDetails) {
        console.log('User details not found');
        return;
    }

    const user = await db.user.findUnique({
        where: { id: userDetails.userId },
    });

    if (!user) {
        throw new Error('User not found');
      }


    const telegramGroup = await db.telegramGroups.create({
        data: {
            chatId: chatId,  // The chatId that links to the bot
            userId: userId,
            chatName: chatName,  // The userId that links to the user
            isActive: true,   // You can set this based on your logic
        },
        });


    return telegramGroup;

}


/**
 * @param {number} chatId
 * @param {number} userId
 */
export async function removeTelegramUserIfExists(chatId, userId) {
    const userDetails = await db.userDetails.findUnique({
         where: { telegramId: userId },
     });

     if (!userDetails) {
         console.log('User details not found');
         return;
     }

     const user = await db.user.findUnique({
         where: { id: userDetails.userId },
     });

     if (!user) {
         console.log('User not found');
         return;
       }


     const telegramGroup = await db.telegramGroups.delete({
        where: {
            chatId_userId: {
              chatId: chatId,
              userId: userId,
            },
          },
         });


     return telegramGroup;

 }


/**
 * @param {string} email
 */
export async function checkUserExists(email) {


     const user = await db.user.findUnique({
         where: { email: email },
     });

     console.log(user)
     if (!user) {
        return false
       }

    if(user.active)
       return true;
    else
    return false
 }

