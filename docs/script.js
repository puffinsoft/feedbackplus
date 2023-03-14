(function () {
    const clipboardData = {
        npm: "npm i feedbackplus\nimport FeedbackPlus from 'feedbackplus'",
        html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.css" />\n<script src="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.js" defer></script>`
    }

    $('.terminal-copy').click(function () {
        const clipboardKey = $(this).data('clipboard-key')
        navigator.clipboard.writeText(clipboardData[clipboardKey]).then(() => {
            $(this).hide().siblings('.terminal-copied').show()
            setTimeout(() => {
                $(this).show().siblings('.terminal-copied').hide()
            }, 1250)
        })
    })

    $('.installation-option').click(function(){
        $('.installation-option').removeClass('active-option')
        $(this).addClass('active-option')
        const id = $(this).data('id')
        $('.installation .option').hide()
        $(`.installation .option[data-id="${id}"]`).show()
    })

    hljs.highlightAll();
})()