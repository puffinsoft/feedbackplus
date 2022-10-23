(function () {
    const screenshotButton = document.getElementById("screenshot-button")

    const screenshotResult = document.getElementById("screenshot-result")
    const screenshotCanvas = document.getElementById("screenshot-canvas")

    const screenshotEdit = document.getElementById("screenshot-edit")
    const screenshotDelete = document.getElementById("screenshot-delete")
    const feedbackPlus = new FeedbackPlus()

    const snackbar = document.getElementById("feedbackplus-snackbar")

    let screenshot;
    screenshotButton.addEventListener('click', function () {
        if (FeedbackPlus.isSupported()) {
            feedbackPlus.capture().then(bitmap => {
                screenshot = bitmap;
                updateResultCanvas()
            })
        } else {
            snackbar.MaterialSnackbar.showSnackbar({
                message: 'Your device does not support this feature',
                timeout: 5000,
            })
        }
    })

    screenshotEdit.addEventListener('click', function () {
        feedbackPlus.showEditDialog(screenshot.bitmap, function (canvas) {
            FeedbackPlus.canvasToBitmap(canvas).then(bitmap => {
                screenshot = bitmap;
                updateResultCanvas()
                feedbackPlus.closeEditDialog()
            })
        }, function () {
            feedbackPlus.closeEditDialog()
        })
    })

    screenshotDelete.addEventListener('click', function () {
        screenshot = null;
        screenshotButton.style.display = "block"
        screenshotResult.style.display = "none"
    })

    function updateResultCanvas() {
        screenshotButton.style.display = "none"
        screenshotResult.style.display = "block"
        const newHeight = (screenshot.height / screenshot.width) * 330
        screenshotCanvas.width = 330;
        screenshotCanvas.height = newHeight;
        screenshotCanvas.getContext('2d').drawImage(screenshot.bitmap, 0, 0, 330, newHeight)
    }
})();