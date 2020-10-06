package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Response;
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
 * @author Florence
 * 用户控制器
 */
@WebServlet("/Servlet/UserServlet")
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
        //调用添加用户服务
        int code=service.addUser((String) map.get("userType"),map);
        //写回
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("post");
    }

    @Override
    /**
     * 登录
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        Response rep = service.userLogin((String) map.get("userType"),map);
        //写回状态
        WebUtil.writeObjToResponse(response, rep);
        System.out.println("get");
    }

    @Override
    /**
     * 更新用户信息
     */
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code=service.updateUser((String)map.get("userType"),map, String.valueOf(map.get("condition")));
        //写回
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("put");
    }

    @Override
    /**
     * 删除用户
     */
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code=service.deleteUser((String) map.get("userType"),map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("delete");
    }
}
