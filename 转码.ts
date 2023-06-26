import { plugin, Messagetype, createQrcode } from 'alemon'

export class 转码 extends plugin {
    constructor() {
        super({
            rule: [
                {
                    reg: '^转码(.*)$',
                    fnc: '转码'
                }
            ]
        })
    }
    async 转码(e: Messagetype) {
        const url = e.msg.content.replace(/#|(<@![0-9a-zA-Z]+>| |转码)/g, "")
        const img = await createQrcode(url)
        if (img) e.postImage(img)
        return false
    }
}