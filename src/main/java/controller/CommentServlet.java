package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Comment;
import pojo.Page;
import pojo.Response;
import service.CommentService;
import service.impl.CommentServiceImpl;
import util.SensitiveWordFilterUtil;
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
@WebServlet("/Servlet/CommentServlet")
public class CommentServlet extends HttpServlet {
    Map<String, Object> map;
    CommentService service = new CommentServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        int code = SensitiveWordFilterUtil.filterMap(map);
        if (code!=Response.OK) {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessageAndStatusCode(code, ServletConstantVal.SENSITIVE_WORD_INF));
            return;
        }
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        int codeAdd= service.addComment(map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(codeAdd));
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        Page<Comment> page = service.getComments((String) map.get("getType"), map);
        WebUtil.writeObjToResponse(response, page);
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Comment comment = service.editComment(map, String.valueOf(map.get("condition")));
        //如果对象为空
        if (comment == null) {
            WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(Response.ERROR));
            return;
        }
        WebUtil.writeObjToResponse(response, comment);
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
    }
}
