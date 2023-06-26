import { plugin, Messagetype, segment } from 'alemon'
import fs from 'fs'
let cnl = [
  "可以随意切换性别",
  "可以隐身",
  "透视",
  "成为电竞高手",
  "反转对方性别",
  "变成任何一个物品or人类",
  "可以把一个人变成自己性奴",
  "可以穿越空间",
  "把任何一个物品娘化",
  "可以变成一种动物",
  "可以控制(快进/暂停/倒退)时间",
  "可以时间旅行",
  "预测一个人的未来7天",
  "变成史莱姆",
  "变成丘丘人",
  "拥有高校级的计算能力",
  "可以和万物沟通",
  "可以站着拉屎",
  "让任何尸体听你话",
  "可以在现实生活中CTRL+Z",
  "永远不会变老",
  "可以站着拉屎",
  "可以点石成金",
  "鸡鸡变长10CM",
  "可以免疫所有疾病",
  "身上可以长出藤蔓",
  "身体可以无限再生",
  "可以操控冰元素",
  "可以操控火元素",
  "可以操控金元素",
  "可以操控岩元素",
  "可以操控水元素",
  "可以操控风元素",
  "可以操控草元素",
  "可以操控雷元素",
  "可以操控光元素",
  "可以改变万物的构成",
  "可以进行有效预言",
  "可以飞",
  "会土遁",
  "会水遁",
  "会风遁",
  "会读心",
  "无所不能",
  "会量子阅读",
  "分身术",
  "变成透明人",
  "拥有堪比一方通行的计算能力",
  "能讲死(者/物)变活",
  "可以操控自身引力",
  "让容颜青春永驻",
  "不需要睡觉",
  "不需要吃饭喝水",
  "可以夺取别人的能力",
  "拥有十二符咒",
  "可以改变别人的认知",
  "会打飞机,且拥有很强能量",
  "自身速度可以无限叠加",
  "精通任何一国外语",
  "吸取他人寿命",
  "在大脑中播放歌单",
  "操控万物运势",
  "让周围的人获得开心和幸福",
  "念动力",
  "轻松掌握一种技能",
  "随意转生异世界",
  "变成身边人模样",
  "将存在于小说,漫画,动漫的人物具现化",
  "拥有上条当麻的[幻想杀手]",
  "抽卡十连内必出金"
]
let fzy = [
  "一生只能用一次",
  "随时会失效",
  "每天都会失眠",
  "体重加60斤",
  "颜值变丑",
  "全家暴毙",
  "永远没有异性朋友",
  "无法对异性生效",
  "只能在梦里使用",
  "走路串稀",
  "只能生效一半",
  "需要献祭一个人类",
  "全世界都获得相同能力",
  "特别恐高",
  "寿命只剩3天",
  "连续使用会失效",
  "被人察觉会自动失效",
  "每天会自动生效一次",
  "会被全球通缉",
  "需要支付100000元",
  "只能在有人的地方使用",
  "只能在没人的地方使用",
  "会反着生效",
  "有30天冷却期",
  "有1年冷却期",
  "只能对♂性生物使用",
  "只能对♀性生物使用",
  "使用后会失明",
  "使用后会昏厥",
  "使用后就会死亡",
  "你将改变你的性取向",
  "作用目标会重新构造分子结构",
  "会变成别人的星怒",
  "需要做一本53触发",
  "可能会随机触发",
  "每次使用将改变你的认知",
  "只能作用在自己身上",
  "成功率极低",
  "身边一个人会消失",
  "马上会睡醒，别做梦了，你哪来的超能力",
  "使用后会四肢全残",
  "你将自宫",
  "你会变成萝莉",
  "你会变成正太",
  "你会变成药娘",
  "你会变成伪娘",
  "你会变成猫娘",
  "走路串稀",
  "你抽卡必吃满保底"
]
let weather_icon: string
const dirpath = "example/我的超能力"
let Usage_times = '使用次数.json'
if (!fs.existsSync(dirpath)) {//如果文件夹不存在
	fs.mkdirSync(dirpath);//创建文件夹
}
if (!fs.existsSync(dirpath + "/" + Usage_times)) {
  fs.writeFileSync(dirpath + "/" + Usage_times, JSON.stringify({
  }))
}

export class 我的超能力 extends plugin {
  constructor () {
    super({
      rule: [
        {
          reg: '^/?我的超能力$',
          fnc: 'kkcnl'
        }
      ]
    })
  }
  async kkcnl(e: Messagetype){
    let userCounts = JSON.parse(fs.readFileSync(dirpath + "/" + Usage_times, "utf8"));
    // 获取用户信息
    const userId = e.msg.author.id;
    const userName = e.msg.author.username;
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
            "用户频道ID": userId,
        }
    };
    // 将用户信息存储
    fs.writeFileSync(dirpath + "/" + Usage_times, JSON.stringify(userCounts, null, "\t"));
    const 次数文件 = JSON.parse(fs.readFileSync(dirpath + "/" + Usage_times, "utf8"));
    const 次数 = 次数文件[`${userId}`]["使用次数"]

    let i = Math.round(Math.random() * (cnl.length - 1))
    let m = Math.round(Math.random() * (fzy.length - 1))
  let Textreply = [
    `@${userName}`,
    '我的超能力',
    weather_icon,
    [
      `你的超能力是：\n「${cnl[i]}」\n但是副作用是：\n「${fzy[m]}」\n获取超能力：${次数}次`
    ]
  ] as [title: string, prompt: string, url: string, arr: any[]]
	e.reply('', segment.embed(...Textreply));
	return true;
  }
}