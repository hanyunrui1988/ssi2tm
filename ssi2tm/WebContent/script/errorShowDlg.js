Ext.namespace('ies.com', 'ies.com.dlg');

ies.com.showDlg = null;
ies.com.dlg.win = null;
ies.com.len = true;
Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
	onRender : function(_, $) {
		if (!this.id)
			this.id = Ext.id();
		this.el = _.createChild( {
			tag : "iframe",
			id : "iframe-" + this.id,
			frameBorder : 0,
			src : this.url
		});
	},
	getContentWindow : function() {
		var _ = "iframe-" + this.id, $ = document.getElementById(_);
		return $.contentWindow;
	},
	onDestroy : function() {
		this.el.dom.src = "about:blank";
		Ext.ux.IFrameComponent.superclass.onDestroy.call(this);
	}
});
ies.com.showDlg = function(title, msg) {
	if (ies.com.len) {
		ies.com.dlg.initWin(title, msg).show();
	}
};
ies.com.dlg.initWin = function(title, msg) {
	ies.com.dlg.edits = [ new Ext.form.TextArea( {
		value : title,
		readOnly : true
	}), new Ext.form.TextArea( {
		value : msg,
		readOnly : true
	}) ];
	ies.com.dlg.win = new Ext.Window( {
		layout : "border",
		title : "\u63d0\u793a",
		width : 500,
		height : 155,
		closable : true,
		closeAction : "hide",
		maximizable : true,
		modal : true,
		border : false,
		listeners : {
			hide : function() {
				ies.com.len = true;
			}
		},
		tbar : [ {
			text : "\u5173\u95ed",
			iconCls : 'icon_delete',
			handler : function() {
				ies.com.dlg.win.hide();
			}
		} ],
		items : [ {
			layout : "border",
			autoScroll : true,
			region : "north",
			height : 70,
			border : false,
			items : [ {
				region : "center",
				border : false,
				layout : "fit",
				items : [ ies.com.dlg.edits[0] ]
			} ]
		}, {
			layout : "fit",
			autoScroll : true,
			region : "center",
			collapsible : true,
			collapsed : true,
			title : "\u8be6\u7ec6\u4fe1\u606f",
			border : false,
			listeners : {
				beforeexpand : function(_, $) {
					ies.com.dlg.win.setHeight(400);
				},
				beforecollapse : function(_, $) {
					ies.com.dlg.win.setHeight(155);
				}
			},
			items : [ ies.com.dlg.edits[1] ]
		} ]

	});
	return ies.com.dlg.win;
};