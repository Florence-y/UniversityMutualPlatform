package controller;

import commom.constantval.ServletConstantVal;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 用户某项信息是否存在
 * @author Florence
 */
@WebServlet("/IsExistInfoServlet")
public class IsExistInfoServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        if (request.getParameter(ServletConstantVal.REQUEST_TYPE).equals(ServletConstantVal.PUT)) {
            doPut(request, response);
            return;
        }
    }

    @Override
    /**
     * 用户某个信息是否存在
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        if (request.getParameter(ServletConstantVal.REQUEST_TYPE).equals(ServletConstantVal.DELETE)) {
            doDelete(request, response);
            return;
        }
    }
    /**
     * 登录
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {

    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {

    }
}
