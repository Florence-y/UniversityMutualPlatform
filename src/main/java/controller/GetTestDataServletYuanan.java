package controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Florence
 * 远安测试类
 */
@WebServlet("/GetTestDataServletYuanan")
public class GetTestDataServletYuanan extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ObjectMapper mapper = new ObjectMapper();
        response.setContentType("application/json;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        mapper.writeValue(response.getWriter(),getTestMap("id","123456","name","吴彦臻"));
        System.out.println("获取测试数据");
    }

    private Map<String,String> getTestMap(String... keyAndValue) {
        if (keyAndValue.length%2!=0){
            System.out.println("参数个数不对");
            return null;
        }
        Map<String,String> map =new HashMap<>(10);
        for (int i=0;i<keyAndValue.length;i+=2){
            map.put(keyAndValue[i],keyAndValue[i+1]);
        }
        return map;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doPost(request, response);
    }
}
