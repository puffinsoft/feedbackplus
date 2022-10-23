# Documentation

## Import

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.css" />
<script src="https://cdn.jsdelivr.net/gh/ColonelParrot/feedbackplus@master/src/feedbackplus.min.js" defer></script>
```

Importing html2canvas is optional, but will provide better browser support:

```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js" defer></script>
```

## Snippets

Instantiation:

```js
const feedbackPlus = new FeedbackPlus();
```

Capture screenshot and draw it to a canvas:

```js
const canvas = document.getElementById("canvas");
feedbackPlus.capture().then(({ bitmap, width, height }) => {
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d").drawImage(bitmap, 0, 0);
});
```

Check whether FeedbackPlus is supported (also checks for html2canvas):

```js
if (FeedbackPlus.isSupported()) {
  // capture screenshot
} else {
  alert("Sorry, your device does not support this feature");
}
```

Show edit dialog for screenshot:

```js
feedbackPlus.showEditDialog(
  bitmap,
  function (canvas) {
    // done
    FeedbackPlus.canvasToBitmap(canvas).then(({ bitmap }) => {
      drawBitmapToCanvas(bitmap);
      feedbackPlus.closeEditDialog();
    });
  },
  function () {
    // cancel
    feedbackPlus.closeEditDialog();
  }
);
```

## Core Methods

- `capture(timeout)` - *Promise* - captures a screenshot of the current page
- `showEditDialog(bitmap, onComplete, onCancel)` - shows a dialog that allows user to edit the bitmap
- `isSupported()` - *boolean* - checks whether the current browser supports FeedbackPlus
- `closeEditDialog()` - closes the edit dialog
- `canvasToBitmap(canvas)` - *Promise* - converts a canvas to `ImageBitmap`, can be used when the user finishes editing their screenshot

### `capture(timeout)`

Captures a screenshot of the current page.

By default it uses the browser's display API to take the screenshot. However, if the device does not support it and html2canvas has been imported, it will use html2canvas instead.

**Parameters**:

- `timeout = 500` - the timeout to wait before the screenshot is taken. Useful if you want to wait for any animations or the browser display modal to finish/close before taking the screenshot


**Return value**:

An `ImageBitmap` of the screen. This can then be drawn to a canvas via the [`drawImage`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) method

### `showEditDialog(bitmap, onComplete, onCancel)`

Shows a dialog to edit the bitmap passed as a parameter.

Supports highlighting and hiding info.

**Parameters**:

- `bitmap` - an `ImageBitmap` that will be edited
- `onComplete` - callback called when the user finished editing. Has a parameter: `canvas`, the result of the editing
- `onCancel` - callback called if the user cancels

### `isSupported()`

Checks whether the user's browser/device supports FeedbackPlus. Will account for the presence of html2canvas.

**Return value**:

`true` if supported, `false` if not.

### `closeEditDialog()`

Closes the edit dialog. Each dialog is associated with an instance of the class.

Should be called in the `onCOmplete` and `onCancel` callbacks for `showEditDialog`.

### `canvasToBitmap(canvas)`

Converts a canvas to an `ImageBitmap`. Should be used on the `canvas` in the `onComplete` callback to convert it to a bitmap, which can then be redrawn to the canvas.

**Parameters**:

- `bitmap` - an `ImageBitmap`

<hr>
Happy hacking!