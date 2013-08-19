Ext.namespace('ies.tree');
ies.tree.text = "江苏省电力公司";
ies.tree.code = "01";
ies.tree.level = "0";


var root = new Ext.tree.AsyncTreeNode({
	text : "江苏省电力公司",
	code : ies.tree.code,
	level : ies.tree.level,
	draggable : false,
	expanded : true,
	leaf : false,
	split : true,
	id : '0'
});

ies.tree.root = root;

var beforeLoadFn=function(treeLoader, node){
	treeLoader.baseParams.level=node.attributes["level"];
	treeLoader.baseParams.father=node.attributes["code"];
}
ies.tree.treepanel = new Ext.tree.TreePanel({
	layout : 'fit',
	autoScroll : true, // 如果超出范围带自动滚动条
	autoHeight : false,
	autoWidth : false,
	// 收缩的动态
	animate : true,
	root : root,
	rootVisible : true, // 默认根目录不显示
	border : false,
	lines : true,
	enableDD : false,// 是否允许拖动节点
	containerScroll : false,
	loader : new Ext.tree.TreeLoader({
		dataUrl : ies.webRoot + '/tree_getTreeNode.do',
		listeners:{
			"beforeload":beforeLoadFn
		}
	})
});

ies.tree.getTreePanel = function() {
	return new Ext.Panel({
		width : 150,
		region : 'west',
		items : [ ies.tree.treepanel ]
	});
};