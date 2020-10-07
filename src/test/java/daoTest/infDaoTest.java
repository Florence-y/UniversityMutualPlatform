package daoTest;

import dao.InfDao;
import dao.impl.InfDaoImpl;
import org.junit.Test;
import pojo.Inf;
import util.ReflectUtil;
import util.TimeUtil;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class infDaoTest {
    @Test
    public void insertInf() throws ParseException {
        InfDao dao = new InfDaoImpl();
        Map<String,Object> test= new HashMap<>();
        test.put("senderMarkNumber","19455632145");
        test.put("receiverMarkNumber","2121212121");
        test.put("content","来了来了");
        test.put("sendTime",new Timestamp(TimeUtil.getDetailDateObj("2020-06-30 13:52:33").getTime()));
        test.put("type","chat");
        test.put("senderName","吴晓吟");
        test.put("isRead",false);
        dao.insertRowByKeyAndValue(new Inf(),test);
    }
    @Test
    public void getInf(){
        InfDao dao = new InfDaoImpl();
        Inf pojo2=dao.selectById(3);

        System.out.println(pojo2);
    }
}
