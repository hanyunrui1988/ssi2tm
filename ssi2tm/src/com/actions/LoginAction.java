package com.actions;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import com.services.LoginService;
import com.util.Constants;

public class LoginAction extends ActionSupport {

	private static final long serialVersionUID = 1L;
	public LoginService loginService;
	private String username;

	private String password;


	public String execute() throws Exception {
		if (this.loginService.login(username, password)) {
			ActionContext.getContext().getSession().put(Constants.USERNAME_KEY,
					username);
			return Action.SUCCESS;
		} else {
			super.addActionError(super.getText("login.message.failed"));
			return Action.INPUT;
		}
	}
	
	public String login() throws Exception {
		System.err.println("I am login now");
		return Action.SUCCESS;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	public LoginService getLoginService() {
		return loginService;
	}
	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}

}
