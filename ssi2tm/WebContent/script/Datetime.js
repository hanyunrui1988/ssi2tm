/**
 * @class Ext.menu.Adapter
 * @extends Ext.menu.BaseItem A base utility class that adapts a non-menu
 *          component so that it can be wrapped by a menu item and added to a
 *          menu. It provides basic rendering, activation management and
 *          enable/disable logic required to work in menus.
 * @constructor Creates a new Adapter
 * @param {Object}
 *            config Configuration options
 */
Ext.menu.Adapter = function(component, config) {
	Ext.menu.Adapter.superclass.constructor.call(this, config);
	this.component = component;
};
Ext.extend(Ext.menu.Adapter, Ext.menu.BaseItem, {
			// private
			canActivate : true,

			// private
			onRender : function(container) {
				this.component.render(container);
				this.el = this.component.getEl();
			},

			// private
			activate : function() {
				if (this.disabled) {
					return false;
				}
				this.component.focus();
				this.fireEvent("activate", this);
				return true;
			},

			// private
			deactivate : function() {
				this.fireEvent("deactivate", this);
			},

			// private
			disable : function() {
				this.component.disable();
				Ext.menu.Adapter.superclass.disable.call(this);
			},
			// private
			enable : function() {
				this.component.enable();
				Ext.menu.Adapter.superclass.enable.call(this);
			}
		});
/*
 * ! Ext JS Library 3.0.0 Copyright(c) 2009-2010 sunlingjun
 * sunlingjun@foxmail.com 安装控件: 导入该文件,导入该文件样式或添加样式到ext-all.css[推荐]
 *  使用方法:
 * (1)完全同datefield,但可不必指定format 使用'Y-m-d H:i:s'替代了默认的'y年m月d日'[本土化后]',指定format将使用指定格式,例如:'Y-m-d'
 * (2)支持多个datetime出现在同一页面,互不干扰,能使用datefield的位置就能使用datetime
 * 销毁方法:
 * (1)主动调用destroy
 * (2)调用父容器例如form的销毁[推荐]
 */
/**
 * @class Ext.ux.Datetime
 * @extends Ext.form.DateField datetime 控件[带时分日期控件,秒的意义不大] class.
 * @constructor Create a new Ext.ux.Datetime
 * @param {Object}
 *            config The config object
 * @xtype datetime
 */
