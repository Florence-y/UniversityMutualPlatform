package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Answer;
import pojo.Page;
import pojo.Response;
import service.AnswerService;
import service.impl.AnswerServiceImpl;
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
@WebServlet("/Servlet/AnswerServlet")
public class AnswerServlet extends HttpServlet {
    Map<String, Object> map;
    AnswerService service = new AnswerServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        boolean b = SensitiveWordFilterUtil.filterMap(map);
        if (!b) {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessageAndStatusCode(Response.ERROR, ServletConstantVal.SENSITIVE_WORD_INF));
            return;
        }
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        int id = service.addAnswer(map);
        int code = id > 0 ? Response.OK : Response.ERROR;
        WebUtil.writeObjToResponse(response, ResponseFactory.getId(id, code));
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        boolean b = SensitiveWordFilterUtil.filterMap(map);
        if (!b) {
            WebUtil.writeObjToResponse(response, ResponseFactory.getMessageAndStatusCode(Response.ERROR, ServletConstantVal.SENSITIVE_WORD_INF));
            return;
        }
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        Page<Answer> answerPage = service.getAnswers((String) map.get("getAnswerType"), map);
        WebUtil.writeObjToResponse(response, answerPage);
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //获取修改完的回答的内容
        Answer answer = service.editAnswer(map, String.valueOf(map.get("condition")));
        //将对象写回
        WebUtil.writeObjToResponse(response, answer);
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
    }
}
