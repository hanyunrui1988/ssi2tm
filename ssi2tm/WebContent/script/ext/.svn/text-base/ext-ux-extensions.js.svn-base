/**
 * @function ext功能扩展
 * @author yang_jinlong
 * 
 */

// 扩展关闭TabPanel标签
Ext.ux.TabCloseMenu = function() {
	var tabs, menu, ctxItem;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	}
	function onContextMenu(ts, item, me) {
		if (!menu) { // create context menu on first right click
			menu = new Ext.menu.Menu([{
						id : tabs.id + '-close',
						text : '关闭当前标签',
						iconCls : "closetabone",
						handler : function() {
							tabs.remove(ctxItem);
						}
					}, {
						id : tabs.id + '-close-others',
						text : '除此之外全部关闭',
						iconCls : "closetaball",
						handler : function() {
							tabs.items.each(function(item) {
										if (item.closable && item != ctxItem) {
											tabs.remove(item);
										}
									});
						}
					}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each(function() {
					if (this != item && this.closable) {
						disableOthers = false;
						return false;
					}
				});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		var _menuWidth = 200;
		if(me.getXY()[0] > (document.body.clientWidth - _menuWidth)){
			menu.showAt([(document.body.clientWidth - _menuWidth),me.getXY()[1]]);
		}else{
			menu.showAt(me.getXY());
		}
	}
};

// #region Ext.form.NumberField
Ext.ux.NumberField = function NumberField(fName, fLabel, defaultValue,
		allowDecimals, allowNegative, maxValue, minValue) {
	// / <summary>
	// / Ext.form.NumberField封装
	// / </summary>
	// / <param name="fName">name</param>
	// / <param name="fLabel">fieldLabel</param>
	// / <param name="defaultValue">默认值</param>
	// / <param name="allowDecimals">是否允许小数点</param>
	// / <param name="allowNegative">是否允许负数</param>
	// / <param name="maxValue">最大值</param>
	// / <param name="minValue">最小值</param>
	// / <returns>Ext.form.NumberField</returns>
	var number = new Ext.form.NumberField();

	if (fName != null)
		number.name = fName;

	if (fLabel != null)
		number.fieldLabel = fLabel;

	// 设置默认值
	if (defaultValue != null && typeof(defaultValue) == "number")
		number.setValue(defaultValue);

	// 设置是否允许小数点，默认(不设置)为不允许
	if (allowDecimals != null && typeof(allowDecimals) == "boolean")
		number.allowDecimals = Boolean(allowDecimals);

	// 设置是否允许负数，默认(不设置)为不允许
	if (allowNegative != null && typeof(allowNegative) == "boolean")
		number.allowNegative = Boolean(allowNegative);

	// 设置最大值
	if (maxValue != null && typeof(maxValue) == "number")
		number.maxValue = Number(maxValue);

	// 设置最小值
	if (minValue != null && typeof(minValue) == "number")
		number.minValue = Number(minValue);

	return number;
}
// #endregion

Ext.ns('Ext.ux.form');

// 文件上传控件
/**
 * @class Ext.ux.form.FileUploadField
 * @extends Ext.form.TextField Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField, {
			/**
			 * @cfg {String} buttonText The button text to display on the upload
			 *      button (defaults to 'Browse...'). Note that if you supply a
			 *      value for {@link #buttonCfg}, the buttonCfg.text value will
			 *      be used instead if available.
			 */
			buttonText : '选择文件...',
			/**
			 * @cfg {Boolean} buttonOnly True to display the file upload field
			 *      as a button with no visible text field (defaults to false).
			 *      If true, all inherited TextField members will still be
			 *      available.
			 */
			buttonOnly : false,
			/**
			 * @cfg {Number} buttonOffset The number of pixels of space reserved
			 *      between the button and the text field (defaults to 3). Note
			 *      that this only applies if {@link #buttonOnly} = false.
			 */
			buttonOffset : 3,
			/**
			 * @cfg {Object} buttonCfg A standard {@link Ext.Button} config
			 *      object.
			 */

			// private
			readOnly : true,

			/**
			 * @hide
			 * @method autoSize
			 */
			autoSize : Ext.emptyFn,

			// private
			initComponent : function() {
				Ext.ux.form.FileUploadField.superclass.initComponent.call(this);

				this.addEvents(
						/**
						 * @event fileselected Fires when the underlying file
						 *        input field's value has changed from the user
						 *        selecting a new file from the system file
						 *        selection dialog.
						 * @param {Ext.ux.form.FileUploadField}
						 *            this
						 * @param {String}
						 *            value The file value returned by the
						 *            underlying file input field
						 */
						'fileselected');
			},

			// private
			onRender : function(ct, position) {
				Ext.ux.form.FileUploadField.superclass.onRender.call(this, ct,
						position);

				this.wrap = this.el.wrap({
							cls : 'x-form-field-wrap x-form-file-wrap'
						});
				this.el.addClass('x-form-file-text');
				this.el.dom.removeAttribute('name');
				this.createFileInput();

				var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
							text : this.buttonText
						});
				this.button = new Ext.Button(Ext.apply(btnCfg, {
							renderTo : this.wrap,
							cls : 'x-form-file-btn'
									+ (btnCfg.iconCls ? ' x-btn-icon' : '')
						}));

				if (this.buttonOnly) {
					this.el.hide();
					this.wrap.setWidth(this.button.getEl().getWidth());
				}

				this.bindListeners();
				this.resizeEl = this.positionEl = this.wrap;
			},

			bindListeners : function() {
				this.fileInput.on({
							scope : this,
							mouseenter : function() {
								this.button.addClass(['x-btn-over',
										'x-btn-focus'])
							},
							mouseleave : function() {
								this.button.removeClass(['x-btn-over',
										'x-btn-focus', 'x-btn-click'])
							},
							mousedown : function() {
								this.button.addClass('x-btn-click')
							},
							mouseup : function() {
								this.button.removeClass(['x-btn-over',
										'x-btn-focus', 'x-btn-click'])
							},
							change : function() {
								var v = this.fileInput.dom.value;
								this.setValue(v);
								this.fireEvent('fileselected', this, v);
							}
						});
			},

			createFileInput : function() {
				this.fileInput = this.wrap.createChild({
							id : this.getFileInputId(),
							name : this.name || this.getId(),
							cls : 'x-form-file',
							tag : 'input',
							type : 'file',
							size : 1
						});
			},

			reset : function() {
				this.fileInput.remove();
				this.createFileInput();
				this.bindListeners();
				Ext.ux.form.FileUploadField.superclass.reset.call(this);
			},

			// private
			getFileInputId : function() {
				return this.id + '-file';
			},

			// private
			onResize : function(w, h) {
				Ext.ux.form.FileUploadField.superclass.onResize
						.call(this, w, h);

				this.wrap.setWidth(w);

				if (!this.buttonOnly) {
					var w = this.wrap.getWidth()
							- this.button.getEl().getWidth()
							- this.buttonOffset;
					this.el.setWidth(w);
				}
			},

			// private
			onDestroy : function() {
				Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
				Ext.destroy(this.fileInput, this.button, this.wrap);
			},

			onDisable : function() {
				Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
				this.doDisable(true);
			},

			onEnable : function() {
				Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
				this.doDisable(false);

			},

			// private
			doDisable : function(disabled) {
				this.fileInput.dom.disabled = disabled;
				this.button.setDisabled(disabled);
			},

			// private
			preFocus : Ext.emptyFn,

			// private
			alignErrorIcon : function() {
				this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
			}

		});

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField);

