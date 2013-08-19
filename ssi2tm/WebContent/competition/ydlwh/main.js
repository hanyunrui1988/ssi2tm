/**
 * @function 用电量查询
 * @author hanyr
 * 
 */
Ext.namespace('ies.ydlwh');
ies.ydlwh._grid = null;
ies.ydlwh._gongdianform = null;
ies.ydlwh._gongdianwindow = null;
Ext
		.onReady(function() {
			Ext.QuickTips.init();
			Ext.form.Field.prototype.msgTarget = 'side';

			// --------------------------------------grid---------------------------------
			ies.ydlwh.initGrid = function() {

				// 角色记录数据类型
				var recordType = Ext.data.Record.create([ {
					name : "ORGCODE",
					mapping : "ORGCODE",
					type : "string"
				}, {
					name : "ORGNAME",
					mapping : "ORGNAME",
					type : "string"
				}, {
					name : "LEVEL",
					mapping : "LEVEL",
					type : "string"
				}, {
					name : "SXSJ",
					mapping : "SXSJ",
					type : "string"
				}, {
					name : "SHXSJ",
					mapping : "SHXSJ",
					type : "string"
				} ]);

				var store = new Ext.data.Store({
					sortInfo : {
						field : "ORGCODE",
						direction : "DESC"
					},
					remoteSort : true,
					proxy : new Ext.data.HttpProxy({
						url : ies.webRoot + '/org_select.do'
					}),
					reader : new Ext.data.JsonReader({
						root : 'rows',
						totalProperty : 'results'
					}, recordType)
				});
				var rownum = new Ext.grid.RowNumberer({
					header : '序号',
					width : 35,
					align : 'center'
				});

				var sm = new Ext.grid.CheckboxSelectionModel({
					dataIndex : 'ID'
				});
				// grid行样式
				var columnModel = new Ext.grid.ColumnModel([ sm, rownum, {
					header : '代码',
					width : 300,
					hidden : true,
					sortable : true,
					align : 'center',
					dataIndex : 'ORGCODE'
				}, {
					header : '单位名称',
					width : 300,
					sortable : true,
					align : 'center',
					dataIndex : 'ORGNAME'
				}, {
					header : '层级',
					width : 300,
					sortable : true,
					align : 'center',
					dataIndex : 'LEVEL'
				}, {
					header : '生效时间',
					width : 300,
					sortable : true,
					align : 'center',
					dataIndex : 'SXSJ'
				}, {
					header : '失效时间',
					width : 300,
					sortable : true,
					align : 'center',
					dataIndex : 'SHXSJ'
				} ]);

				// 成员管理grid
				var grid = new Ext.grid.GridPanel({
					iconCls : 'icon-pub1',
					ds : store,
					frame : true,
					columnLines : true,
					viewConfig : {
						forceFit : true
					},
					sm : sm,
					listeners : {
						'rowdblclick' : function(event) {
							ies.ydlwh.see();
						}

					},
					cm : columnModel,
					autoSizeColumns : true,
					selModel : new Ext.grid.RowSelectionModel(),
					loadMask : true
				});
				store.baseParams['father'] = ies.tree.code;
				store.load();
				ies.ydlwh._grid = grid;
				return grid;
			};
			// ---------------------------------edit--------------------------
			ies.ydlwh.edit = function() {
				var grid = ies.ydlwh._grid;
				var selModel = grid.getSelectionModel();
				if (selModel.getCount() == 1) {
					var ORGCODE = selModel.getSelections()[0].get("ORGCODE");
					if (!ies.ydlwh._gongdianwindow) {
						ies.ydlwh._gongdianwindow = ies.ydlwh.initWindow();
					}
					ies.ydlwh._gongdianwindow.show();
					ies.ydlwh._gongdianwindow.getTopToolbar().items.get(1).hide();
					ies.ydlwh._gongdianform.getForm().reset();
					ies.ydlwh._gongdianform.getForm().load({
						url : ies.webRoot + '/org_edit.do',
						params : {
							ORGCODE : ORGCODE
						},
						method : 'post',
						waitTitle : "提示",
						waitMsg : "正在获取数据",
						failure : function(form, action) {
							ies.ydlwh._gongdianwindow.hide();
							ies.com.showDlg('加载失败');
						},
						success : function(form, action) {

						}
					});
				} else {
					ies.com.showDlg("请选择一条记录", '');
				}
			}
			// ---------------------------------add-------------------------------------
			ies.ydlwh.add = function() {

				var grid = ies.ydlwh._grid;
				if (!ies.ydlwh._gongdianwindow) {
					ies.ydlwh._gongdianwindow = ies.ydlwh.initWindow();
				}
				ies.ydlwh._gongdianform.getForm().reset();
				ies.ydlwh._gongdianform.find('name', 'FATHERNAME')[0]
						.setValue(ies.tree.text);
				ies.ydlwh._gongdianform.find('name', 'FATHER')[0]
						.setValue(ies.tree.code);
				ies.ydlwh._gongdianwindow.show();
			};

			// -------------------------delete-----------------------
			ies.ydlwh.deletes = function() {
				var grid = ies.ydlwh._grid;
				var selModel = grid.getSelectionModel();
				if (selModel.getCount() == 0) {
					ies.com.showDlg("请选择一条记录", '');
				} else {
					var records = selModel.getSelections();
					var objIds = [];

					for ( var i = 0; i < records.length; i++) {
						objIds.push(records[i].get("ORGCODE"));
					}
					Ext.Ajax
							.request({
								url : ies.webRoot + '/org_delete.do',
								method : 'POST',
								waitTitle : "提示",
								waitMsg : "正在提交……",
								async : false, // 默认为true异步提交，false为同步提交
								params : {
									ids : objIds
								},
								success : function(response, options) {
									ies.tree.root.reload();
									ies.ydlwh._grid.getStore().reload();
									ies.ydlwh.showW = ies.com.dlg.initWin(
											"删除组织机构成功", '');
									ies.ydlwh.showW.show();
									window.setTimeout(
											"ies.ydlwh.showW.close()", 2000);
								}
							});
				}

			};

			// -------------------------------关闭window-------------
			ies.ydlwh._break = function() {
				ies.ydlwh._gongdianwindow.hide();
			};
			
			//----------------------------保存并继续-------------------
			ies.ydlwh.goon = function() {
				var grid = ies.ydlwh._grid;
				var selModel = grid.getSelectionModel();
					var ORGCODE = selModel.getSelections()[0].get("ORGCODE");
					ies.ydlwh._gongdianform.getForm().submit({
						url : ies.webRoot + '/org_update.do',
						method : 'post',
						waitTitle : "提示",
						waitMsg : '正在提交数据...',
						success : function(form, action) {
							ies.ydlwh.showW = ies.com.dlg.initWin("更新组织机构成功", '');
							ies.ydlwh.showW.show();
							window.setTimeout("ies.ydlwh.showW.close()", 2000);

						}
					});
			}

			//---------------------------save----------------
			ies.ydlwh.save = function() {
				ies.ydlwh._gongdianform.getForm().submit({
					url : ies.webRoot + '/org_save.do',
					method : 'post',
					waitTitle : "提示",
					waitMsg : '正在提交数据...',
					success : function(form, action) {
						ies.ydlwh._gongdianwindow.hide();
						ies.ydlwh._grid.getStore().load();
						ies.tree.root.reload();
						// ies.qyfw.wdgc.fqht.form.getForm().reset();
						ies.ydlwh.showW = ies.com.dlg.initWin("新增组织机构成功", '');
						ies.ydlwh.showW.show();
						window.setTimeout("ies.ydlwh.showW.close()", 2000);

					}
				});
			}

			ies.ydlwh.initWindow = function() {
				// 用户窗口
				var window = new Ext.Window({
					width : 500,
					height : 550,
					resizable : false,
					title : '<center>新增组织机构</center>',
					plain : false,
					border : false,
					maximized : true,
					closeAction : 'close',
					modal : true,
					bodyBorder : false,
					autoScroll : true,
					layout : 'fit',
					closeAction : 'hide',
					items : [ ies.ydlwh.gongdianForm() ],
					tbar : [ {
						text : '保存',
						width : '10px',
						iconCls : 'icon-setRole',
						handler : ies.ydlwh.save
					}, {
						text : '保存并继续',
						width : '10px',
						iconCls : 'icon-setRole',
						handler : ies.ydlwh.goon
					}, {
						text : '关闭',
						width : '10px',
						iconCls : 'icon-setRole',
						handler : ies.ydlwh._break
					} ]
				});
				return window;

			};
			ies.ydlwh.gongdianForm = function() {
				var form = new Ext.form.FormPanel({
					frame : true,
					bodyBorder : false,
					autoScroll : true,
					labelWidth : 80,
					// bodyStyle : 'padding:2px 10px 10px 2px;',
					items : [ {
						labelWidth : 80,
						layout : 'form',
						bodyBorder : false,
						buttonAlign : 'right',
						items : [
								{
									name : 'FATHER',
									xtype : 'textfield',
									fieldLabel : '父组织机构代码',
									readOnly : true,
									width : 350,
									maxLength : 60,
									value : ies.tree.code
								},
								{
									name : 'FATHERNAME',
									xtype : 'textfield',
									fieldLabel : '父组织机构名称',
									readOnly : true,
									width : 350,
									maxLength : 20,
									value : ies.tree.text
								},{
									xtype:'hidden',
									name : 'ID'
								},
								{
									name : 'ORGCODE',
									xtype : 'textfield',
									fieldLabel : '组织机构编码',
									width : 350,
									maxLength : 60
								},
								{
									width : 350,
									name : 'ORGNAME',
									fieldLabel : '组织机构名称',
									xtype : 'textfield'
								},
								{
									hiddenName : 'LEVEL',
									xtype : 'combo',
									fieldLabel : '层级',
									width : 350,
									store : new Ext.data.SimpleStore({
										fields : [ 'stateType', 'stateValue' ],
										data : [ [ '0', '省级' ], [ '1', '市级' ],
												[ '2', '县级' ] ]
									}),
									typeAhead : true,
									triggerAction : 'all',
									forceSelection : true,
									selectOnFocus : true,
									mode : 'local',
									valueField : 'stateType',
									displayField : 'stateValue'
								}, {
									name : 'SXSJ',
									xtype : 'datetime',
									format : 'Y-m-d H:i',
									fieldLabel : '生效时间',
									width : 350,
									maxLength : 10
								}, {
									name : 'SHXSJ',
									xtype : 'datetime',
									format : 'Y-m-d H:i',
									fieldLabel : '失效时间',
									width : 350,
									maxLength : 1000
								}, {
									name : 'DESC',
									xtype : 'textarea',
									fieldLabel : '描述',
									width : 350,
									height : 90,
									maxLength : 1000
								} ]
					} ]
				});
				ies.ydlwh._gongdianform = form;
				return form;
			};

			ies.ydlwh.initTree = ies.tree.getTreePanel();

			ies.tree.treepanel
					.on(
							"click",
							function(node) {
								ies.tree.text = node.attributes.text;
								ies.tree.level = node.attributes.level;
								ies.tree.code = node.attributes.code;
								ies.ydlwh._grid.getStore().baseParams['father'] = node.attributes.code;
								ies.ydlwh._grid.getStore().load();
								ies.tree.root.reload();
							});

			ies.ydlwh.viewport = new Ext.Viewport({
				layout : 'border',
				hideBorder : false,
				forceLayout : true,
				items : [ new Ext.Panel({
					layout : 'column',
					region : 'north',
					items : [ {
						xtype : 'button',
						name : 'search',
						iconCls : 'icon_query',
						text : "<h1>新增</h1>",
						handler : ies.ydlwh.add
					}, {
						xtype : 'button',
						name : 'search',
						iconCls : 'icon_query',
						text : "<h1>删除</h1>",
						handler : ies.ydlwh.deletes
					}, {
						xtype : 'button',
						name : 'search',
						iconCls : 'icon_query',
						text : "<h1>编辑</h1>",
						handler : ies.ydlwh.edit
					} ]
				}), ies.ydlwh.initTree, new Ext.Panel({
					layout : 'border',
					region : 'center',
					items : [ {
						region : 'center',
						layout : 'fit',
						border : false,
						items : [ ies.ydlwh.initGrid() ]
					} ]
				}) ]
			});

		});