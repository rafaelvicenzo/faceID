const video = document.getElementById('video')

async function startVideo() {
    constraints = {video: true}

    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints)

        video.srcObject = stream
        video.onloadedmetadata = () => {
            video.play()
        }
    } catch (error) {
        console.log(error)
    }
}

startVideo();