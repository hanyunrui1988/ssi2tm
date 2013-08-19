<%
/**
 * @function 系统框架top.jsp
 * @author 郭杰
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
    
    <style type="text/css">
    	.{
    		margin:0;
    		padding:0;
    	}
    	.topTr{
    		height:82px;
    	}
    	a{	
			float:right;
			display:block;
			width:30px;
			text-align: justify ;
			text-decoration:none;
			margin-right:0px;
		}
    </style>
	<title></title>
  </head>
  <body style="overflow:hidden">
	<table width="100%"  border="0" cellspacing="0" cellpadding="0" class="main" >
		<tr id="topTr"  class="topTr">
			<td width="100%">
				<table width="100%"  border="0" cellspacing="0" cellpadding="0" height="82px">
					<tr>
						<td width="591px" style="background: url(resources/images/top_001.jpg) no-repeat bottom left;"></td>
						<td style="background: url(resources/images/top_002.jpg) repeat-x bottom center;">&nbsp;</td>
						<td width="284px" style="background: url(resources/images/top_003.jpg) no-repeat bottom right;"></td>
					</tr>
				</table>
			</td>
		</tr>
</table>
</body>
</html>
