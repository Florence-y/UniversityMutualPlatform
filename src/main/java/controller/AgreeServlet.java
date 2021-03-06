package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import service.AgreeService;
import service.impl.AgreeServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 点赞控制类
 */
@WebServlet("/Servlet/AgreeServlet")
public class AgreeServlet extends HttpServlet {
    Map<String, Object> map;
    AgreeService service = new AgreeServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //进行点赞
        int code = service.agree((String) map.get("agreeType"), map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
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
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code = service.unAgree((String) map.get("agreeType"), map);
        //取消点赞
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("delete");
    }
}
