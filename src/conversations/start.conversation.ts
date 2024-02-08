import { Conversation } from '@grammyjs/conversations'
import { MyContext } from '../session/session'
import { Keyboard } from 'grammy'
import { UserType, users } from '../data/user.data'

export type MyConversation = Conversation<MyContext>

export async function startConversation(
    conversation: MyConversation,
    ctx: MyContext
) {
    const user = users.filter((user) => user.tgId === ctx.from?.id)

    if (!user.length) {
        if (ctx.from?.id) await ctx.reply('What is your firstname?')
        const firstName = (await conversation.waitFor(':text')).message?.text

        await ctx.reply('What is your lastname?')
        const lastName = (await conversation.waitFor(':text')).message?.text

        await ctx.reply('Could you shre your phone number?', {
            reply_markup: new Keyboard()
                .requestContact('☎️ Share Contact')
                .resized(),
        })
        const phoneNumber = (await conversation.waitFor(':contact')).message
            ?.contact.phone_number

        const newUser: UserType = {
            tgId: ctx.from?.id,
            firstName,
            lastName,
            phoneNumber,
        }

        users.push(newUser)

        await ctx.reply('You have successfully registered. Welcome!', {
            reply_markup: {
                remove_keyboard: true,
            },
        })
    } else {
        await ctx.reply(`Welcome ${user[0].firstName} ${user[0].lastName}!`, {
            reply_markup: {
                remove_keyboard: true,
            },
        })
    }
}