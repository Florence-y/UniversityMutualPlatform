package serviceTest;

import org.junit.Test;
import pojo.Found;
import service.LostAndFoundService;
import service.impl.LostAndFoundServiceImpl;
import util.TimeUtil;

import java.io.IOException;

public class LostAndFoundTest {
    @Test
    public void getTest() throws IOException {
        LostAndFoundService service = new LostAndFoundServiceImpl();
//        Lost lostByTerm = service.getLostByTerm("0z4bMnUBwB-h7lQ2mfpp");
//        System.out.println(lostByTerm);
        Found found = service.getFoundByTerm("vj4QMnUBwB-h7lQ2nPm7");
        System.out.println(TimeUtil.getDetailDateString(found.getFoundTime()));
        System.out.println(found);
    }
}
