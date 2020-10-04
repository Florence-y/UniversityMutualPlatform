package util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import commom.annontation.DbCol;
import pojo.Response;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;


/**
 * @author Florence
 */
public class WebUtil {
    private static final String JSON="json";
    private static final String TEXT="text";

    /**
     * json转换成对象
     * @param jsonStr json字符串
     * @return Object 封装城的对象
     */
    public static <T> T jsonToObj(Class<T> clazz,String jsonStr) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(jsonStr, clazz);
    }
    /**
     * 对象转换成json
     * @param obj 转换的对象
     * @return json字符串
     */
    public static String objToJson(Object obj) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(obj);
    }

    /**
     * map转json
     * @param map 要转换的map
     * @return 得到的jsonString
     * @throws JsonProcessingException json转化异常
     */
    public static String mapToJson(Map<String,Object> map) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(map);
    }

    /**
     * json转Map
     * @param json jsonString
     * @return 得到的Map
     * @throws IOException 转化异常
     */
    public static Map<String,Object> jsonToMap(String json) throws IOException {
        ObjectMapper mapper=new ObjectMapper();
        System.out.println(json);
        return mapper.readValue(json,HashMap.class);
    }

    /**
     * 根据对象获取 列名： 值 对
     * @param po 对象
     * @param <T> 泛型
     * @return 封装好的map
     * @throws IllegalAccessException 非法获取对象pojo
     */
    public static <T> Map<String,Object> getPara(T po) throws IllegalAccessException {
        Class<T> clazz = (Class<T>) po.getClass();
        Map<String, Object> map = new HashMap<>(16);
        for (Field f : clazz.getDeclaredFields()) {
            f.setAccessible(true);
            Object value = f.get(po);
            if(value!=null) {
                DbCol dbField = f.getAnnotation(DbCol.class);
                if(dbField!=null) { map.put(dbField.value(),value); }
            }
        }
        return map;
    }

    /**
     * 根据request来获取一个实体对象
     * @param request 请求头
     * @param clazz 实体类对象
     * @param <T> 泛型
     * @return 获取一个二对象从表单
     * @throws IOException 获取异常
     */
    public static <T> T getFromRequestForPojo(HttpServletRequest request, Class<T> clazz) throws IOException {
        Map<String,Object> map =new HashMap<>(20);
        for (Field field:clazz.getDeclaredFields()){
            String fieldName=field.getName();
            map.put(fieldName,request.getParameter(fieldName));
        }
        return jsonToObj(clazz,mapToJson(map));
    }

    /**
     * 获取json封装成一个json对象
     * @param request 请求头
     * @param clazz 类对象
     * @param <T> 要获取的实体类
     * @return 返回实体类对象
     */
    public static <T> T getJson(HttpServletRequest request, Class<T> clazz) {
        try {
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(request.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder responseStrBuilder = new StringBuilder();
            String str;
            //循环读取数据
            while ((str = streamReader.readLine()) != null) {
                responseStrBuilder.append(str);
            }
            //如果长度为0
             if(responseStrBuilder.length()<=0) {
                 return null;
             }
             //返回
            return jsonToObj(clazz,responseStrBuilder.toString());
        } catch (Exception ignored) {
            ignored.printStackTrace();
        }
        return null;
    }

    /**
     * 获取json字符串
     * @param req 请求头
     * @return 获取请求头的字符串对象
     */
    public static String getJsonString(HttpServletRequest req) {
        try {
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(req.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder responseStrBuilder = new StringBuilder();
            String str;
            while ((str = streamReader.readLine()) != null) {
                responseStrBuilder.append(str);
            }

            return responseStrBuilder.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将对象写回到response
     * @param response 返回头
     * @param pojo 实体对象
     * @param <T> 实体对象类型
     * @throws IOException io出崔
     */
    public static <T> void writeObjToResponse(HttpServletResponse response,T pojo) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(),pojo);
    }

    /**
     * 设置返回格式
     * @param type 类型
     * @param response 返回头
     */
    public static void setResponseType(String type, HttpServletResponse response) {
        if (JSON.equals(type)){
            response.setContentType("application/json; charset=UTF-8");
        }
        else if (TEXT.equals(type)){
            response.setContentType("text/html; charset=UTF-8");
        }
        response.setStatus(Response.OK);
    }

    public static Map<String, Object> formToMap(HttpServletRequest request) {
        Map<String,Object> map = new HashMap<>(20);
        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()){
            String str=parameterNames.nextElement();
            map.put(str,request.getParameter(str));
        }
        System.out.println(map);
        return map;
    }
}
