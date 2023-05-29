import { plugin, Messagetype } from 'alemon'

const 指定时间 = new Date('2023-12-31 23:59:59').getTime();
/**
                        年-月-日 时:分:秒
                        请按照如上格式填写日期
*/
const 结束提示词 = '倒计时已结束';
//              自定义倒计时结束提示词
export class 自定义倒计时 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: '^/倒计时$',
                    fnc: '自定义倒计时'
                }
            ]
        })
    }
    async 自定义倒计时(e: Messagetype) {
        let msg = '';
        function countdown() {
          let Time = Date.now();
          let millisecond = 指定时间 - Time;
      
          if (millisecond <= 0) {
            msg = 结束提示词;
            return;
          }
          let day = Math.floor(millisecond / (24 * 60 * 60 * 1000));
          let hour = Math.floor((millisecond % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
          let minutes = Math.floor((millisecond % (60 * 60 * 1000)) / (60 * 1000));
          let seconds = Math.floor((millisecond % (60 * 1000)) / 1000);
      
          msg = `距离倒计时结束还剩\n${day} 天 ${hour} 小时 ${minutes} 分钟 ${seconds} 秒`;
          setTimeout(countdown, 1000);
        }
        countdown();
        e.reply(msg);
        return false
    }
}