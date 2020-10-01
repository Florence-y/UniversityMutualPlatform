package util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;


/**
 * @author Florence
 */
public class WebUtil {
    /**
     * 001.json转换成对象
     * @param obj 传入对象
     * @param jsonStr json字符串
     * @return Object 封装城的对象
     */
    public static <T> T jsonToObj(T obj,String jsonStr) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return (T)mapper.readValue(jsonStr, obj.getClass());
    }
    /**
     * 002.对象转换成json
     * @param obj 转换的对象
     * @return json字符串
     */
    public static String objToJson(Object obj) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(obj);
    }


}