Ext.ux.DatetimePicker = function(a) {
	Ext.ux.DatetimePicker.superclass.constructor.call(this, a)
};
Ext.extend(Ext.ux.DatetimePicker, Ext.DatePicker, {
	prevHourText : "上一小时",
	nextHourText : "下一小时",
	hourText : "请选择小时",
	prevMinuteText : "上一分钟",
	nextMinuteText : "下一分钟",
	minuteText : "请选择分钟",
	hourName : "时",
	minuteName : "分",
	selectToday : function() {
		this.setValue(new Date().clearTime());
		var a = this.value;
		a.setHours(this.theHours);
		a.setMinutes(this.theMinutes);
		this.fireEvent("select", this, a);
	},
	handleDateClick : function(c, a) {
		c.stopEvent();
		if (a.dateValue && !Ext.fly(a.parentNode).hasClass("x-date-disabled")) {
			this.setValue(new Date(a.dateValue));
			var b = this.value;
			b.setHours(this.theHours);
			b.setMinutes(this.theMinutes);
			this.fireEvent("select", this, b);
		}
	},
	onRender : function(a, h) {
		this.pkId = Ext.id();
		var e = [
				'<table cellspacing="0">',
				'<tr><td class="x-date-left"><a href="#" title="',
				this.prevText,
				'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',
				this.nextText, '">&#160;</a></td></tr>',
				'<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'];
		var g = this.dayNames;
		for (var f = 0; f < 7; f++) {
			var j = this.startDay + f;
			if (j > 6) {
				j = j - 7
			}
			e.push("<th><span>", g[j].substr(0, 1), "</span></th>")
		}
		e[e.length] = "</tr></thead><tbody><tr>";
		for (var f = 0; f < 42; f++) {
			if (f % 7 == 0 && f != 0) {
				e[e.length] = "</tr><tr>"
			}
			e[e.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
		}
		e
				.push(
						"</tr></tbody></table></td></tr>",
						'<tr><td colspan="3" class="minutecss" align="center"><table cellspacing="0"><tr>',
						'<td class="y-hour-left"><a href="#" title="',
						this.prevHourText,
						'">&#160;</a></td><td class="y-hour-middle" align="center"></td><td class="y-hour-right"><a href="#" title="',
						this.nextHourText,
						'">&#160;</a></td>',
						'<td class="y-minute-left"><a href="#" title="',
						this.prevMinuteText,
						'">&#160;</a></td><td class="y-minute-middle" align="center"></td><td class="y-minute-right"><a href="#" title="',
						this.nextMinuteText,
						'">&#160;</a></td>',
						"</tr></table></tr>",
						this.showToday
								? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>'
								: "",
						'</table><div class="x-date-mp"></div>',
						'<div id="date-mp'+this.pkId+'" class="x-date-mp"></div><div id="hour-mp'+this.pkId+'" class="x-date-mp"></div><div id="minute-mp'+this.pkId+'" class="x-date-mp"></div>');
		var b = document.createElement("div");
		b.className = "x-date-picker";
		b.innerHTML = e.join("");
		a.dom.insertBefore(b, h);
		this.el = Ext.get(b);
		this.eventEl = Ext.get(b.firstChild);
		new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"), {
					handler : this.showPrevMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});
		new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"), {
					handler : this.showNextMonth,
					scope : this,
					preventDefault : true,
					stopDefault : true
				});
		new Ext.util.ClickRepeater(this.el.child("td.y-hour-left a"), {
					handler : function() {
						if (this.theHours > 0) {
							this.theHours--;
							this.theHours = this.theHours % 24;
							var d = "";
							if (this.theHours < 10) {
								d = "0" + this.theHours
							} else {
								d = this.theHours
							}
							this.hourLabel.update(d + this.hourName)
						}
					}.createDelegate(this),
					scope : this
				});
		new Ext.util.ClickRepeater(this.el.child("td.y-hour-right a"), {
					handler : function() {
						this.theHours++;
						this.theHours = this.theHours % 24;
						var d = "";
						if (this.theHours < 10) {
							d = "0" + this.theHours
						} else {
							d = this.theHours
						}
						this.hourLabel.update(d + this.hourName)
					}.createDelegate(this),
					scope : this
				});
		new Ext.util.ClickRepeater(this.el.child("td.y-minute-left a"), {
					handler : function() {
						if (this.theMinutes > 0) {
							this.theMinutes--;
							this.theMinutes = this.theMinutes % 60;
							var d = "";
							if (this.theMinutes < 10) {
								d = "0" + this.theMinutes
							} else {
								d = this.theMinutes
							}
							this.minuteLabel.update(d + this.minuteName)
						}
					}.createDelegate(this),
					scope : this
				});
		new Ext.util.ClickRepeater(this.el.child("td.y-minute-right a"), {
					handler : function() {
						this.theMinutes++;
						this.theMinutes = this.theMinutes % 60;
						var d = "";
						if (this.theMinutes < 10) {
							d = "0" + this.theMinutes
						} else {
							d = this.theMinutes
						}
						this.minuteLabel.update(d + this.minuteName)
					}.createDelegate(this),
					scope : this
				});
		this.eventEl.on("mousewheel", this.handleMouseWheel, this);
		this.monthPicker = Ext.get("date-mp"+this.pkId);
		this.monthPicker.enableDisplayMode("block");
		this.hoursPicker = Ext.get("hour-mp"+this.pkId);
		this.hoursPicker.enableDisplayMode("block");
		this.minutesPicker = Ext.get("minute-mp"+this.pkId);
		this.minutesPicker.enableDisplayMode("block");
		var l = new Ext.KeyNav(this.eventEl, {
					left : function(d) {
						d.ctrlKey ? this.showPrevMonth() : this
								.update(this.activeDate.add("d", -1))
					},
					right : function(d) {
						d.ctrlKey ? this.showNextMonth() : this
								.update(this.activeDate.add("d", 1))
					},
					up : function(d) {
						d.ctrlKey ? this.showNextYear() : this
								.update(this.activeDate.add("d", -7))
					},
					down : function(d) {
						d.ctrlKey ? this.showPrevYear() : this
								.update(this.activeDate.add("d", 7))
					},
					pageUp : function(d) {
						this.showNextMonth()
					},
					pageDown : function(d) {
						this.showPrevMonth()
					},
					enter : function(d) {
						d.stopPropagation();
						return true
					},
					scope : this
				});
		this.eventEl.on("click", this.handleDateClick, this, {
					delegate : "a.x-date-date"
				});
		this.el.unselectable();
		this.cells = this.el.select("table.x-date-inner tbody td");
		this.textNodes = this.el.query("table.x-date-inner tbody span");
		this.mbtn = new Ext.Button({
					text : "&#160;",
					tooltip : this.monthYearText,
					renderTo : this.el.child("td.x-date-middle", true)
				});
		this.mbtn.on("click", this.showMonthPicker, this);
		this.mbtn.el.child(this.mbtn.menuClassTarget)
				.addClass("x-btn-with-menu");
		var c = new Date();
		this.theHours = c.getHours();
		this.theMinutes = c.getMinutes();
		this.hourLabel = this.el.child("td.y-hour-middle");
		this.hourLabel.on("click", this.showHoursPicker, this);
		this.minuteLabel = this.el.child("td.y-minute-middle");
		this.minuteLabel.on("click", this.showMinutesPicker, this);
		if (this.showToday) {
			this.todayKeyListener = this.eventEl.addKeyListener(
					Ext.EventObject.SPACE, this.selectToday, this);
			var k = (new Date()).dateFormat(this.format);
			this.todayBtn = new Ext.Button({
						renderTo : this.el.child("td.x-date-bottom", true),
						text : String.format(this.todayText, k),
						tooltip : String.format(this.todayTip, k),
						handler : this.selectToday,
						scope : this
					})
		}
		if (Ext.isIE) {
			this.el.repaint()
		}
		this.update(this.value)
	},
	update : function(C, v) {
		var a = this.activeDate;
		this.activeDate = C;
		if (!v && a && this.el) {
			var k = C.getTime();
			if (a.getMonth() == C.getMonth()
					&& a.getFullYear() == C.getFullYear()) {
				this.cells.removeClass("x-date-selected");
				this.cells.each(function(d) {
							if (d.dom.firstChild.dateValue == k) {
								d.addClass("x-date-selected");
								setTimeout(function() {
											try {
												d.dom.firstChild.focus()
											} catch (i) {
											}
										}, 50);
								return false
							}
						});
				return
			}
		}
		var g = C.getDaysInMonth();
		var l = C.getFirstDateOfMonth();
		var c = l.getDay() - this.startDay;
		if (c <= this.startDay) {
			c += 7
		}
		var x = C.add("mo", -1);
		var e = x.getDaysInMonth() - c;
		var b = this.cells.elements;
		var m = this.textNodes;
		g += c;
		var r = 86400000;
		var z = (new Date(x.getFullYear(), x.getMonth(), e)).clearTime();
		var y = new Date().clearTime().getTime();
		var p = C.clearTime().getTime();
		var o = this.minDate
				? this.minDate.clearTime()
				: Number.NEGATIVE_INFINITY;
		var s = this.maxDate
				? this.maxDate.clearTime()
				: Number.POSITIVE_INFINITY;
		var B = this.disabledDatesRE;
		var n = this.disabledDatesText;
		var E = this.disabledDays ? this.disabledDays.join("") : false;
		var A = this.disabledDaysText;
		var u = this.format;
		var h = function(F, d) {
			d.title = "";
			var i = z.getTime();
			d.firstChild.dateValue = i;
			if (i == y) {
				d.className += " x-date-today";
				d.title = F.todayText
			}
			if (i == p) {
				d.className += " x-date-selected";
				setTimeout(function() {
							try {
								d.firstChild.focus()
							} catch (t) {
							}
						}, 50)
			}
			if (i < o) {
				d.className = " x-date-disabled";
				d.title = F.minText;
				return
			}
			if (i > s) {
				d.className = " x-date-disabled";
				d.title = F.maxText;
				return
			}
			if (E) {
				if (E.indexOf(z.getDay()) != -1) {
					d.title = A;
					d.className = " x-date-disabled"
				}
			}
			if (B && u) {
				var w = z.dateFormat(u);
				if (B.test(w)) {
					d.title = n.replace("%0", w);
					d.className = " x-date-disabled"
				}
			}
		};
		var q = 0;
		for (; q < c; q++) {
			m[q].innerHTML = (++e);
			z.setDate(z.getDate() + 1);
			b[q].className = "x-date-prevday";
			h(this, b[q])
		}
		for (; q < g; q++) {
			intDay = q - c + 1;
			m[q].innerHTML = (intDay);
			z.setDate(z.getDate() + 1);
			b[q].className = "x-date-active";
			h(this, b[q])
		}
		var D = 0;
		for (; q < 42; q++) {
			m[q].innerHTML = (++D);
			z.setDate(z.getDate() + 1);
			b[q].className = "x-date-nextday";
			h(this, b[q])
		}
		this.mbtn
				.setText(this.monthNames[C.getMonth()] + " " + C.getFullYear());
		if (this.theHours < 10) {
			txt = "0" + this.theHours
		} else {
			txt = this.theHours
		}
		this.hourLabel.update(txt + this.hourName);
		if (this.theMinutes < 10) {
			txt = "0" + this.theMinutes
		} else {
			txt = this.theMinutes
		}
		this.minuteLabel.update(txt + this.minuteName);
		if (!this.internalRender) {
			var f = this.el.dom.firstChild;
			var j = f.offsetWidth;
			this.el.setWidth(j + this.el.getBorderWidth("lr"));
			Ext.fly(f).setWidth(j);
			this.internalRender = true;
			if (Ext.isOpera && !this.secondPass) {
				f.rows[0].cells[1].style.width = (j - (f.rows[0].cells[0].offsetWidth + f.rows[0].cells[2].offsetWidth))
						+ "px";
				this.secondPass = true;
				this.update.defer(10, this, [C])
			}
		}
	},
	createHoursPicker : function() {
		if (!this.hoursPicker.dom.firstChild) {
			var a = ['<table  border="1" cellspacing="0"'];
			a
					.push(
							'<tr ><td class="x-date-middle" align="center" colspan="4">',
							this.hourText, "</td></tr>");
			for (var b = 0; b < 24; b += 4) {
				a.push('<tr><td class="x-date-mp-month"><a href="#">', b
								+ this.hourName, "</a></td>",
						'<td class="x-date-mp-month"><a href="#">', (b + 1)
								+ this.hourName, "</a></td>",
						'<td class="x-date-mp-month"><a href="#">', (b + 2)
								+ this.hourName, "</a></td>",
						'<td class="x-date-mp-month"><a href="#">', (b + 3)
								+ this.hourName, "</a></td></tr>")
			}
			a.push('</table>');
			this.hoursPicker.update(a.join(""));
			this.hoursPicker.on("click", this.onHourDblClick, this);
			this.mpHours = this.hoursPicker.select("td.x-date-mp-month");
			this.mpHours.each(function(c, d, e) {
						c.dom.xhour = e
					})
		}
	},
	showHoursPicker : function() {
		this.createHoursPicker();
		var a = this.el.getSize();
		this.hoursPicker.setSize(a);
		this.hoursPicker.child("table").setSize(a);
		this.updateMPHour(this.theHours);
		this.hoursPicker.slideIn("t", {
					duration : 0.2
				})
	},
	updateMPHour : function(a) {
		this.mpHours.each(function(b, c, d) {
					b[b.dom.xhour == a ? "addClass" : "removeClass"]("x-date-mp-sel")
				})
	},
	onHourDblClick : function(d, b) {
		d.stopEvent();
		var c = new Ext.Element(b), a;
		if (a = c.up("td.x-date-mp-month", 2)) {
			this.theHours = a.dom.xhour;
			this.hourLabel.update(this.theHours + this.hourName);
			this.hideHourPicker()
		}
	},
	hideHourPicker : function(a) {
		if (this.hoursPicker) {
			if (a === true) {
				this.hoursPicker.hide()
			} else {
				this.hoursPicker.slideOut("t", {
							duration : 0.2
						})
			}
		}
	},
	createMinutesPicker : function() {
		if (!this.minutesPicker.dom.firstChild) {
			var a = ['<table border="1" cellspacing="0"'];
			for (var b = 0; b < 55; b += 7) {
				a.push('<tr><td class="x-date-mp-month"><a href="#">', b,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 1,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 2,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 3,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 4,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 5,
						"</a></td>",
						'<td class="x-date-mp-month"><a href="#">', b + 6,
						"</a></td> </tr>")
			}
			a.push('<tr><td class="x-date-mp-month"><a href="#">56</a></td>',
					'<td class="x-date-mp-month"><a href="#">57</a></td>',
					'<td class="x-date-mp-month"><a href="#">58</a></td>',
					'<td class="x-date-mp-month"><a href="#">59</a></td>',
					'<td class="x-date-mp-month"><a href="#">60</a></td></tr>',
					'</table>');
			this.minutesPicker.update(a.join(""));
			this.minutesPicker.on("click", this.onMinuteDblClick, this);
			this.mpMinutes = this.minutesPicker.select("td.x-date-mp-month");
			this.mpMinutes.each(function(c, d, e) {
						c.dom.xminute = e
					})
		}
	},
	showMinutesPicker : function() {
		this.createMinutesPicker();
		var a = this.el.getSize();
		this.minutesPicker.setSize(a);
		this.minutesPicker.child("table").setSize(a);
		this.mpSelMinute = (this.activeDate || this.value).getHours();
		this.updateMPMinute(this.theMinutes);
		this.minutesPicker.slideIn("t", {
					duration : 0.2
				})
	},
	updateMPMinute : function(a) {
		this.mpMinutes.each(function(b, c, d) {
					b[b.dom.xminute == a ? "addClass" : "removeClass"]("x-date-mp-sel")
				})
	},
	onMinuteDblClick : function(d, b) {
		d.stopEvent();
		var c = new Ext.Element(b), a;
		if (a = c.up("td.x-date-mp-month", 2)) {
			this.theMinutes = a.dom.xminute;
			this.minuteLabel.update(this.theMinutes + this.minuteName);
			this.hideMinutePicker()
		}
	},
	hideMinutePicker : function(a) {
		if (this.hoursPicker) {
			if (a === true) {
				this.minutesPicker.hide()
			} else {
				this.minutesPicker.slideOut("t", {
							duration : 0.2
						})
			}
		}
	},
	destroy : function(){
            
        },
	nextYearText : "下一年 (Control+Up)",
	prevYearText : "上一年 (Control+Down)"
});
Ext.ux.DateTimeItem = function(a) {
	Ext.ux.DateTimeItem.superclass.constructor.call(this,
			new Ext.ux.DatetimePicker(a), a);
	this.picker = this.component;
	this.addEvents({
				select : true
			});
	this.picker.on("render", function(b) {
				b.getEl().swallowEvent("click");
				b.container.addClass("x-menu-date-item")
			});
	this.picker.on("select", this.onSelect, this)
};
Ext.extend(Ext.ux.DateTimeItem, Ext.menu.Adapter, {
			onSelect : function(b, a) {
				this.fireEvent("select", this, a, b);
			}
		});

Ext.ux.DateTimeMenu = function(a) {
	Ext.ux.DateTimeMenu.superclass.constructor.call(this, a);
	this.plain = true;
	var b = new Ext.ux.DateTimeItem(a);
	this.add(b);
	this.picker = b.picker;
	this.relayEvents(b, ["select"])
};
Ext.extend(Ext.ux.DateTimeMenu, Ext.menu.Menu, {
			cl : "x-date-menu",
			beforeDestroy : function() {
				this.picker.destroy();
			}
		});
Ext.ux.DateTime = Ext.extend(Ext.form.DateField, {
			initComponent : function() {
				this.menu = new Ext.ux.DateTimeMenu();
				if (this.format == 'y年m月d日')
					this.format = 'Y-m-d H:i:s';
				Ext.ux.DateTime.superclass.initComponent.call(this)
			}
		});
Ext.reg("datetime", Ext.ux.DateTime);