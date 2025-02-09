/**
 * Аналог htmlspecialchars_decode из php
 *
 * Для декодирования htmlspecialcharsbx() вызвать htmlspecialchars_decode("<p>this -&gt; &quot;</p>", 'ENT_NOQUOTES')
 * @param {*} string
 * @param {*} quoteStyle
 * @returns
 */
function htmlspecialchars_decode(string, quoteStyle) {
    let optTemp = 0
    let i = 0
    let noquotes = false

    if (typeof quoteStyle === 'undefined')
    {
        quoteStyle = 2
    }
    string = string.toString().replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    const OPTS = {
        ENT_NOQUOTES: 0,
        ENT_HTML_QUOTE_SINGLE: 1,
        ENT_HTML_QUOTE_DOUBLE: 2,
        ENT_COMPAT: 2,
        ENT_QUOTES: 3,
        ENT_IGNORE: 4,
    }
    if (quoteStyle === 0) {
        noquotes = true
    }
    if (typeof quoteStyle !== 'number')
    {
        quoteStyle = [].concat(quoteStyle)
        for (i = 0; i < quoteStyle.length; i++) {
            if (OPTS[quoteStyle[i]] === 0)
            {
                noquotes = true
            } else
            if (OPTS[quoteStyle[i]])
            {
                optTemp = optTemp | OPTS[quoteStyle[i]]
            }
        }
        quoteStyle = optTemp
    }
    if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE)
    {
        string = string.replace(/&#0*39;/g, "'")
    }
    if (!noquotes)
    {
        string = string.replace(/&quot;/g, '"')
    }
    string = string.replace(/&amp;/g, '&')

    return string
}

function videos() {
    const videos = document.querySelectorAll("[data-js='video']");

    if(videos.length < 1) return

    videos.forEach(video => {
        const videoPlayBtn = video.querySelector("[data-js='videoBtnPlay']");
        const videoFrame = video.querySelector("[data-js='videoFrame']");
        const videoPoster = video.querySelector("[data-js='videoPoster']");
    
        videoPlayBtn.addEventListener('click', () => {
            videoPlayBtn.remove()
            videoPoster.remove()
            videoFrame.innerHTML = htmlspecialchars_decode(videoFrame.dataset.video || '')

            let player = videoFrame.querySelector('iframe')
            let playerSrc = player.getAttribute('src')

            if(playerSrc.includes('rutube')) {
                player.addEventListener("load", function() {
                    player.contentWindow.postMessage(JSON.stringify({
                        type: 'player:play',
                        data: {}
                    }), '*');
                })
            }
        })
    })
 
}