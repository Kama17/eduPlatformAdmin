import client from '$lib/database.js'
import type { PageServerLoad } from './$types';

  export const load: PageServerLoad = async () => {
	const users = await client.db.user.findMany({
        select: {
          id: true,
          email: true,
          active: true,
          userDetails: {
            select: {
              firstName: true,
              lastName: true,
              autoShipDate: true,
              telegramName: true,
              telegramId: true
            },
          },
          telegramGroups: {
            select: {
              chatId: true,
              chatName: true,
              isActive: true,
            }
          },
        },
      });

      const botChats = await client.db.bot.findMany({
        select: {
          id: true,
          chatId: true,
          chatName: true,
          isActive: true
        }
      })

      console.log("RE-RUN", botChats)
      return {users, botChats}
};