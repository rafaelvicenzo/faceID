const video = document.getElementById('video')

async function startVideo() {
    constraints = {video: true}

    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints)

        cam.srcObject = stream
        cam.onloadedmetadata = () => {
            cam.play()
        }
    } catch (error) {
        console.log(error)
    }
}

startVideo();