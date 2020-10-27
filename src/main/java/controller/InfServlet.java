package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import lombok.extern.slf4j.Slf4j;
import pojo.Inf;
import pojo.Page;
import pojo.Response;
import service.InfService;
import service.impl.InfServiceImpl;
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
@Slf4j
@WebServlet("/Servlet/InfServlet")
public class InfServlet extends HttpServlet {
    Map<String, Object> map;
    InfService service = new InfServiceImpl();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //调用服务添加信息
        int id = service.addInf(map);
        //成功并写回状态码
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(Response.OK).setMessage(String.valueOf(id)));
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        try {
            //获取文章对象
            Page<Inf> infListByCondition = service.getInfListByCondition(map);
            //写回文章对象
            WebUtil.writeObjToResponse(response, infListByCondition);
        } catch (IOException e) {
            e.printStackTrace();
            //返回失败对象
            WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(Response.GET_LOST));
            log.error("发送通知对象失败 {}", e.getMessage());
        }
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code = service.changeIsRead(map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int code = service.deleteInfById(map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("delete");
    }
}
