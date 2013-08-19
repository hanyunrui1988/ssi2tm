/**
 * @function 系统框架default.js
 * @author hanyr
 * 
 */
Ext.namespace('ies.main');

Ext.QuickTips.init();
ies.main.alldata = [];
ies.main._formMM = null;
ies.main.__MenuIconCls = [];
ies.main.responseObject;
ies.main.menus = [];
ies.main.__Menu = null;
ies.main._win = null;
ies.main.treepanel = null;
ies.main.westTemp = null;
ies.main.center = null;
ies.main.viewport = null;
ies.main.north = null;
ies.main.south = null;
ies.main.mc = null;
ies.main.yhmc = null;
Ext
		.onReady(function() {
			// 获取菜单栏目的
			var myJson = '{"menuList":[{"title":"1级","param":[],"type":"1"},{"title":"2级","param":[],"type":"2"}]}';
			var myJson2 = '{"title":"1级","param":[]}';
			ies.main.menus = jsonParse(myJson);
			ies.main.__Menu = jsonParse(myJson);
			ies.main.yhlx = '0';

			// 树
			// ---------------------------动态菜单的生成 begin
			// 树型框组件数组，其个是顶级菜单的个数
			var wests = [];
			// 树上面的9个菜单
			for ( var i = 0; i < ies.main.menus.menuList.length; i++) {
				var tItem = {
					text : ies.main.menus.menuList[i].title,
					leaf : true
				};
				ies.main.alldata.push(tItem);
			}
			var root = new Ext.tree.AsyncTreeNode({
				text : "root",
				draggable : false,
				expanded : true,
				children : [ {
					text : '组织机构维护',
					id : 'zzjgwh',
					href : 'competition/zzjgwh/main.jsp',
					leaf : true
				}, {
					text : '用电量维护',
					id : 'ydlwh',
					href : 'competition/ydlwh/main.jsp',
					leaf : true
				}, {
					text : '用电量查询',
					id : 'ydlcx',
					href : 'competition/3.jsp',
					leaf : true
				} ]
			});

			ies.main.treepanel = new Ext.tree.TreePanel(
					{
						autoScroll : true, // 如果超出范围带自动滚动条
						autoHeight : false,
						autoWidth : false,
						// 收缩的动态
						animate : true,
						root : root,
						rootVisible : false, // 默认根目录不显示
						border : false,
						lines : true,
						enableDD : false,// 是否允许拖动节点
						containerScroll : false,
						listeners : {
							"click" : function(node, event) {
								// 判断是不是根节点
								if (node.isLeaf()) {
									event.stopEvent();
									var href = node.attributes.href;
									if (!href) {
										return;
									}
									var tab = ies.main.center.getItem(node.id);
									if (!tab) {
										tab = ies.main.center
												.add({
													id : node.id,
													xtype : 'panel',
													iconCls : 'icon_ppt',
													title : node.text,
													bodyStyle : 'width:100%',
													layout : "fit",
													closable : true,
													html : '<iframe id="frame_'
															+ node.id
															+ '" src="'
															+ node.attributes.href
															+ '" frameborder="0" width="100%" height="100%"></iframe>'
												});
									}
									ies.main.center.setActiveTab(tab);
									return true;
								} else {
									event.stopEvent();
									node.toggle();
								}
							}
						}
					});

			ies.main.westTemp = new Ext.Panel({
				id : 'westPanel',
				// title : '业务',
				autoScroll : false,
				border : false,
				collapsible : false,
				layout : 'fit',
				hidden : true,
				items : [ ies.main.treepanel ]
			});

			wests.push(ies.main.westTemp);
			wests[0].show();
			// ---------------------------动态菜单的生成 end

			// ---------------------north设置 begin
			// 设置上面的
			var tb = new Ext.Toolbar();

			// 默认第一次进去点击
			// Ext.getCmp('expandbt').fireEvent('click');

			tb.addFill();
			tb.addText('用户:' + ies.main.yhmc);
			tb.addSeparator();
			tb.addText('登陆时间:' + ies.main.mc);
			tb.addSeparator();

			tb.render(Ext.getBody());
			ies.main.north = new Ext.BoxComponent({
				region : 'north',
				style : "padding:5px 5px 5px 5px",// 距两边间距
				height : 28,
				tbar : tb
			});

			// ---------------------center设置 begin
			ies.main.center = new Ext.TabPanel({
				id : 'centerPanel',
				style : "padding:0 1px 0 1px",// 距两边间距
				region : "center",
				activeItem : 0, // 默认选中第一个
				enableTabScroll : true, // 如果Tab过多会出现滚动条
				// deferredRender:false, // 加载时渲染所有
				layoutOnTabChange : true,
				height : 'auto',
				items : [ new Ext.Panel({
					title : '首页',
					html : '<iframe id="firsPage"'
							+ ' src="./frame/firstPage.html"'
							+ ' scrolling="no" frameborder="0" width="100%"'
							+ 'height="100%"></iframe>'
				}) ]
			});
			// ---------------------center设置 end

			ies.main.viewport = new Ext.Viewport({
				layout : 'border',
				items : [ {
					region : 'west',
					id : 'west-panel',
					title : '业务处理',
					split : true,
					width : 210,
					minSize : 175,
					maxSize : 400,
					autoScroll : false,
					collapsible : true,
					collapsed : false,
					floatable : false,
					layout : 'fit',
					layoutConfig : {
						animate : true
					},
					items : wests[0]
				}, ies.main.center, ies.main.north ]
			});
		});