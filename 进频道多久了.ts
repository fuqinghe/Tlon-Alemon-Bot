import { Messagetype, plugin } from 'alemon'

export class 我进频道多久了 extends plugin {
  constructor() {
    super({
      dsc: '我进频道多久了',
      rule: [
        {
          reg: '^/?我进频道多久了$',
          fnc: '我进频道多久了'
        }
      ]
    })
  }
  async 我进频道多久了(e: Messagetype) {
    let 进入时间: string = e.msg.member.joined_at
    let 现在时间: string = e.msg.timestamp
    let 进入时间对象: Date = new Date(进入时间);
    let 现在时间对象: Date = new Date(现在时间);
    let 时间差: number = 进入时间对象.getTime() - 现在时间对象.getTime(); // 计算时间差，单位为毫秒
    let 时间差秒数: number = Math.floor(时间差 / 1000); // 将时间差转换为秒数
    let 天数: number = Math.floor(时间差秒数 / (3600 * 24)); // 计算天数
    let 小时: number = Math.floor((时间差秒数 % (3600 * 24)) / 3600); // 计算小时
    let 分钟: number = Math.floor((时间差秒数 % 3600) / 60); // 计算分钟
    let 秒数: number = 时间差秒数 % 60; // 计算秒数
    let 格式化时间差: string = `${Math.abs(天数)}天 ${Math.abs(小时)}小时 ${Math.abs(分钟)}分钟 ${Math.abs(秒数)}秒`; // 格式化时间差并删除负号
    await e.reply(格式化时间差); // 输出结果：'天 小时 分钟 秒'
    return true
  }
}
