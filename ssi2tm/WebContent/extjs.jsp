<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% String basePath = request.getContextPath();%>
<link rel="stylesheet" type="text/css"	href="<%=basePath%>/script/ext/resources/css/ext-all.css" />
<script type="text/javascript" src="<%=basePath%>/script/ext/ext-base.js"></script>
<script type="text/javascript"	src="<%=basePath%>/script/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/ext/ext-lang-zh_CN.js"></script>
<script type="text/javascript">
	Ext.namespace('ies','ies.user');
	ies.webRoot='<%=basePath%>';
		var ben = '<%=(String)session.getAttribute("dl")%>';
	if(ben!='null'){
		var hy = '<%=(String)session.getAttribute("yhString")%>';
		var responseObject = eval("("+ hy + ")");
	}
	ies.user.yh = responseObject;
	Ext.BLANK_IMAGE_URL = ies.webRoot+'/script/ext/resources/images/default/s.gif';
</script>
<style type="text/css">
.x-grid3-col {
	border-left:1px solid #EEEEEE;
	border-right:opx solid #D2D2D2;
}

.x-grid3-row td, .x-grid3-summary-row td{
	padding-left:0px;
	padding-right:0px;
}
</style>
<script type="text/javascript" src="<%=basePath%>/script/ext/ext-vtypes.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/ext/ext-exception.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/ext-common.js"></script>
<script type="text/javascript" src="<%=basePath%>/script/textfieldExtend.js"></script>
<noscript>您的浏览器不支持Javascript脚本，请检查您的浏览器版本或安全设置！</noscript>