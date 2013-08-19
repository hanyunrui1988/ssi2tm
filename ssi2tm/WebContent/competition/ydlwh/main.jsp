<% 
/**
 * @function 
 * @author 
 *
 */
%>
 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<html>
<head>
<title>用电量维护</title>
<style>
 .icon_add {
      background: url('<%=basePath%>resources/images/button-icon/icon_add.png') 0 0 no-repeat   !important;
  }
 .icon_delete {
      background: url('<%=basePath%>resources/images/button-icon/icon_delete.png') 0 0 no-repeat  !important;
  }
  .icon_update {
      background: url('<%=basePath%>resources/images/button-icon/icon_update.png')  0 0 no-repeat  !important;
  }
  .icon-pub1 {
      background: url('<%=basePath%>resources/images/button-icon/icon-pub1.png')  0 0 no-repeat  !important;
  }  
  .folder {
  	  background: url('<%=basePath%>resources/images/button-icon/folder.gif')  0 0 no-repeat  !important;
  } 
  .icon_query {
      background: url('<%=basePath%>resources/images/button-icon/icon_query.png')  0 0 no-repeat  !important;
  }
  .icon-setRole {
            background: url('<%=basePath%>resources/images/00.gif')  0 0 no-repeat  !important;
  } 
</style>  
<style type="text/css">
.x-form-file-wrap {
    position: relative;
    height: 22px;
}

.x-form-file-wrap .x-form-file {
    position: absolute;
    right: 0;
    -moz-opacity: 0;
    filter: alpha(opacity : 0);
    opacity: 0;
    z-index: 2;
    height: 22px;
}

.x-form-file-wrap .x-form-file-btn {
    position: absolute;
    right: 0;
    z-index: 1;
}

.x-form-file-wrap .x-form-file-text {
    position: absolute;
    left: 0;
    z-index: 3;
    color: #777;
}

.x-form-file-wrap {
    width: 200px;
}
</style>
<jsp:include page="../../extjs.jsp"></jsp:include>
<script type='text/javascript' src='<%=basePath%>script/Datetime.js'></script>
<script type='text/javascript' src='<%=basePath%>script/treePanel.js'></script>
<script type='text/javascript' src='<%=basePath%>script/errorShowDlg.js'></script>
<script type='text/javascript' src='<%=basePath%>competition/ydlwh/main.js'></script>
</head>
<body>
</body>
</html>