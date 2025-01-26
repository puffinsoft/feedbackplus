<p align="center">
    <br/>
    <img src="docs/images/logo_sm.png"/>
    <br/>
</p>

<p align="center">
    <a href="https://GitHub.com/puffinsoft/feedbackplus/stargazers/"><img src="https://img.shields.io/github/stars/puffinsoft/feedbackplus.svg?style=social&label=Star"></a>
    <br />
    <br />
    <a href="https://www.jsdelivr.com/package/gh/ColonelParrot/feedbackplus"><img src="https://data.jsdelivr.com/v1/package/gh/ColonelParrot/feedbackplus/badge"></a>
    <a href="https://cdnjs.com/libraries/feedbackplus"><img src="https://img.shields.io/cdnjs/v/feedbackplus"></a>
    <a href="https://npmjs.com/package/feedbackplus"><img src="https://badgen.net/npm/dw/feedbackplus"></a>
    <br />
    <a href="https://github.com/puffinsoft/feedbackplus/blob/master/LICENSE"><img src="https://img.shields.io/github/license/puffinsoft/feedbackplus.svg"></a>
    <a href="https://GitHub.com/puffinsoft/feedbackplus/releases/"><img src="https://img.shields.io/github/release/puffinsoft/feedbackplus.svg"></a>
    <a href="https://npmjs.com/package/feedbackplus"><img src="https://badgen.net/npm/v/feedbackplus"></a>
</p>

<p align="center">
  <a href="https://nodei.co/npm/feedbackplus/"><img src="https://nodei.co/npm/feedbackplus.png"></a>
</p>

<p align="center">
FeedbackPlus is an open source Javascript library that allows you to add <b>screenshot taking</b> & <b>screenshot editing</b> functionality to your feedback forms.
<br/> <br/>
Available for use by <a href="https://github.com/puffinsoft/feedbackplus/wiki#import">cdn</a> or via <a href="https://www.npmjs.com/package/feedbackplus">npm</a>
<br/> <br/>
The project is inspired by Google's <i>report an issue</i> widget, which allows you to take & edit screenshots. Under the hood, it uses the browser display API and fallbacks to <a href="https://github.com/niklasvh/html2canvas">html2canvas</a> if available (see <a href="https://github.com/ColonelParrot/feedbackplus/wiki#browser-support-bonus">here</a>)
</p>

<h2 align="center">Preview (<a href="https://colonelparrot.github.io/feedbackplus/demos/demo.html">demo</a>)</h2>

| Taking a Screenshot                           | Editing screenshot                                    |
| --------------------------------------------- | ----------------------------------------------------- |
| <img src="docs/images/FeedbackPlus_Demo.gif"> | <img src="docs/images/FeedbackPlus_Editing_Demo.gif"> |

<p align="center">(click images to enlarge)</p>

## Quickstart

For more detailed instructions, see the [documentation](https://github.com/puffinsoft/feedbackplus/wiki)

You can find bare-minimum demo code for screenshotting & screenshot editing in the [demo/simple](/docs/demos/simple/) folder

### Import

npm:

```js
$ npm i feedbackplus
import FeedbackPlus from 'feedbackplus'
```

cdn via [jsDelivr](https://www.jsdelivr.com/package/gh/ColonelParrot/feedbackplus) (or with [cdnjs](https://cdnjs.com/libraries/feedbackplus)):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.css" />
<script src="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.js" defer></script>
<!-- html2canvas import is optionally, but provides better browser support -->
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js" defer></script>
```

```js
const feedbackPlus = new FeedbackPlus();
```

### Capture Screenshot

<sup>...and draw to canvas</sup>

```js
const canvas = document.getElementById("canvas");
feedbackPlus.capture().then(({ bitmap, width, height }) => {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0);
});
```

### Showing Edit Dialog for Screenshot

```js
feedbackPlus.showEditDialog(bitmap, function (canvas) {
    // user completed edit
    FeedbackPlus.canvasToBitmap(canvas).then(({ bitmap }) => {
      canvas.getContext("2d").drawImage(bitmap, 0, 0);
      feedbackPlus.closeEditDialog();
    });
  }, function () {
    // user cancelled edit
    feedbackPlus.closeEditDialog();
});
```
