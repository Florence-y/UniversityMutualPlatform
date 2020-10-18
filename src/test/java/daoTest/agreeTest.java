package daoTest;

import org.junit.Test;
import service.AgreeService;
import service.impl.AgreeServiceImpl;

import java.io.Serializable;
import java.text.MessageFormat;

public class agreeTest {
    @Test
    public void agreeCountTest() {
        AgreeService service = new AgreeServiceImpl();
        Serializable a = 1000000000;
        String format = MessageFormat.format("seee {0}", a);
        System.out.println(format);
    }
}
