package reflectUtil;

import org.junit.Test;
import pojo.Student;
import util.ReflectUtil;

public class reflect {
    @Test
    public void testGetInsertsql(){
        System.out.println(ReflectUtil.getInsertSql(new Student(),new String[]{"id","markNumber","aaa"}));
    }
}
