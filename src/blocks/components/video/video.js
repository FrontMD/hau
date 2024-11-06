function videoControlInit() {
    const videoContainers = document.querySelectorAll("[data-js='videoContainer']");

    if(videoContainers.length < 1) return

    videoContainers.forEach(videoContainer => {
        const videoBtnsBlock = videoContainer.querySelector("[data-js='videoBtnsBlock']");
        const videoPlayBtn = videoBtnsBlock.querySelector("[data-js='videoBtnPlay']");
        const videoPauseBtn = videoBtnsBlock.querySelector("[data-js='videoBtnPause']");
        const videoElement = videoContainer.querySelector("video");
    
        if(window.innerWidth > 1024) {
            videoContainer.addEventListener('mouseover', () => {
                videoElement.setAttribute('controls', '');
                videoBtnsBlock.classList.add("active");
            })
            videoContainer.addEventListener('mouseout', () => {
                videoElement.removeAttribute('controls');
                videoBtnsBlock.classList.remove("active");
            })
        } else {
            let btnDeleteTimer;
            videoContainer.addEventListener('click', () => {
                videoElement.setAttribute('controls', '');
                clearInterval(btnDeleteTimer);
    
                const startTime = new Date;
    
                btnDeleteTimer = setInterval(function() {
                    const now = new Date();
                    const diff = now - startTime;
                    if(diff > 2500) {
                        videoElement.removeAttribute('controls');
                        clearInterval(btnDeleteTimer);
                    }
                }, 300);
            })
        }
    
    
        videoPlayBtn.addEventListener('click', () => {
            videoElement.play();
        })
    
        videoPauseBtn.addEventListener('click', () => {
            videoElement.pause();
        })
    
        videoElement.addEventListener("pause", () => {
            videoPauseBtn.classList.remove('active')
            videoPlayBtn.classList.add('active')
        })
    
        videoElement.addEventListener("play", () => {
            videoPlayBtn.classList.remove('active')
            videoPauseBtn.classList.add('active')
        })
    })
 
}