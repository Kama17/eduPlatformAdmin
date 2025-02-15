import TelegramBot from 'node-telegram-bot-api';
import { botAdded, botLeft, addTelegramUserIfExists, checkUserExists, removeTelegramUserIfExists} from './botApi.js'
import db from './database.js'

export const bot = new TelegramBot(String(process.env.BOT_TOKEN), { polling: true });

// Example: Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    if(chatId == Number(process.env.BOT_CHAT)) {

      bot.sendMessage(chatId, 'Welcome to the bot!');

      bot.getChat(chatId).then((chatMember) => {
        console.log(chatMember.active_usernames);
      });
    }
    //console.log(msg);
  });



/** @type {{ [chatId: number]: string | undefined }} */
let userState = {};

bot.onText(/\/email/, (msg) => {
  if(msg.chat.id != Number(process.env.BOT_CHAT)) {
    return
  }
    const chatId = msg.chat.id;

    // Ask the user to provide their email
    bot.sendMessage(chatId, "Please provide your email address:");

    // Set the user's state to "waiting for email"
    userState[chatId] = 'waiting_for_email';

  });

  bot.on('message', async (msg) => {

    if(msg.chat.id != Number(process.env.BOT_CHAT)) {
      return
    }

    const chatId = msg.chat.id;
    const text = msg.text?.toLowerCase();

    // Check if the user is in the "waiting for email" state
    if (text && userState[chatId] === 'waiting_for_email') {
      // Validate the email format (simple regex for demonstration)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(text)) {
        // Email is valid, store it or process it
        bot.sendMessage(chatId, `Thank you!`);


       const userExists = await checkUserExists(text); // Await the result

       if(userExists) {
        let chatIds = await db.bot.findMany();

        for (const chat of chatIds) {
          const options = {
            name: chat.chatName ?? "",
            member_limit: 1,
          };
          try {
            const inviteLink = await bot.createChatInviteLink(chat.chatId.toString(), options);
            console.log('Invite link for the channel:', inviteLink);

            await bot.sendMessage(chatId, 'Join our channels:', {
              reply_markup: {
                inline_keyboard: [
                  [{ text: chat.chatName ?? "", url: inviteLink.invite_link }],
                ]
              }
            });
          } catch (error) {
            console.error('Error getting invite link:', error);
          }
        }

       } else {
        bot.sendMessage(chatId, "Sorry I cannot find your account. Contact administrator.");
       }
        // You can save the email to your database here
        // Example: await db.user.update({ where: { id: userId }, data: { email: text } });

        // Reset the user's state
        userState[chatId] = undefined;
      } else {
        // If the email is invalid, ask the user to provide a valid one
        bot.sendMessage(chatId, "Please provide a valid email address.");
      }
    }
  });


  bot.on('new_chat_members', (msg) => {

    if (msg.new_chat_members && msg.new_chat_members.length > 0) {

      for (const member of msg.new_chat_members ) {

        if (member.id === Number(process.env.BOT_ID) ) {
          botAdded( msg.chat.id, msg.chat.title )
          console.log("Bot added to chat")
        } else {
          addTelegramUserIfExists( msg.chat.id, member.id, msg.chat.title ?? "")
        }
      }

    console.log(msg)
  }
  });



  bot.on('left_chat_member', (msg) => {
    const member = msg.left_chat_member
    if (member ) {

      if (member.id === Number(process.env.BOT_ID) ) {
        botLeft( msg.chat.id )
        console.log("Bot removed from chat")
      } else {
        removeTelegramUserIfExists(msg.chat.id, member.id)
      }
      console.log(msg)
    }
  });

/*

  bot.exportChatInviteLink(-1002243654237)
  .then((inviteLink) => {
    console.log('Invite link for the channel:', inviteLink);
    bot.sendMessage(6416163049, 'Join our channels:', {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Join Channel 1', url: inviteLink }],
          [{ text: 'Join Channel 2', url: inviteLink }],
          [{ text: 'Join Channel 3', url: inviteLink }]
        ]
      }
    });
  })
  .catch((error) => {
    console.error('Error getting invite link:', error);
  });
*/
  console.log("Bot is listening...")

