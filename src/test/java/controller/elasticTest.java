package controller;

import org.junit.Test;
import org.omg.CORBA.MARSHAL;
import pojo.Student;
import util.ElasticUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class elasticTest {
    @Test
    public void divideWordTest() throws IOException {
        ElasticUtil.addIndex();
    }

    @Test
    public void getMappings() throws IOException {
        ElasticUtil.getMappings("test");
    }
    @Test
    public void addDoc() throws IOException {
        ElasticUtil.addDoc(new HashMap<String, Object>());
    }
    @Test
    public void mutipltySearcher(){
        Map<String, Object> map = new HashMap<>();
        map.put("message","页我的是是啊刻意进项");
        List<String> list = ElasticUtil.multiOrSearch(map, 20,true);
        System.out.println(list);
    }
    @Test
    public void updateByIdTest(){

        Map<String,Object> map = new HashMap<>();
        map.put("sex","男");
        map.put("userName","傻59");
        int i = ElasticUtil.updateDocById("test", "VLyB9nQBGNAVaRfr6Bmn", map);
    }
}
