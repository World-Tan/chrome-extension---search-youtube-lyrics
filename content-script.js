let title = null, subtitle = null, pt = null, pst = null;
let win = null;

async function main(){
    //console.log(subtitle?.textContent +": "+title?.textContent)
    let url = "https://www.google.com/search?q=" + encodeURIComponent((subtitle ?? "") + " " + (title ?? "") + " lyrics");
    if (win) chrome.runtime.sendMessage({ action: "closeTab", id: win });
    win = await chrome.runtime.sendMessage({ action: "openTab", url: url });
}

var timer = setInterval(() => {
    title = document.querySelector("h3.yt-video-attribute-view-model__title")?.textContent
    subtitle = document.querySelector("h4.yt-video-attribute-view-model__subtitle")?.textContent
    if (((title !== null && title !== undefined) || (subtitle !== null && subtitle !== undefined))
        && (title !== pt || subtitle !== pst)){
        main()
    }
    pt = title
    pst = subtitle
}, 200)