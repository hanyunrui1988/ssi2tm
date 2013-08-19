<%
	/**
	 * @function 系统框架default.jsp
	 * @author hanyr
	 *
	 */
%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<title></title>
<style type="text/css">
p {
	margin: 5px;
}

.settings {
	background-image: url(<%=basePath%>resources/images/folder_wrench.png);
}

.nav {
	background-image: url(<%=basePath%>resources/images/folder_go.png);
}
.slideup {
	background: url('<%=basePath%>script/ext/resources/images/default/layout/ns-collapse.gif') 2 3
		no-repeat !important;
}

.slidedown {
	background: url('<%=basePath%>script/ext/resources/images/default/layout/ns-expand.gif') 2 3
		no-repeat !important;
}
.XXCX {
	background: url('<%=basePath%>resources/images/Menu/CXTJ.gif') 0 0
		no-repeat !important;
}
.DLJG {
	background: url('<%=basePath%>resources/images/Menu/YJJC.gif') 0 0
		no-repeat !important;
}

.QYFW {
	background: url('<%=basePath%>resources/images/Menu/ZZGL.gif') 0 0
		no-repeat !important;
}
.XTGL {
	background: url('<%=basePath%>resources/images/Menu/XTGL.gif') 0 0
		no-repeat !important;
}

.logout {
	background: url('<%=basePath%>resources/images/Menu/logout.gif') 0 0
		no-repeat !important;
}

.exit {
	background: url('<%=basePath%>resources/images/Menu/exit.gif') 0 0
		no-repeat !important;
}



iframe {
	width: 100%;
}

* html iframe {
	width: 99.9%;
}
</style>
<jsp:include page="../extjs.jsp"></jsp:include>
<script type="text/javascript" src="<%=basePath%>script/ext/ext-basex.js"></script>
<script type="text/javascript" src="<%=basePath%>script/ext/ext-ux-extensions.js"></script>
<script type="text/javascript" src="<%=basePath%>script/json-minified.js"></script>
<script type="text/javascript" src='<%=basePath%>frame/default.js'></script>
</head>
<body></body>
</html>
