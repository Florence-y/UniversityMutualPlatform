package controller;

import commom.constantval.ServletConstantVal;
import pojo.Page;
import pojo.Question;
import service.DynamicCircleService;
import service.impl.DynamicCircleServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PipedReader;
import java.util.Map;

/**
 * @author Florence
 * 动态控制类
 */
@WebServlet("/Servlet/DynamicCommunicateCircleServlet")
public class DynamicCommunicateCircleServlet extends HttpServlet {
    Map<String, Object> map;
    DynamicCircleService dynamicCircleService = new DynamicCircleServiceImpl();
    private static final String ALL="all";
    private static final String EXPLORATION="explore";
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
        //获取的类型
        String type= (String) map.get("type");
        //全部
        if (ALL.equals(type)){
            Page<Question> page = dynamicCircleService.getAll((String) map.get("ViewerMarkNumber"));
            WebUtil.writeObjToResponse(response,page);
        }
        //搜索
        else if (EXPLORATION.equals(type)){
            Page<Question> page =dynamicCircleService.getDynamicShowByExplore(map.get("exploreContent"));
            WebUtil.writeObjToResponse(response,page);
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
