package com.common;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;

public class TreeAction extends ActionSupport  implements ServletRequestAware,ServletResponseAware{
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	private TreeService treeService;

	public TreeService getTreeService() {
		return treeService;
	}

	public void setTreeService(TreeService treeService) {
		this.treeService = treeService;
	}

	public String getTreeNode() throws JSONException, IOException{
		String father = request.getParameter("father");
		List<Map> list = this.treeService.getTreeNode(father);
		JSONArray array = new JSONArray();
		for(int i = 0 ; i< list.size();i++){
			JSONObject obj = new JSONObject();
			obj.put("text", list.get(i).get("ORGNAME"));
			obj.put("level", list.get(i).get("LEVEL"));
			obj.put("code", list.get(i).get("ORGCODE"));
			obj.put("leaf", true);
			array.put(obj);
		}
		this.response.getWriter().print(array.toString());
		return null;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request=request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
}
