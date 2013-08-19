<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="expires" content="0">
<title>用户受电工程信息公开与监管系统</title>
<jsp:include page="../extjs.jsp"></jsp:include>
<script type="text/javascript">
	function reset() {
		document.getElementById("username").value='';
		document.getElementById("password").value='';
	};

	function login(){
		//验证帐号密码验证码有没有为空的
		if(document.getElementById("username").value == ""){
			alert("请输入用户名！");
			return;
		}
		if(document.getElementById("password").value == ""){
			alert("请输入密码！");
			return;
		}
		if(document.getElementById("username").value.length>50){
			alert("用户名不能超过50位！");
			return;
		}
		//发起ajax请求进行验证帐户密码和验证码正确不正确
		Ext.Ajax.request({
			url : 'userlogin_login.do',
			method : 'POST',
			async : false,
			params : {
				username : document.getElementById("username").value,
				userpsw : document.getElementById("password").value
			},
			success : function (response, options){
				window.location.href = "frame/main.jsp";
						/**var text = response.responseText.trim();
						var responseObject = eval('(' + text + ')');
						if(responseObject.exception!=true){
							if (responseObject.success == true) {
								window.location.href = "frame/main.jsp";
							} else {
								ies.com.showDlg(responseObject.message,
									responseObject.msg);
							}
						}**/
					}
		});
	}
	document.onkeydown = function(e){
		var key = (document.all) ? window.event.keyCode :e.which;	
		if(key == 13){
			login();
		}
	};
</script>
<style type="text/css">
#inputtable a {
	font-size: 16px;
	color: #2077b0
}


html,body {
	margin: 0px;
	height: 100%
}

#loginBox {
	background-image: url(./images/background_rl.jpg)
}

.ok {
	background-image: url(./images/yes1.jpg) !important;
	background-position: center center;
	cursor: hand;
	width: 110px;
	height: 37px;
	margin-left: 15px;
}

.reset {
	background-image: url(./images/clear1.jpg) !important;
	background-position: center center;
	cursor: hand;
	width: 110px;
	height: 36px;
	margin-left: 15px;
}

.ok_2 {
	background-image: url(./images/yes2.jpg) !important;
	background-position: center center;
	cursor: hand;
	width: 110px;
	height: 37px;
	margin-left: 15px;
}

.reset_2 {
	background-image: url(./images/clear2.jpg) !important;
	background-position: center center;
	cursor: hand;
	width: 110px;
	height: 36px;
	margin-left: 15px;
}
.bodyClass{
text-align:center;
}
</style>
</head>
<body>
<table id="inputtable"  style="position:absolute;left:30%;top:50%;" border="0" width="400" cellpadding="4"
	cellspacing="0">
	<tr>
		<td style="width:90px" align="center"><a>用户名:</a></td>
		<td ><input style="width:130px" id="username" type="text" /></td>
		<td>
		<div class="ok" onmouseover="this.className='ok_2'"
			onmouseout="this.className='ok'" onclick="login()"></div>
		</td>
	</tr>
	<tr>
		<td style="width:90px" align="center"><a>密 码:</a></td>
		<td><input style="width:130px" id="password" type="password" /></td>
		<td>
		<div class="reset" onmouseover="this.className='reset_2'"
			onmouseout="this.className='reset'" onclick="reset()"></div>
		</td>
	</tr>
</table>
</body>
</html>