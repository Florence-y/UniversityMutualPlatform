package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import lombok.extern.slf4j.Slf4j;
import pojo.Question;
import pojo.Response;
import service.QuestionService;
import service.impl.QuestionServiceImpl;
import util.ReflectUtil;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 问题控制类
 */
@WebServlet("/Servlet/QuestionServlet")
@Slf4j
public class QuestionServlet extends HttpServlet {
    QuestionService service = new QuestionServiceImpl();
    Map<String, Object> map;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        String id = service.addQuestion(ReflectUtil.getFieldAndValueFromTheMixMap(map, new Question()));
        //获取状态码
        int statusCode = id != null ? Response.OK : Response.ERROR;
        //写回id和状态码
        WebUtil.writeObjToResponse(response, ResponseFactory.getMessage(id).setStatusCode(statusCode));
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        //获取一个问题的详细内容
        Question question = service.getDetailQuestion((String) map.get("questionId"), map);
        WebUtil.writeObjToResponse(response, question);
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {
        try {
            //获取修改后的文章内容
            Question question = service.updateQuestion(ReflectUtil.getFieldAndValueFromTheMixMap(map, new Question()), (String) map.get("id"));
            //失败
            if (question == null) {
                WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(500));
                return;
            }
            //将文章内容写回
            WebUtil.writeObjToResponse(response, question);
        } catch (IOException e) {
            e.printStackTrace();
            log.error("更新问题失败 {}", e.getMessage());
        }
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
    }
}
