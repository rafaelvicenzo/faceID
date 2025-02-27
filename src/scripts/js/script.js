const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo)

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

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)

    const displaySize = {width: video.width, height: video.height}

    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async() => {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections)
    }, 100)
})

/*TROCAR O DETECTALLFACES POR SINGLE FACES*/

