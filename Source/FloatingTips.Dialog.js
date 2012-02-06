/*
---
description: Creates balloon dialogs with action buttons when clicking an element

license: MIT-style

authors:
- Lorenzo Stanco

requires:
- core/1.3: '*'

provides: [FloatingTips.Dialog]

...
*/

FloatingTips.Dialog = new Class({

	Extends: FloatingTips,
	
	options: {
		showOn: 'click',
		hideOn: 'never',
		buttons: { },
		buttonsClassName: ''
	},
	
	initialize: function(element, text, options) {
		
		// Setup options
		this.setOptions(options);
		
		// Store element reference
		this.element = $(element);
		
		// Create buttons
		var s = this;
		var buttonsIndex = 0;
		var buttonsWrapper = new Element('p');
		Object.each(this.options.buttons, function(buttonCallback, buttonCaption) {
			var button = new Element('button', { type: 'button' });
			if (s.options.buttonsClassName) button.addClass(s.options.buttonsClassName);
			button.addClass(s.options.className + '-button' + ++buttonsIndex);
			button.set('text', buttonCaption).addEvent('click', buttonCallback.pass([ s.element, button, s ], s));
			buttonsWrapper.adopt(button);
		});
		
		// Create tip content
		var contentText = new Element('p', { 'text': text });
		var content = new Element('div').adopt(contentText, buttonsWrapper);
		this.options.content = function() { return content; };
		this.options.html = true;
		this.options.html_adopt = true;
		
		// Call FloatingTips constructor
		this.parent([this.element]);
		
	},
	
	popup: function() {
		this.show(this.element);
	},
	
	dismiss: function() {
		this.hide(this.element);
	}
	
});