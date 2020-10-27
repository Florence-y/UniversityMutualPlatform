package controller;

import org.elasticsearch.index.query.QueryBuilders;
import org.junit.Test;
import pojo.Found;
import pojo.Page;
import pojo.Question;
import pojo.QuestionContent;
import util.ElasticUtil;
import util.WebUtil;

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
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("authorMarkNumber", 191541227);
        map.put("imgAddress", "../wsss.jpg");
        map.put("questionType", "生活");
        map.put("title", "你在干嘛呢");
//        ElasticUtil.addDoc(map);
        QuestionContent a = new QuestionContent(1, "text", "adasdada");
        QuestionContent b = new QuestionContent(2, "img", "../adadsasd");
        QuestionContent[] questionContents = new QuestionContent[]{a, b};
        map.put("contents", questionContents);
//        ElasticUtil.addDoc(map,"question");
        System.out.println(WebUtil.mapToJson(map));
        ElasticUtil.addDoc(WebUtil.mapToJson(map), "question");
    }

    @Test
    public void mutipltySearcher() {
        Map<String, Object> map = new HashMap<>();
        map.put("message", "页我的是是啊刻意进项");
        List<String> list = ElasticUtil.multiOrSearch("question", map, 20, true);
        System.out.println(list);
    }

    @Test
    public void updateByIdTest() {

        Map<String, Object> map = new HashMap<>();
        map.put("sex", "男");
        map.put("userName", "傻59");
        int i = ElasticUtil.updateDocById("test", "VLyB9nQBGNAVaRfr6Bmn", map);

    }

    @Test
    public void getDoc() throws IOException {
        Page<Found> found = ElasticUtil.scrollSearchFirst("found", QueryBuilders.matchAllQuery(), new Found());
        Page<Found> foundPage = ElasticUtil.scrollSearch(found.getScrollId(), new Found());
        Page<Found> foundPage1 = ElasticUtil.scrollSearch(foundPage.getScrollId(), new Found());
        for (Found found1 : found.getDataList()) {
            System.out.println(found1.getFoundLocation());
        }
        System.out.println(found.isNext());
        for (Found found1 : foundPage.getDataList()) {
            System.out.println(found1.getFoundLocation());
        }
        System.out.println(foundPage.isNext());
        for (Found found1 : foundPage1.getDataList()) {
            System.out.println(found1.getFoundLocation());
        }
        System.out.println(foundPage1.isNext());
    }

    @Test
    public void addDocAndGetById() {

    }

    @Test
    public void divideWord() throws IOException {
        List<String> list = ElasticUtil.divideTheKeyWord("广东金融学院");
        System.out.println(list);
    }

    @Test
    public void getScroll() throws IOException {
//        Page<Found> found = ElasticUtil.scrollSearchFirst("found", QueryBuilders.matchAllQuery(), new Found());
        System.out.println(ElasticUtil.scrollSearch("FGluY2x1ZGVfY29udGV4dF91dWlkDXF1ZXJ5QW5kRmV0Y2gBFENnX0xPblVCZXNqYnpFeE9CWVRsAAAAAAAAKi8WMXR3aE5VRUtUX21EMTNZUkNaV09fQQ==", new Found()));
    }

    @Test
    public void addLost() {
    }

    @Test
    public void getByMutilySearch() {
        Map<String, Object> map = new HashMap<>();
        map.put("lostDescribe", "南");
        map.put("lostObjectName", "hua7");
        List<String> list = ElasticUtil.multiOrSearch("lost", map, 5, true);
        System.out.println(list);
    }

    @Test
    public void nestSearchTest() throws IOException {
        Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question", ElasticUtil.getNestedQuery("contents", "contentMain", "饭你说好不好吃"), new Question());
        System.out.println(questionPage);
    }
}
