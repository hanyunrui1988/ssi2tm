Ext.Ajax.on('requestexception', function(conn, response, options) {
	var errCode = response.status;
	var errMsg = '';
	switch (errCode) {
	case 403: {
		errMsg = '服务器拒绝该请求。';
		break;
	}
		;
	case 404: {
		errMsg = '请求的资源不存在。';
		break;
	}
		;
	case 503: {
		errMsg = '系统正在维护，请稍后再试。';
		break;
	}
		;
	case 500: {
		errMsg = '系统正在维护，请稍后再试。';
		break;
	}
		;
	default: {
		errMsg = '未知错误代码:' + errCode + '。';
		break;
	}
	}
	Ext.Ajax.abort();
	Ext.MessageBox.show( {
		title : '提示',
		msg : errMsg,
		buttons : Ext.MessageBox.OK,
		width : 300,
		height : 200,
		icon : Ext.MessageBox.ERROR
	});
});

Ext.Ajax.on('requestcomplete', function(conn, response, options) {
	try {
		var text = response.responseText.trim();
		var jsonReturn = Ext.util.JSON.decode(text);
		if (jsonReturn && jsonReturn.exception) {
			Ext.Ajax.abort();
			if (ies.com.len) {
				ies.com.showDlg(jsonReturn.message, jsonReturn.msg);
				ies.com.len = false;
			}
		}
	} catch (e) {
		Ext.Ajax.abort();
	}

});
// 表单提交失败
ies.formSubmitException = function(action) {
	try {
		var text = action.response.responseText.trim();
		var jsonReturn = Ext.util.JSON.decode(text);
		if (jsonReturn && jsonReturn.exception) {
			Ext.Ajax.abort();
			ies.com.showDlg(jsonReturn.message, jsonReturn.msg);
		}
	} catch (e) {
		Ext.Ajax.abort();
		// Ext.Msg.alert('错误', '抱歉，系统发生未知错误:');
	}
};
