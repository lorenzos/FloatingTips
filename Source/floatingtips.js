/*
---
description: Class for creating floating balloon tips that nicely appears when hovering an element.

license: MIT-style

authors:
- Lorenzo Stanco

requires:
- core/1.3: '*'

provides: [FloatingTips]

...
*/

var FloatingTips = new Class({

	Implements: [Options, Events],

	options: {
		content: 'title',
		html: false,
		baloon: true,
		arrowSize: 6,
		arrowOffset: 6,
		distance: 6,
		motion: 6,
		motionOnShow: true,
		motionOnHide: true,
		showDelay: 0,
		hideDelay: 0,
		className: 'floating-tip',
		position: 'top',
		center: true,
		offset: {x: 0, y: 0},
		fx: { 'duration': 'short' }
	},

	initialize: function(elements, options) {
		this.setOptions(options);
		if (elements) this.attach(elements);
		return this;
	},

	attach: function(elements) {
		var self = this;
		$$(elements).each(function(e) {
			e.addEvents({
				'mouseenter': function() { self.show(this); },
				'mouseleave': function() { self.hide(this); }
			});
		});
		return this;
	},

	show: function(element) {
		var old = element.retrieve('floatingtip');
		if (old) old.destroy();
		var tip = this._create(element);
		element.store('floatingtip', tip);
		this._animate(tip, 'in');
		this.fireEvent('show', [tip, element]);
		return this;
	},
	
	hide: function(element) {
		var tip = element.retrieve('floatingtip');
		if (!tip) return
		this._animate(tip, 'out');
		this.fireEvent('hide', [tip, element]);
		return this;
	},
	
	_create: function(elem) {
		
		var o = this.options; 
		var opos = o.position;
		
		var cnt = (typeof(o.content) == 'string' ? elem.get(o.content) : o.content(elem));
		var cwr = new Element('div').addClass(o.className);
		var tip = new Element('div').addClass(o.className + '-wrapper').adopt(cwr);
		if (cnt) { if (o.html) cwr.set('html', typeof(cnt) == 'string' ? cnt : cnt.get('html')); else cwr.set('text', cnt); }
		
		var body = $(document.body);
		tip.setStyles({ 'position': 'absolute', 'opacity': 0 }).inject(body);
		
		if (o.baloon) {
			
			var trg = new Element('div').addClass(o.className + '-triangle');
			var trgSt = { 'border-color': cwr.getStyle('background-color'), 'border-width': o.arrowSize, 'border-style': 'solid','width': 0, 'height': 0 };
			
			switch (opos) {
				case 'top':	trgSt['border-bottom-width'] = 0; break;
				case 'right': trgSt['border-left-width'] = 0; trgSt['float'] = 'left'; cwr.setStyle('margin-left', o.arrowSize); break;
				case 'bottom': trgSt['border-top-width'] = 0; break;
				case 'left': trgSt['border-right-width'] = 0; trgSt['float'] = 'right'; cwr.setStyle('margin-right', o.arrowSize); break;
			}
			
			switch (opos) {
				case 'top': case 'bottom': 
					trgSt['border-left-color'] = trgSt['border-right-color'] = 'transparent';
					trgSt['margin-left'] = o.center ? tip.getSize().x / 2 - o.arrowSize : o.arrowOffset; break;
				case 'left': case 'right': 
					trgSt['border-top-color'] = trgSt['border-bottom-color'] = 'transparent';
					trgSt['margin-top'] = o.center ?  tip.getSize().y / 2 - o.arrowSize : o.arrowOffset; break;
			}
			
			trg.setStyles(trgSt).inject(tip, opos == 'top' ? 'bottom' : 'top');
			
		}
		
		var tipSz = tip.getSize(), trg = elem.getCoordinates(body);
		var pos = { x: trg.left + o.offset.x, y: trg.top + o.offset.y };
		switch (opos) {
			case 'top':		pos.y -= tipSz.y + o.distance; break;
			case 'right': 	pos.x += trg.width + o.distance; break;
			case 'bottom': 	pos.y += trg.height + o.distance; break;
			case 'left': 	pos.x -= tipSz.x + o.distance; break;
		}

		if (o.center) {
			switch (opos) {
				case 'top': case 'bottom': pos.x += (trg.width / 2 - tipSz.x / 2); break;
				case 'left': case 'right': pos.y += (trg.height / 2 - tipSz.y / 2); break;
			}
		}
		
		tip.set('morph', o.fx).store('position', pos);
		tip.setStyles({ 'top': pos.y, 'left': pos.x });
		
		return tip;
		
	},
	
	_animate: function(tip, d) {
		
		clearInterval(tip.retrieve('timeout'));
		tip.store('timeout', (function() { 
			
			var o = this.options, din = (d == 'in');
			var m = { 'opacity': din ? 1 : 0 };
			
			if ((o.motionOnShow && din) || (o.motionOnHide && !din)) {
				var pos = tip.retrieve('position');
				switch (o.position) {
					case 'top':		m['top']  = din ? [pos.y - o.motion, pos.y] : pos.y - o.motion; break;
					case 'right': 	m['left'] = din ? [pos.x + o.motion, pos.x] : pos.x + o.motion; break;
					case 'bottom': 	m['top']  = din ? [pos.y + o.motion, pos.y] : pos.y + o.motion; break;
					case 'left': 	m['left'] = din ? [pos.x - o.motion, pos.x] : pos.x - o.motion; break;
				}
			}
			
			tip.morph(m); 
			
		}).delay(this.options.showDelay, this));
		
		return this;
		
	}

});

