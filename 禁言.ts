import { Messagetype, plugin } from 'alemon'

export class 禁言 extends plugin {
  constructor() {
    super({
      dsc: '禁言',
      rule: [
        {
          reg: '^/禁言(.*)秒$',
          fnc: '禁言_秒'
        },{
          reg: '^/禁言(.*)(分钟|分)$',
          fnc: '禁言_分'
        }
      ]
    })
  }
  async 禁言_秒(e: Messagetype) {
    if (e.eventType !== 'CREATE' && e.event !== 'MESSAGES' && !e.isGroup) {
      return
    }
    let 时长 = e.msg.content.replace(/\/|(<@![0-9a-zA-Z]+>| |禁言|秒)/g, "")
    console.log(`禁言：${时长}秒`);
    const 子频道ID = e.msg.guild_id
    if (e.user_permissions.manage === true){
      if(e.bot_permissions.manage === true) {
        if(e.isPrivate === true) {
          let 被禁人ID = e.atuid[0].id
          let 被禁人昵称 = e.atuid[0].username
          if (e.at === true) {
            await client.muteApi
            .muteMember(子频道ID, 被禁人ID,{ seconds: `${时长}` })
            .then(async result => {
              await e.reply(`已经把 ${被禁人昵称} \n丢进小黑屋${时长}秒啦`)
            })
            .catch(async err => {
              await e.reply('禁言失败!请确认时间为阿拉伯数字')
            })
          } else {
            await e.reply('你要我禁言谁啊')
          }
        } else if (e.isPrivate === false) {
          let 被禁人ID = e.atuid[1].id
          let 被禁人昵称 = e.atuid[1].username
          if (e.at === true) {
            await client.muteApi
            .muteMember(子频道ID, 被禁人ID,{ seconds: `${时长}` })
            .then(async result => {
              await e.reply(`已经把 ${被禁人昵称} \n丢进小黑屋${时长}秒啦`)
            })
            .catch(async err => {
              await e.reply('禁言失败!请确认时间为阿拉伯数字')
            })
          } else {
            await e.reply('你要我禁言谁啊')
          }
        }
      } else if (e.bot_permissions.manage === false) {
        await e.reply('我连管理员都不是啦')
      }
    } else if (e.user_permissions.manage === false) {
      await e.reply('你不是管理员，无法使用该指令')
    }
    return true
  }
  async 禁言_分(e: Messagetype) {
    if (e.eventType !== 'CREATE' && e.event !== 'MESSAGES' && !e.isGroup) {
      return
    }
    let 分钟 = parseInt(e.msg.content.replace(/\/|(<@![0-9a-zA-Z]+>| |禁言|(分钟|分))/g, ""));
    console.log(`禁言：${分钟}分钟`);
    const 时长 = 分钟 * 60
    const 子频道ID = e.msg.guild_id
    if (e.user_permissions.manage === true) {
      if(e.bot_permissions.manage === true) {
        if(e.isPrivate === true) {
          let 被禁人ID = e.atuid[0].id
          let 被禁人昵称 = e.atuid[0].username
          if (e.at === true) {
            await client.muteApi
            .muteMember(子频道ID, 被禁人ID,{ seconds: `${时长}` })
            .then(async result => {
              await e.reply(`已经把 ${被禁人昵称} \n丢进小黑屋${分钟}分钟啦`)
            })
            .catch(async err => {
              await e.reply('禁言失败!请确认时间为阿拉伯数字')
            })
          } else {
            await e.reply('你要我禁言谁啊')
          }
        } else if (e.isPrivate === false) {
          let 被禁人ID = e.atuid[1].id
          let 被禁人昵称 = e.atuid[1].username
          if (e.at === true) {
            await client.muteApi
            .muteMember(子频道ID, 被禁人ID,{ seconds: `${时长}` })
            .then(async result => {
              await e.reply('禁言成功！')
            })
            .catch(async err => {
              await e.reply(`已经把 ${被禁人昵称} \n丢进小黑屋${分钟}分钟啦`)
            })
          } else {
            await e.reply('你要我禁言谁啊')
          }
        }
      } else if (e.bot_permissions.manage === false) {
        await e.reply('我连管理员都不是啦')
      }
    } else if (e.user_permissions.manage === false) {
      await e.reply('你不是管理员，无法使用该指令')
    }
    return true
  }
}
