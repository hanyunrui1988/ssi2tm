package com.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

public class TreeDao extends SqlMapClientDaoSupport{
	
	private static final String getTreeNode = "getTreeNode";
	
	public List<Map> getTreeNode(String father) {
		List<Map> list = null;
		list = getSqlMapClientTemplate().queryForList(getTreeNode,
				father);
		return list;
	}

}
