import { Conversation } from '@grammyjs/conversations'
import { MyContext } from '../session/session'
import { instaSave } from '../axios/instagram'

type MyConversation = Conversation<MyContext>

export async function downloadConversation(
    conversation: MyConversation,
    ctx: MyContext
) {
    const url = ctx.message?.text
    const waitMessage = await ctx.reply('Please wait ⏳')
    const data = await instaSave(url)

    ctx.chatAction = 'upload_video'
    await ctx.replyWithVideo(data.urls[0].url, {
        caption: `<b>${data.meta.title}</b>\n\n@dars_uchun_video_yuklovchi_bot`,
        parse_mode: 'HTML',
    })
    await ctx.api.deleteMessage(waitMessage.chat.id, waitMessage.message_id)
}
