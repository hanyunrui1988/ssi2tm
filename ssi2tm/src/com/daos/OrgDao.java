package com.daos;

import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class OrgDao extends SqlMapClientDaoSupport{
	private static final String selectorg = "selectorg";
	private static final String insertorg = "insertorg";
	private static final String deleteorg = "deleteorg";
	private static final String selectdetail = "selectdetail";
	private static final String updateorg = "updateorg";
	@SuppressWarnings("unchecked")
	public List<Map> select(String father) {
		List<Map> list = null;
		list = getSqlMapClientTemplate().queryForList(selectorg,
				father);
		return list;
	}
	
	
	public void save(Map<String, Object> map) {
		getSqlMapClientTemplate().insert(insertorg, map);
	}


	public void delete(String[] ids) {
		StringBuffer buf = new StringBuffer();
		for(int i = 0; i < ids.length; i++){
			if(i!=0){
				buf.append(",");
			}
			buf.append(ids[i]);
		}
		String ida = buf.toString();
		getSqlMapClientTemplate().insert(deleteorg, ida);
	}


	public Map<String, String> edit(String ORGCODE) {
		List<Map> list = null;
		list = getSqlMapClientTemplate().queryForList(selectdetail,
				ORGCODE);
		if(list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}


	public void update(Map<String, Object> map) {
		getSqlMapClientTemplate().update(updateorg, map);
	}

}
