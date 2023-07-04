import { plugin, Messagetype, segment } from 'alemon'
import axios from 'axios';
const api = "https://www.sapi.run/hero/select.php";

export class 王者查战力 extends plugin {
  constructor () {
    super({
      rule: [
        {
          reg: `^查战力(.*)`,
          fnc: '王者查战力'
        },
      ]
    })
  }


  async 王者查战力(e: Messagetype) {
    const yx = e.msg.content.replace(/#|(<@![0-9a-zA-Z]+>| |查战力)/g, "").trim();
    const result = [];
    const s = ["aqq", "awx", "iqq", "iwx"];
    for (let i = 0; i < 4; i++) {
      try {
        const response = await axios.get(`${api}?hero=${yx}&type=${s[i]}`);
        result[i] = response.data;
      } catch (error) {
        return await e.reply("战力接口请求失败");
      }
      if (result[i].code !== 200) {
        console.log(result[i]);
        return await e.reply("该英雄不存在请检查");
      }
    }
    var [aqq, awx, iqq, iwx] = result
    var aqq = aqq.data
    var awx = awx.data
    var iqq = iqq.data
    var iwx = iwx.data
    const img = segment.image(aqq.photo)
    const msg = [
      "=== 安卓QQ区 ===\n",
      `县标：${aqq.areaPower} - ${aqq.area}\n`,
      `市标：${aqq.cityPower} - ${aqq.city}\n`,
      `省标：${aqq.provincePower} - ${aqq.province}\n`,
      `国标：${aqq.guobiao}\n`,
      "=== 安卓微信区 ===\n",
      `县标：${awx.areaPower} - ${awx.area}\n`,
      `市标：${awx.cityPower} - ${awx.city}\n`,
      `省标：${awx.provincePower} - ${awx.province}\n`,
      `国标：${awx.guobiao}\n`,
      "=== 苹果QQ区 ===\n",
      `县标：${iqq.areaPower} - ${iqq.area}\n`,
      `市标：${iqq.cityPower} - ${iqq.city}\n`,
      `省标：${iqq.provincePower} - ${iqq.province}\n`,
      `国标：${iqq.guobiao}\n`,
      "=== 苹果微信区 ===\n",
      `县标：${iwx.areaPower} - ${iwx.area}\n`,
      `市标：${iwx.cityPower} - ${iwx.city}\n`,
      `省标：${iwx.provincePower} - ${iwx.province}\n`,
      `国标：${iwx.guobiao}\n`,
      "=== 更新时间 ===\n",
      aqq.updatetime
    ]
    e.reply(msg, img)
  }
}