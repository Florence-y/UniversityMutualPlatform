package emailtest;

import org.junit.Test;
import util.EmailUtil;

import java.io.IOException;

public class earliest {
    @Test
    public void testVeryCode() throws IOException {
        EmailUtil emailUtil = new EmailUtil();
        try {
            emailUtil.sendEmail("191543214@m.gduf.edu.cn");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
