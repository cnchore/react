import getUserAgent from "./GetUserAgent";

export default function ensureVisible(e){
    let browser = getUserAgent();
    if (browser.isiOS) {
        setTimeout(function(e,c){
            scrolling(e,c);
        }, 10, e, 0);
    }
 
}
function scrolling(e, c) {
        e.scrollIntoView();
        if (c < 50) setTimeout(function(e,c){
            scrolling(e,c);
        }, 10, e, c + 1);
};
 
