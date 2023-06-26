import { plugin, Messagetype, segment } from 'alemon'

export class UniCode extends plugin {
  constructor () {
    super({
      rule: [
        {
          reg: '^UC转中(.*)',
          fnc: 'UniCode转中'
        }, {
          reg: '^中转UC(.*)',
          fnc: '中转UniCode'
        }
      ]
    })
  }

  async UniCode转中(e: Messagetype) {
    const unicodeString = e.msg.content.replace(/#|(<@![0-9a-zA-Z]+>| |UC转中)/g, "").trim();
    const chineseString = unicodeToChinese(unicodeString);
    e.reply(`转换结果：${chineseString}`, segment.reply(e.msg.id))
    return false
  }
  async 中转UniCode(e: Messagetype) {
    const chineseString = e.msg.content.replace(/#|(<@![0-9a-zA-Z]+>| |中转UC)/g, "").trim();
    const unicodeString = chineseToUnicode(chineseString);
    e.reply(`转换结果：${unicodeString}`, segment.reply(e.msg.id))
    return false
  }
}
function chineseToUnicode(chinese) {
  const utf8 = encodeURIComponent(chinese);
  const unicode = utf8.replace(/%/g, '\\').toLowerCase();
  return unicode;
}
function unicodeToChinese(unicode) {
  const utf8 = unicode.replace(/\\/g, '%');
  const chinese = decodeURIComponent(utf8);
  return chinese;
}
