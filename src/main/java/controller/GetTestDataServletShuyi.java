package controller;
import util.WebUtil;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Florence
 * 淑仪测试类
 */
@WebServlet("/Servlet/GetTestDataServletShuyi")
public class GetTestDataServletShuyi extends HttpServlet {
    private static final int EVEN = 2;
    Map<String, Object> map;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        WebUtil.writeObjToResponse(response, map);
        System.out.println("获取测试数据");
    }

    private Map<String, String> getTestMap(String... keyAndValue) {
        if (keyAndValue.length % EVEN != 0) {
            System.out.println("参数个数不对");
            return null;
        }
        Map<String, String> map = new HashMap<>(10);
        for (int i = 0; i < keyAndValue.length; i += 2) {
            map.put(keyAndValue[i], keyAndValue[i + 1]);
        }
        return map;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        WebUtil.writeObjToResponse(response, map);
        System.out.println("获取测试数据");
    }
}
