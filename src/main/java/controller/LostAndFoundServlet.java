package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import pojo.Found;
import pojo.Lost;
import pojo.Page;
import service.LostAndFoundService;
import service.impl.LostAndFoundServiceImpl;
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
 * 失物招领控制类
 */
@WebServlet("/Servlet/LostAndFoundServlet")
public class LostAndFoundServlet extends HttpServlet {
    private static final String FOUND = "found";
    private static final String LOST = "lost";
    private static final String EXPLORE = "explore";
    private static final String TERM = "term";
    private static final String ALL = "all";
    Map<String, Object> map;
    LostAndFoundService service = new LostAndFoundServiceImpl();
    Page<Found> foundPage;
    Page<Lost> lostPage;
    Found found;
    Lost lost;
    int code;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        //添加的失物招领与寻物启事的文章的类型
        String type = (String) map.get("type");
        //寻物启事
        if (FOUND.equals(type)) {
            code = service.addFound(ReflectUtil.getFieldAndValueFromTheMixMap(map, new Found()));
        //失物招领
        } else if (LOST.equals(type)) {
            code = service.addLost(ReflectUtil.getFieldAndValueFromTheMixMap(map, new Lost()));
        }
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
        //失物招领寻物启事多样式筛选
        //获取类型
        String type = (String) map.get("type");
        //获取的方式
        String getInfWay = (String) map.get("getInfWay");
        //分页id
        String scrollId = (String) map.get("scrollId");
        //精准
        if (TERM.equals(getInfWay)) {
            String id = (String) map.get("id");
            if (LOST.equals(type)) {
                lost = service.getLostByTerm(id);
                WebUtil.writeObjToResponse(response, lost);
            } else if (FOUND.equals(type)) {
                found = service.getFoundByTerm(id);
                WebUtil.writeObjToResponse(response, found);
            }
        //模糊
        } else if (EXPLORE.equals(getInfWay)) {
            if (LOST.equals(type)) {
                lostPage = service.getLostByExplore(scrollId, map);
                WebUtil.writeObjToResponse(response, lostPage);
            } else if (FOUND.equals(type)) {
                foundPage = service.getFoundByExplore(scrollId, map);
                WebUtil.writeObjToResponse(response, foundPage);
            }
        //任意
        } else if (ALL.equals(getInfWay)) {
            if (LOST.equals(type)) {
                lostPage = service.getLostAll(scrollId);
                WebUtil.writeObjToResponse(response, lostPage);
            } else if (FOUND.equals(type)) {
                foundPage = service.getFoundAll(scrollId);
                WebUtil.writeObjToResponse(response, foundPage);
            }
        }
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
