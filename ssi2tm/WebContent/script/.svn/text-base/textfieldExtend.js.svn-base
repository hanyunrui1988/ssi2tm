/**
 * @class Ext.form.TextField
 * @override Ext.form.TextField
 * @description 修改TextField的默认提示信息,并支持中文2位的计算
 */
Ext.form.TextField.prototype.validateValue = function(value) {
	// 重写验证涵数
	if (this.allowBlank == false) { // 不允许为空
		if (value == null || value == '') {
			this.markInvalid(String.format(this.blankText, value));
			return false;
		}
	}
	var maxLen = null;
	if (this.xtype == 'textfield') {
		if (this.maxLength == null || this.maxLength == '') {
			return true;
		} else {
			maxLen = this.maxLength;
		}
	}
	if (value == null || value == '') {
		return true;
	} else {
		if (maxLen != null && maxLen != 'undefined' && maxLen > 0) {
			var regex = /[^\x00-\xff]/g; // 中文正则
			var len;
			len = value.replace(regex, '**').length;
			var label = this.fieldLabel;
			if (label != null && label != 'undefined') {
				// 去掉fieldLabel中生成的不必要字符
				if (label.indexOf('</') != -1) {
					label = label.substring(label.lastIndexOf('>') + 1,
							label.length);
				}
				if (len > maxLen) {
					// 验证未通过,并设置提示信息
					this.markInvalid(String.format(label + '长度不能大于' + maxLen
							+ '位!(中文占2位)'));
					return false;
				}
				return true;
			}
		} else {
			return true;
		}
	}

};

Ext.form.TextArea.prototype.validateValue = function(value) {
	// 重写验证涵数
	if (this.allowBlank == false) { // 不允许为空
		if (value == null || value == '') {
			this.markInvalid(String.format(this.blankText, value));
			return false;
		}
	}
	var maxLen = null;
	if (this.xtype == 'textarea') {
		if (this.maxLength == null || this.maxLength == '') {
			return true;
		} else {
			maxLen = this.maxLength;
		}
	}
	if (value == null || value == '') {
		return true;
	} else {
		if (maxLen != null && maxLen != 'undefined' && maxLen > 0) {
			var regex = /[^\x00-\xff]/g; // 中文正则
			var len;
			len = value.replace(regex, '**').length;
			var label = this.fieldLabel;
			if (label != null && label != 'undefined') {
				// 去掉fieldLabel中生成的不必要字符
				if (label.indexOf('</') != -1) {
					label = label.substring(label.lastIndexOf('>') + 1,
							label.length);
				}
				if (len > maxLen) {
					// 验证未通过,并设置提示信息
					this.markInvalid(String.format(label + '长度不能大于' + maxLen
							+ '位!(中文占2位)'));
					return false;
				}
				return true;
			}
		} else {
			return true;
		}
	}

};
