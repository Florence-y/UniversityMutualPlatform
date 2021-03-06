package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Comment;
import pojo.Page;
import pojo.Response;
import service.CommentService;
import service.impl.CommentServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 评论控制类
 */
@WebServlet("/Servlet/CommentServlet")
public class CommentServlet extends HttpServlet {
    Map<String, Object> map;
    CommentService service = new CommentServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //添加评论
        int code = service.addComment(map);
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
        //获取评论
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
