import db from '$lib/database.js'
import type { PageServerLoad } from './$types';

  export const load: PageServerLoad = async () => {
	const users = await db.user.findMany({
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
            },
          },
          telegramGroups: {
            select: {
              chatId: true,
              chatName: true,
              isActive: true,
            }
          }
        },
      });

      return {users}
};