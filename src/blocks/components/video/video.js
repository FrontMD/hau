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
            videoFrame.innerHTML = videoFrame.dataset.video
        })
    })
 
}