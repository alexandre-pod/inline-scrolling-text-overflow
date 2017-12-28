# inline-scrolling-text-overflow

This library provides an easy way to make text scrolling when overflowing


## How to use this library

To use this lib, you have to import the library script and style in your html with:

```html
<link rel="stylesheet" href="path/to/scrolling-text-lib.css">
<script src="path/to/scrolling-text-lib.js">
```

To create a scrollable overflowing text, here the steps to follow

```html
<div>
	<span id="autoScroll">Your text here</span>
</div>
```

```JavaScript
// Getting the text element that will scroll if needed
var textElement = document.querySelector('#autoScroll');

// adding the textElement to the lib, it will makes it scroll if it does not fit in its parent element
ScrollingTextLib.add(textElement);

// if you need to remove the element from the lib
ScrollingTextLib.remove(textElement);
```

When the window is resized, the css variables will be updated and the text will scroll if needed.
If the content of the text element is changed, it is needed to recall the `ScrollingTextLib.add` method to update the values.

## Example

A simple example is presented in the [example.html](example.html) file
[Demo](https://alexandre-pod.github.io/inline-scrolling-text-overflow/example.html)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

