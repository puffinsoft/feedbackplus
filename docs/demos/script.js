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
            showScreenshotLoading()
            feedbackPlus.capture().then(bitmap => {
                tooltip.hide()
                hideScreenshotLoading()
                screenshot = bitmap;
                updateResultCanvas()
            }).catch(e => hideScreenshotLoading())
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
        tooltip.show()
    })

    function updateResultCanvas() {
        screenshotButton.style.display = "none"
        screenshotResult.style.display = "block"
        const newHeight = (screenshot.height / screenshot.width) * 330
        screenshotCanvas.width = 330;
        screenshotCanvas.height = newHeight;
        screenshotCanvas.getContext('2d').drawImage(screenshot.bitmap, 0, 0, 330, newHeight)
    }

    function showScreenshotLoading(){
        document.getElementById("screenshot-button-notloading").style.display = "none";
        document.getElementById("screenshot-button-loading").style.display = "block";
    }

    function hideScreenshotLoading(){
        document.getElementById("screenshot-button-notloading").style.display = "block";
        document.getElementById("screenshot-button-loading").style.display = "none";
    }

    const tooltip = tippy(screenshotButton, {
        content: 'Try it out!',
        placement: 'right'
    })
    tooltip.show()
})();