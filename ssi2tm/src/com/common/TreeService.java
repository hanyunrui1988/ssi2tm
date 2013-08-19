package com.common;

import java.util.List;
import java.util.Map;

public class TreeService {
	public TreeDao treeDao;
	
	public TreeDao getTreeDao() {
		return treeDao;
	}

	public void setTreeDao(TreeDao treeDao) {
		this.treeDao = treeDao;
	}

	public List<Map> getTreeNode(String father) {
		return this.treeDao.getTreeNode(father);
		
		
	}

}
