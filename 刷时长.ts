import { plugin, Messagetype } from 'alemon'
import { createQrcode } from '../src/alemon/qrcode'
import axios from 'axios';
import fs from 'fs'
const dirpath = "example/刷时长"
var filename = `刷.json`
if (!fs.existsSync(dirpath)) {//如果文件夹不存在
	fs.mkdirSync(dirpath);//创建文件夹
}
if (!fs.existsSync(dirpath + "/" + filename)) {//文件不存在
    fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
    }))
}

export class 刷时长 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: '^刷时长(.*)$',
                    fnc: '刷时长'
                },{
                    reg: '^绑定QQ(.*)$',
                    fnc: '绑定QQ'
                }
            ]
        })
    }
    async 绑定QQ(e: Messagetype){
        var qq_id = e.msg.content.replace(/#|(<@![0-9a-zA-Z]+>| |绑定QQ)/g, "")
        var data = {
            "qq": qq_id,
        }
        const id = e.msg.author.id
        var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
        if(!json.hasOwnProperty(id)) {//如果json中不存在该用户
            json[id] = data
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
            await e.reply("已记录您的QQ\n记录的QQ随时会失效,届时请重新绑定")
        }
        else{
            json[id] = data
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
            await e.reply("已重新记录您的QQ")
        }
    }
    async 刷时长(e: Messagetype) {
        var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
        var qq = e.msg.content.replace(/#|刷时长/g, "")
        let 时间 = new Date
        const 时 = `0${时间.getHours()}`.slice(-2);
        const 分 = `0${时间.getMinutes()}`.slice(-2);
        var id = e.msg.author.id
        if(json.hasOwnProperty(id)) {//如果json中存在该用户
            await e.reply("使用已记录的QQ")
            qq = JSON.stringify(json[id].qq)
            qq = qq.slice(1, -1);
        }
        else{
            await e.reply("还未绑定或已失效,请使用绑定QQ来让bot记住你")
        }
        const response = await axios.get(`http://q.dsbs.fun//api/tgsc?qq=${qq}`);
        const res = response.data;
        let num
        if (res.code === 200 ){
            num = `已为${qq.substring(0, 2) + qq.substring(2, qq.length - 2).replace(/./g, "*") + qq.substring(qq.length - 2)}刷取QQ音乐\n听歌时长${时}时${分}分`
        }
        e.reply(num);
        const img = await createQrcode('https://y.qq.com/m/client/vipexchange/index.html')
        if (img) e.postImage(img, '扫码查看听歌排行榜')
        return false
    }
}
