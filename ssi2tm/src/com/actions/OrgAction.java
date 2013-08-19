package com.actions;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONException;
import org.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;
import com.services.OrgService;

public class OrgAction extends ActionSupport implements ServletRequestAware,ServletResponseAware{
	private HttpServletRequest request;
	private HttpServletResponse response;
	private OrgService orgService;

	public OrgService getOrgService() {
		return orgService;
	}

	public void setOrgService(OrgService orgService) {
		this.orgService = orgService;
	}
	
	public void select() throws JSONException, IOException{
		String father = request.getParameter("father");
		List<Map> list = this.orgService.select(father);
		JSONObject result = new JSONObject();
		result.put("results", list.size());
		if(list.size()==0){
			result.put("rows", new JSONObject());
		}else{
			for(int i = 0; i<list.size();i++){
				JSONObject obj = new JSONObject();
				obj.put("ORGCODE", list.get(i).get("ORGCODE"));
				obj.put("ORGNAME", list.get(i).get("ORGNAME"));
				obj.put("LEVEL", list.get(i).get("LEVEL"));
				obj.put("SXSJ", list.get(i).get("SXSJ"));
				obj.put("SHXSJ", list.get(i).get("SHXSJ"));
				result.append("rows", obj);
			}
		}
		
		System.err.println(result.toString());
		this.response.getWriter().print(result.toString());
		
	}

	public void save() throws IOException{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("ORGCODE", request.getParameter("ORGCODE"));
		map.put("ORGNAME", request.getParameter("ORGNAME"));
		map.put("FATHER", request.getParameter("FATHER"));
		map.put("LEVEL", request.getParameter("LEVEL"));
		map.put("SXSJ", request.getParameter("SXSJ"));
		map.put("SHXSJ", request.getParameter("SHXSJ"));
		map.put("DESC", request.getParameter("DESC"));
		this.orgService.save(map);
		this.response.getWriter().print("{success:true}");
	}
	
	public void delete() throws IOException{
		String[] ids = this.request.getParameterValues("ids");
		this.orgService.delete(ids);
		this.response.getWriter().print("{success:true}");
	}
	
	public void edit() throws JSONException, IOException{
		String ORGCODE = this.request.getParameter("ORGCODE");
		Map<String,String> map = this.orgService.edit(ORGCODE);
		JSONObject obj = new JSONObject();
		obj.put("success", true);
		JSONObject data = new JSONObject();
		data.put("FATHER", map.get("FATHER"));
		data.put("FATHERNAME", map.get("FATHERNAME"));
		data.put("ORGCODE", map.get("ORGCODE"));
		data.put("ORGNAME", map.get("ORGNAME"));
		data.put("LEVEL", map.get("LEVEL"));
		data.put("DESC", map.get("DESC"));
		data.put("SXSJ", map.get("SXSJ"));
		data.put("SHXSJ", map.get("SHXSJ"));
		obj.put("data", data);
		this.response.getWriter().print(obj.toString());
	}
	
	public void update() throws JSONException, IOException{
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("ID", request.getParameter("ID"));
		map.put("ORGCODE", request.getParameter("ORGCODE"));
		map.put("ORGNAME", request.getParameter("ORGNAME"));
		map.put("FATHER", request.getParameter("FATHER"));
		map.put("LEVEL", request.getParameter("LEVEL"));
		map.put("SXSJ", request.getParameter("SXSJ"));
		map.put("SHXSJ", request.getParameter("SHXSJ"));
		map.put("DESC", request.getParameter("DESC"));
		this.orgService.update(map);
		this.response.getWriter().print("{success:true}");
	}

	public void setServletResponse(HttpServletResponse arg0) {
		this.response = arg0;
	}

	public void setServletRequest(HttpServletRequest arg0) {
		this.request = arg0;
	}
}
