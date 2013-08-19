package com.services;

import java.util.List;
import java.util.Map;

import com.daos.OrgDao;


public class OrgService {
	private OrgDao orgDao;
	public OrgDao getOrgDao() {
		return orgDao;
	}
	public void setOrgDao(OrgDao orgDao) {
		this.orgDao = orgDao;
	}
	public List<Map> select(String father) {
		return this.orgDao.select(father);
	}
	public void save(Map<String, Object> map) {
		this.orgDao.save(map);
	}
	public void delete(String[] ids) {
		this.orgDao.delete(ids);
	}
	public Map<String, String> edit(String ORGCODE) {
		return this.orgDao.edit(ORGCODE);
	}
	public void update(Map<String, Object> map) {
		this.orgDao.update(map);
	}

}
