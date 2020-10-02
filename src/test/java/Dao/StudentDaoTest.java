package Dao;

import dao.StudentDao;
import dao.impl.StudentDaoImpl;
import org.junit.Test;
import pojo.Student;

import java.util.HashMap;
import java.util.Map;

public class StudentDaoTest {
    @Test
    public void insertTest(){
        StudentDao dao = new StudentDaoImpl();
        Map<String,Object> map = new HashMap<>();
        map.put("id",0);
        map.put("markNumber","191541212");
        map.put("email","2213576511");
        map.put("sssss","dddd");
        map.put("ttt","88888888888");
        map.put("password","qqq13123");
        map.put("college","北京大学");
        map.put("major","计算机");
        map.put("level","大一");
        map.put("sssss","dddd");
        dao.insertRowByKeyAndValue(new Student(),map);
    }
}
