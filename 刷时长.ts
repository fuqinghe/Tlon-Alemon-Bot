import { plugin, Messagetype, createQrcode, segment } from 'alemon'
import axios from 'axios';
import fs from 'fs'
const dirpath = "example/刷时长"
var filename = `用户QQ.json`
let Usage_times = '使用次数.json'
if (!fs.existsSync(dirpath)) {//如果文件夹不存在
	fs.mkdirSync(dirpath);//创建文件夹
}
if (!fs.existsSync(dirpath + "/" + filename)) {//文件不存在
    fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({//创建文件
    }))
}
if (!fs.existsSync(dirpath + "/" + Usage_times)) {
    fs.writeFileSync(dirpath + "/" + Usage_times, JSON.stringify({
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
            await e.reply("已记录您的QQ")
        }
        else{
            json[id] = data
            fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));//写入文件
            await e.reply("已重新记录您的QQ")
        }
    }
    
    async 刷时长(e: Messagetype) {
        let userCounts = JSON.parse(fs.readFileSync(dirpath + "/" + Usage_times, "utf8"));
        // 获取用户信息
        const userId = e.msg.author.id;
        const userName = e.msg.author.username;
        const userAvatar = e.msg.author.avatar
        const userChannelName = e.msg.channel_name
        const userChanneID = e.msg.guild_id
        // 获取该用户的执行次数和用户信息
        const { 使用次数: userCount, 用户信息: userInfo } = userCounts[userId] || { 使用次数: 0, 用户信息: {} };
        // 将执行次数加1
        const newCount = userCount + 1;
        // 更新该用户信息
        userCounts[userId] = { 
            使用次数: newCount,
            用户信息: {
                ...userInfo,
                "用户昵称": userName,
                "用户头像": userAvatar,
                "用户频道ID": userId,
                "使用子频道昵称": userChannelName,
                "使用子频道ID": userChanneID
            }
        };
        // 将用户信息存储
        fs.writeFileSync('example/刷时长/使用次数.json', JSON.stringify(userCounts, null, "\t"));
        

        var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));//读取文件
        var qq = e.msg.content.replace(/#|刷时长/g, "")
        let 时间 = new Date
        const 时 = `0${时间.getHours()}`.slice(-2);
        const 分 = `0${时间.getMinutes()}`.slice(-2);
        let id = e.msg.author.id
        if(json.hasOwnProperty(id)) {//如果json中存在该用户
            const 使用次数文件 = JSON.parse(fs.readFileSync('example/刷时长/使用次数.json', "utf8"));
            const 使用次数 = 使用次数文件[`${id}`]["使用次数"]
            await e.reply("使用已记录的QQ")
            qq = JSON.stringify(json[id].qq)
            qq = qq.slice(1, -1);
            const response = await axios.get(`http://q.dsbs.fun//api/tgsc?qq=${qq}`);
            const res = response.data;
            if (res.code === 200 ) {
                console.log(`刷取成功,QQ:${qq}`);
                
            }
            let weather_icon: string
            let Textreply = [
                `@${userName}`,
                '身高查询',
                 weather_icon,
                 [
                    `已为${qq.substring(0, 2) + qq.substring(2, qq.length - 2).replace(/./g, "*") + qq.substring(qq.length - 2)}`,
                    `刷取QQ音乐\n`,
                    `听歌时长${时}时${分}分\n`,
                    `该功能已使用${使用次数}次\n`,
                    `扫码查看听歌排行榜`
                ]
              ] as [title: string, prompt: string, url: string, arr: any[]]
            await e.reply('', segment.embed(...Textreply));
            const img = await createQrcode('https://y.qq.com/m/client/vipexchange/index.html')
            if (img) e.postImage(img)
        }
        else{
            await e.reply("还未绑定QQ\n请使用`绑定QQ<qq号>`来绑定")
            return false
        }
        return false
    }
}