package controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import commom.constantval.*;
import commom.factory.ResponseFactory;
import pojo.Response;
import service.UserService;
import service.impl.UserServiceImpl;
import util.WebUtil;

/**
 * @author Florence
 * 用户控制器
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {
    Map<String,Object> map;
    UserService service = new UserServiceImpl();
    @Override
    /**
     * 添加用户
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        int code=service.addUser((String) map.get("userType"),map);
        //写回
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("post");
    }

    @Override
    /**
     *
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        System.out.println("get");
    }

    @Override
    /**
     * 更新用户信息
     */
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("put");
    }

    @Override
    /**
     * 删除用户
     */
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
    }
}
