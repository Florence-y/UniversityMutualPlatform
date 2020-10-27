package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Question;
import service.ExploreService;
import service.impl.ExploreServiceImpl;
import util.ElasticUtil;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static commom.constantval.ServletConstantVal.POJO_QUESTION;

/**
 * @author Florence
 * 分页查询search
 */
@WebServlet("/Servlet/ScrollSearchServlet")
public class ScrollSearchServlet extends HttpServlet {
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
        //滚动id
        String id = (String) map.get("scrollId");
        //实体类型
        String type = (String) map.get("pojoType");
        if (POJO_QUESTION.equals(type)) {
            WebUtil.writeObjToResponse(response, ElasticUtil.scrollSearch(id, new Question()));
        } else if (1 == 2) {

        } else {
            WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(500));
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
