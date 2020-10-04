package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import util.EmailUtil;
import util.WebUtil;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 */
@WebServlet("/Servlet/VerifyCodeServlet")
public class VerifyCodeServlet extends HttpServlet {
    Map<String,Object> map;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        EmailUtil emailUtil = new EmailUtil();
        try {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessage(emailUtil.sendEmail((String) map.get("email"))));
        } catch (Exception e) {
            e.printStackTrace();
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
        EmailUtil emailUtil = new EmailUtil();
        try {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessage(emailUtil.sendEmail((String) map.get("email"))));
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.getWriter().write("asdada");
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
