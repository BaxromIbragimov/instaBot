import { Bot } from 'grammy'
import { MyContext, setupSession } from './session/session'
import { conversations, createConversation } from '@grammyjs/conversations'
import { startConversation } from './conversations/start.conversation'
import { downloadConversation } from './conversations/download.conversation'
import { autoChatAction } from '@grammyjs/auto-chat-action'

const bot = new Bot<MyContext>('6866538709:AAHIqQwZcMWKs-V17cKbQ86WHNR2jgaR9Os')

bot.api.setMyCommands([
    {
        command: 'start',
        description: 'to start the bot',
    },
    {
        command: 'category',
        description: 'to see the categories click this command',
    },
])

bot.use(setupSession())
bot.use(conversations())
bot.use(createConversation(startConversation))
bot.use(createConversation(downloadConversation))
bot.use(autoChatAction())

bot.command('start', async (ctx) => {
    await ctx.conversation.enter('startConversation')
})

bot.on('message::url', async (ctx) => {
    await ctx.conversation.enter('downloadConversation')
})

bot.catch((error) => {
    console.log(error)
})

bot.start({
    onStart(botInfo) {
        console.log('Started')
    },
})
