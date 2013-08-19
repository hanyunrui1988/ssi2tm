package com.services;

import com.daos.LoginDao;

public class LoginService {
	public LoginDao loginDao;

	public LoginDao getLoginDao() {
		return loginDao;
	}

	public void setLoginDao(LoginDao loginDao) {
		this.loginDao = loginDao;
	}

	/**
	 *	登录 
	 * @param username
	 * @param password
	 * @return
	 */
	public boolean login(String username, String password) {
		// TODO Auto-generated method stub
		return false;
	}
}
