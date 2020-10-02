package util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import commom.annontation.DbCol;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;


/**
 * @author Florence
 */
public class WebUtil {
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
     * @throws JsonProcessingException
     */
    public static String mapToJson(Map map) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(map);
    }

    /**
     * json转Map
     * @param json jsonString
     * @return 得到的Map
     * @throws IOException
     */
    public static Map jsonToMap(String json) throws IOException {
        ObjectMapper mapper=new ObjectMapper();
        return mapper.readValue(json,Map.class);
    }

    /**
     * 根据对象获取 列名： 值 对
     * @param po 对象
     * @param <T> 泛型
     * @return 封装好的map
     * @throws IllegalAccessException
     */
    public static <T> Map<String,Object> getPara(T po) throws IllegalAccessException {
        Class clazz = po.getClass();
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
     * @return
     * @throws IOException
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
     * @param <T>
     * @return
     */
    public static <T> T getJson(HttpServletRequest request, Class<T> clazz) {
        try {
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(request.getInputStream(), "UTF-8"));
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
        } catch (Exception e) {
        }
        return null;
    }

    /**
     * 获取json字符串
     * @param req
     * @return
     */
    public static String getJsonString(HttpServletRequest req) {
        try {
            BufferedReader streamReader = new BufferedReader(new InputStreamReader(req.getInputStream(), "UTF-8"));
            StringBuilder responseStrBuilder = new StringBuilder();
            String inputStr;
            while ((inputStr = streamReader.readLine()) != null) {
                responseStrBuilder.append(inputStr);
            }

            return responseStrBuilder.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

}
