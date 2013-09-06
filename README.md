FloatingTips
============

A Mootools plugin for creating floating balloon tips that nicely appears when hovering an element.
High customizable using options (tooltip position, centering, arrow size, distance, animation, etc).

![Screenshot](https://github.com/lorenzos/FloatingTips/raw/master/Graphics/logo.png)


How to use
----------

JS sample:

	#JS

	// Create a simple tips for all <a> elements
	new FloatingTips('a'); // Title attribute will be used as tip.

	// A customized tip for all <span class="custom"> elements
	new FloatingTips('span.custom', {

		// Content can also be a function of the target element!
		content: function(e) { return 'I am ' + e.getSize().x + ' px wide! :)'; },

		position: 'bottom', // Bottom positioned
		center: false,      // Place the tip aligned with target
		arrowSize: 12,      // A bigger arrow!

	});

HTML code:

	#HTML

	<a href="#" title="This is a tooltip">Simple tip</a>
	<span class="custom">Custom tip</span>

CSS tip styling:

	#CSS

	.floating-tip {
		background-color: black;
		padding: 5px 15px;
		color: #dddddd;
		font-weight: bold;
		font-size: 11px;
		-moz-border-radius: 3px;
		-webkit-border-radius: 3px;
		border-radius: 3px;
	}


Docs
----

**Implements:** Options, Events

**Syntax:**

	#JS

	var myTips = new FloatingTips(elements, options);

- **elements**: Elements that will trigger floating tips; can an be a string selector or an element collection.
- **options**: (*object*) Options for the class. They are all listed below.

**Options:**

- **position**: Tip position, can be "top", "right", "bottom", "left" or "inside" (default `"top"`).
- **fixed**: If the tip should be placed in fixed position (default `FALSE`). This allows you to have tips on fixed elements, that do no scroll on page scrolling.
- **center**: If the tip will be placed centered on the target element (default `TRUE`).
- **content**: (*string or function*) If this is a string, the content of the tip will be the value of the target element attribute with that name (example `"title"`, default); if this is a function, the content will be the value returned by the function, that can accept an argument that is the target element (see **How to use** or **Demo**).
- **html**: If the tooltip content must be interpreted as HTML code (default `FALSE`); if this is TRUE and `content` option is a function that returns an HTML element, inner HTML of that returned element is used as tip content.
- **balloon**: `TRUE` if the tip is a balloon with a small triangle pointing the target element (default `TRUE`).
- **arrowSize**: Size in pixel of the small triangle in the balloon (default `6`).
- **arrowOffset**: Distance in pixel of the small triangle from the edge of the balloon when `center` option is `FALSE` (default `6`).
- **distance**: Distance in pixel of the tip from the target element (default `3`).
- **motion**: Distance in pixel that the tip will cover during in/out animation (default `6`).
- **motionOnShow**: If the tip will animate when showing (default `TRUE`).
- **motionOnHide**: If the tip will animate when hiding (default `TRUE`).
- **showOn**: When to show the tip, can be any event of the target element (default `"mouseenter"`), or `null` when to never show the tip.
- **hideOn**: When to hide the tip, can be any event of the target element (default `"mouseleave"`), or `null` when to never hide the tip.
- **hideOnTipOutsideClick**: Will hide the tip if the mouse is clicked somewhere outside the tip itself or the triggering element (default `FALSE`). Especially useful for dialog-like tips which stay on the page until manual action.
- **discrete**: Whether to show only one tip of the same group at the same time (default `FALSE`). The "same group" is considered the elements which have been passed to the `FloatingTips` instance in the constructor or being `attach()`ed later on.
- **showDelay**: The delay the show event is fired (default `0`).
- **hideDelay**: The delay the hide event is fired (default `0`).
- **className**: The class name the tip container will get; necessary for styling (default `"floating-tip"`).
- **identifier**: An identifier for the tip instance, will be added as class name to the outermost tooltip element.
- **offset**: An object like `{x: 0, y: 0}` (default), that specify the distance of the tip from its normal position.
- **fx**: An object for additional `Fx` options (default `{'duration': 'short'}`).

**Events:**

- **show(tip, element)**: Fires when the tip appears. `tip` is the tip element, `element` is the target element.
- **hide(tip, element)**: Fires when the tip disappears. `tip` is the tip element, `element` is the target element.

**Methods:**

- **attach(elements)**: Adds other elements that will trigger floating tips; can an be a string selector or an element collection.
- **detach(elements)**: Remove floating tips triggering from elements; can an be a string selector or an element collection.
- **show(element)**: Manually show the tip on target `element`.
- **hide(element)**: Manually hide the tip for `element`.
- **toggle(element)**: Manually toggle the tip for `element`.

**Element and Elements methods:**

You can use some shortcut methods on **Element** and **Elements** for creating and showing tips.

	#JS

	$$('a').floatingTips(options); // Create tips
	$('myLink').floatingTipsShow(); // Show one
	var myTips = $('myLink').get('floatingTips'); // Get instance

- **Elements.floatingTips(options)**: Creates a new instance of FloatingTips on elements.
- **Element.floatingTips(options)**: Creates a new instance of FloatingTips on the element.
- **Element.floatingTipsShow()**: Show the tip on the element.
- **Element.floatingTipsHide()**: Hide the tip on the element.
- **Element.floatingTipsToggle()**: Toggles the tip on the element.
- **Element.get('floatingTips')**: Retrieves the instance of FloatingTips of the element.


FloatingTips.Dialog
-------------------

**FloatingTips.Dialog** is an extra class that extends **FloatingTips** to let you create dialog boxes that appears near target element (for example, on an important link for asking for confirmation).

To learn more on how to use it, see **[HowTo](https://github.com/lorenzos/FloatingTips/wiki/Howto)** and **[Docs](https://github.com/lorenzos/FloatingTips/wiki/Docs)** wiki pages on Github.