import getUserAgent from './GetUserAgent';

export default function addScrollIfIOS(elem) {
    if (!elem) return;
    let browser = getUserAgent();

    if (browser.isiOS) {
        elem.style.overflowY = 'scroll';
    }

    scrollFix(elem);
}

function scrollFix(elem) {
    console.log(elem);
    if (!elem) return;
    let startTopScroll;

    elem.addEventListener('touchstart', function(event) {
        startTopScroll = elem.scrollTop;

        if (startTopScroll <= 0)
            elem.scrollTop = 1;

        if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
};
