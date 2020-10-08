package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Attention;
import pojo.Page;
import service.AttentionService;
import service.impl.AttentionServiceImpl;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 关注服务
 */
@WebServlet("/Servlet/AttentionServlet")
public class AttentionServlet extends HttpServlet {
    Map<String, Object> map;
    AttentionService service = new AttentionServiceImpl();


    @Override
    /**
     * 添加关注
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //调用添加用户服务
        int code = service.addAttention(map);
        //写回状态码
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("post");
    }

    /**
     * 获取关注列表（我的关注）
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        //调用服务获取关注列表
        Page<Attention> page = service.getAttentionByCondition((String) map.get("attentionType"), map);
        //返回关注列表分页对象
        WebUtil.writeObjToResponse(response, page);
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("put");
    }

    @Override
    /**
     * 取消关注
     */
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //调用服务
        int code = service.unAttention(map);
        WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(code));
        System.out.println("delete");
    }
}
