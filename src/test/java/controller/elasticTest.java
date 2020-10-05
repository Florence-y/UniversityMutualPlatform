package controller;

import org.junit.Test;
import util.ElasticUtil;

import java.io.IOException;

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
        ElasticUtil.addDoc();
    }
}
