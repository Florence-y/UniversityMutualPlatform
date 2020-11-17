package controller;

import commom.constantval.ServletConstantVal;
import pojo.Page;
import pojo.Question;
import service.ExploreService;
import service.impl.ExploreServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @author DELL
 * 主页控制类
 */
@WebServlet("/Servlet/MainPageServlet")
public class MainPageServlet extends HttpServlet {
    private static final String INIT = "init";
    private static final String SPECIAL = "special";
    private static final String EXPLORE = "explore";
    Map<String, Object> map;
    ExploreService service = new ExploreServiceImpl();

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
        //主页获取信息的类型
        String getType = (String) map.get("getType");
        try {
            //初始化
            if (INIT.equals(getType)) {
                Page<Question> pages = service.initPage();
                WebUtil.writeObjToResponse(response, pages);
            //特别的某一类
            } else if (SPECIAL.equals(getType)) {
                Page<Question> page = service.getSpecialType((String) map.get("authorMarkNumber"));
                WebUtil.writeObjToResponse(response, page);
            //搜索
            } else if (EXPLORE.equals(getType)) {
                Page<Question> page = service.exploreQuestion((String) map.get("exploreContent"));
                WebUtil.writeObjToResponse(response, page);
            }
        } catch (SQLException throwable) {
            throwable.printStackTrace();
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
