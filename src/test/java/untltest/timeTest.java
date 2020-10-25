package untltest;

import org.junit.Test;
import util.TimeUtil;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Date;

public class timeTest {
    @Test
    public void testGap() throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        TimeUtil.getTimeGap(df.parse("2020-10-06 07:00:00"),new Date(new java.util.Date().getTime()),TimeUtil.DAY);
    }
    @Test
    public void testTimeStamp() {
        Timestamp a = new Timestamp(System.currentTimeMillis());
        System.out.println(a.getTime());
        String b = a.toString();
        b=b.substring(0,b.lastIndexOf("."));
        System.out.println(b);
    }
}
