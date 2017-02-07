export default function getUserAgent() {
    const ua = navigator.userAgent;
    const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
    const isiOS = (/\(i[^;]+;( U;)? CPU.+Mac OS X/).test(ua); //ios终端
    const isWeChat = (/micromessenger/i).test(ua); //微信

    return {
        isAndroid,
        isiOS,
        isWeChat
    }
}