// backwards compat
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;

/*
 * ! Ext JS Library 3.0.0 Copyright(c) 2006-2009 Ext JS, LLC licensing@extjs.com
 * http://www.extjs.com/license
 */

/**
 * @class Ext.ux.form.FileUploadField
 * @extends Ext.form.TextField Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.FileUpDownloadField = Ext.extend(Ext.form.TextField, {
			/**
			 * @cfg {String} buttonText The button text to display on the upload
			 *      button (defaults to 'Browse...'). Note that if you supply a
			 *      value for {@link #buttonCfg}, the buttonCfg.text value will
			 *      be used instead if available.
			 */
			buttonText : 'Browse...',
			/**
			 * @cfg {Boolean} buttonOnly True to display the file upload field
			 *      as a button with no visible text field (defaults to false).
			 *      If true, all inherited TextField members will still be
			 *      available.
			 */
			buttonOnly : false,
			/**
			 * @cfg {Number} buttonOffset The number of pixels of space reserved
			 *      between the button and the text field (defaults to 3). Note
			 *      that this only applies if {@link #buttonOnly} = false.
			 */
			buttonOffset : 3,
			/**
			 * @cfg {Object} buttonCfg A standard {@link Ext.Button} config
			 *      object.
			 */

			// private
			readOnly : true,
			// 是否需要有上传按钮
			upload : true,
			/**
			 * @hide
			 * @method autoSize
			 */
			autoSize : Ext.emptyFn,

			// private
			initComponent : function() {
				Ext.ux.form.FileUpDownloadField.superclass.initComponent
						.call(this);

				this.addEvents(
						/**
						 * @event fileselected Fires when the underlying file
						 *        input field's value has changed from the user
						 *        selecting a new file from the system file
						 *        selection dialog.
						 * @param {Ext.ux.form.FileUploadField}
						 *            this
						 * @param {String}
						 *            value The file value returned by the
						 *            underlying file input field
						 */
						'fileselected');
			},

			// private
			onRender : function(ct, position) {
				Ext.ux.form.FileUpDownloadField.superclass.onRender.call(this,
						ct, position);
				if (this.upload)// 上传下载都有
				{
					this.wrap = this.el.wrap({
								cls : 'x-form-field-wrap x-form-file-wrap'
							});
					this.wrap1 = this.el.wrap({
								cls : 'x-form-field-wrap x-form-file-wrap1'
							});
					this.el.addClass('x-form-file-text');
					this.el.dom.removeAttribute('name');

					this.fileInput = this.wrap.createChild({
								id : this.getFileInputId(),
								name : this.name || this.getId(),
								cls : 'x-form-file',
								tag : 'input',
								type : 'file',
								size : 1
							});

					var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
								text : this.buttonText
							});
					this.button = new Ext.Button(Ext.apply(btnCfg, {
								renderTo : this.wrap,
								cls : 'x-form-file-btn'
										+ (btnCfg.iconCls ? ' x-btn-icon' : '')
							}));

					this.download = this.wrap1.createChild({
								id : this.getFileInputId() + '-download',
								name : this.name || this.getId() + '-download',
								cls : 'x-form-file1',
								tag : 'input',
								type : 'hidden',
								size : 1
							});
					btnCfg.iconCls = 'download-icon';

					this.btndownload = new Ext.Button(Ext.apply(btnCfg, {
								renderTo : this.wrap1,
								filevalue : this.value,
								cls : 'x-form-file-btn1'
										+ (btnCfg.iconCls ? ' x-btn-icon' : ''),
								handler : downloadingFile
							}));
				} else// 只有下载，没有上传
				{
					this.wrap = this.el.wrap({
								cls : 'x-form-field-wrap x-form-file-wrap1'
							});
					this.el.addClass('x-form-file-text');
					this.el.dom.removeAttribute('name');
					this.fileInput = this.wrap.createChild({
								id : this.getFileInputId(),
								name : this.name || this.getId(),
								cls : 'x-form-file1',
								tag : 'input',
								type : 'hidden',
								size : 1
							});
					var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
								text : this.buttonText
							});
					btnCfg.iconCls = 'download-icon';
					this.btndownload = new Ext.Button(Ext.apply(btnCfg, {
								renderTo : this.wrap,
								filevalue : this.value,
								cls : 'x-form-file-btn1'
										+ (btnCfg.iconCls ? ' x-btn-icon' : ''),
								handler : downloadingFile
							}));
				}
				this.value = getftpnamefromftpvalue(this.value);
				if (this.buttonOnly) {
					this.el.hide();
					this.wrap.setWidth(this.button.getEl().getWidth());
				}

				this.fileInput.on('change', function() {
							var v = this.fileInput.dom.value;
							this.setValue(v);
							this.fireEvent('fileselected', this, v);
						}, this);
			},

			// private
			getFileInputId : function() {
				return this.id + '-file';
			},

			// private
			onResize : function(w, h) {
				Ext.ux.form.FileUpDownloadField.superclass.onResize.call(this,
						w, h);

				this.wrap.setWidth(w);

				if (!this.buttonOnly) {
					if (this.upload) {
						var w = this.wrap.getWidth()
								- this.button.getEl().getWidth()
								- this.btndownload.getEl().getWidth()
								- this.buttonOffset;
						this.el.setWidth(w);
					} else {
						var w = this.wrap.getWidth()
								- this.btndownload.getEl().getWidth()
								- this.buttonOffset;
						this.el.setWidth(w);
					}
				}
			},

			// private
			onDestroy : function() {
				Ext.ux.form.FileUpDownloadField.superclass.onDestroy.call(this);
				Ext.destroy(this.fileInput, this.button, this.wrap);
			},

			// private
			preFocus : Ext.emptyFn,

			// private
			getResizeEl : function() {
				return this.wrap;
			},

			// private
			getPositionEl : function() {
				return this.wrap;
			},

			// private
			alignErrorIcon : function() {
				this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
			}

		});

Ext.reg('fileupdownloadfield', Ext.ux.form.FileUpDownloadField);
Ext.reg('httpfileupdownloadfield', Ext.ux.form.FileUpDownloadField);
// backwards compat
Ext.form.FileUpDownloadField = Ext.ux.form.FileUpDownloadField;