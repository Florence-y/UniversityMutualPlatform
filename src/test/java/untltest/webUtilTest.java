package untltest;

import org.junit.Test;
import util.WebUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class webUtilTest {
    @Test
    public void testmaptojson() throws IOException {
        Map<String, Object> map = new HashMap<>();
        map.put("11", "22");
        map.put("22", "33");
        System.out.println(WebUtil.mapToJson(map));
        Map<String, Object> map1 = WebUtil.jsonToMap(WebUtil.mapToJson(map));
        System.out.println(WebUtil.mapToJson(map1));
    }

    @Test
    public void getPojo() {

    }
}
