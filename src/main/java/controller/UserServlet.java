package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Response;
import service.UserService;
import service.impl.UserServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 用户控制类
 */
@WebServlet("/Servlet/UserServlet")
public class UserServlet extends HttpServlet {
    Map<String, Object> map;
    UserService service = new UserServiceImpl();

    private static <T> void setCookie(HttpServletResponse response, Response<T> rep) {
        if (Response.OK == rep.getStatusCode()) {
            //设置用户名，用户类型cookie
            response.addCookie(new Cookie("userName", rep.getUserName()));
            response.addCookie(new Cookie("userType", rep.getUserType()));
        } else if (Response.ERROR == rep.getStatusCode()) {
            //do something
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //调用添加用户服务
        int code = service.addUser((String) map.get("userType"), map);
        //写回
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
        Response<Object> rep = service.userLogin((String) map.get("userType"), map);
        //设置Cookie
        setCookie(response, rep);
        //写回状态
        WebUtil.writeObjToResponse(response, rep);
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code = service.updateUser((String) map.get("userType"), map, String.valueOf(map.get("condition")));
        //写回
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code = service.deleteUser((String) map.get("userType"), map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("delete");
    }
}
