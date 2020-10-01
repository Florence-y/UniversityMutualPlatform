package untltest;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.Test;
import util.WebUtil;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class webUtilTest {
    @Test
    public void testmaptojson() throws IOException {
        Map<Integer,Integer> a = new HashMap<>();
        a.put(1,15);
        a.put(4,15);
        a.put(3,12);
        a.put(2,34);
        String b=WebUtil.mapToJson(a);
        Map<Integer,Integer> c= WebUtil.jsonToMap(b);
        System.out.println(c);
    }
    @Test
    public void getPojo(){

    }
}
