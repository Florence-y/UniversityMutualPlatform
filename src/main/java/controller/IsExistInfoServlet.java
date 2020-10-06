package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import service.UserService;
import service.impl.UserServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * 用户某项信息是否存在
 * @author Florence
 */
@WebServlet("/Servlet/IsExistInfoServlet")
public class IsExistInfoServlet extends HttpServlet {
    Map<String,Object> map;
    UserService service = new UserServiceImpl();

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
        int code=service.isExistOneInf(map.get("userType"),map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
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
