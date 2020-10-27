package untltest;

import org.junit.Test;
import util.SensitiveWordFilterUtil;

public class SensitiveWordTest {
    @Test
    public void testSensitiveWord() {
        String a = SensitiveWordFilterUtil.filterCommonSensitiveWord("法轮");
        System.out.println(a);
        System.out.println("***".replace("***", "abc"));
    }
}
