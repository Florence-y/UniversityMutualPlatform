package controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import commom.constantval.*;

/**
 * @author Florence
 * 用户控制器
 */
@WebServlet("/UserServlet")
public class UserServlet extends HttpServlet {

    @Override
    /**
     * 注册用户
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter(ServletConstantVal.REQUEST_TYPE).equals(ServletConstantVal.PUT)){
            doPut(request,response);
            return;
        }
    }

    @Override

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter(ServletConstantVal.REQUEST_TYPE).equals(ServletConstantVal.DELETE)){
            doDelete(request,response);
            return;
        }
    }

    @Override
    /**
     * 更新用户信息
     */
    protected void doPut(HttpServletRequest request, HttpServletResponse response){

    }
    @Override
    /**
     * 删除用户
     */
    protected void doDelete(HttpServletRequest request, HttpServletResponse response){

    }
}
