package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Response;
import util.SensitiveWordFilterUtil;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 敏感词控制类
 */
@WebServlet("/Servlet/SensitiveWordServlet")
public class SensitiveWordServlet extends HttpServlet {
    Map<String, Object> map;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        //获取敏感词并处理
        List<String> list = SensitiveWordFilterUtil.filterArr((ArrayList<String>) map.get("textArr"));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //包含敏感词汇
        if (list == null) {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessageAndStatusCode(Response.ERROR, "包含黄色敏感词"));
            return;
        }
        WebUtil.writeObjToResponse(response, list);
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
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
