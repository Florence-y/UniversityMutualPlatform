package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Found;
import pojo.Lost;
import pojo.Page;
import pojo.Response;
import service.ExploreService;
import service.impl.ExploreServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 失物招领搜索控制类
 */
@WebServlet("/Servlet/LostAndFoundExploreServlet")
public class LostAndFoundExploreServlet extends HttpServlet {
    Map<String, Object> map;
    ExploreService exploreService = new ExploreServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        //搜索的类型
        String type = (String) map.get("type");
        String exploreContent = (String) map.get("exploreContent");
        //寻物启事搜索
        if (ServletConstantVal.FOUND.equals(type)) {
            Page<Found> page = exploreService.exploreFound(exploreContent);
            WebUtil.writeObjToResponse(response, page);
        //失物招领搜索
        } else if (ServletConstantVal.LOST.equals(type)) {
            Page<Lost> page = exploreService.exploreLost(exploreContent);
            WebUtil.writeObjToResponse(response, page);
        //未知搜索类型
        } else {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessageAndStatusCode(Response.OK, "搜索类型没输入或者输入错误"));
        }
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
    }
}
