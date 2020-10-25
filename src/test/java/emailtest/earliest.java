package emailtest;

import org.junit.Test;
import util.EmailUtil;

import java.io.IOException;

public class earliest {
    @Test
    public  void testVeryCode() throws IOException {
        EmailUtil emailUtil=new EmailUtil();
        try {
            emailUtil.sendEmail("2213576511@qq.com");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
