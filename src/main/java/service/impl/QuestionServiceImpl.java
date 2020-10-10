package service.impl;

import org.apache.commons.codec.BinaryDecoder;
import pojo.Question;
import pojo.Response;
import service.QuestionService;
import util.ElasticUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 问题服务类
 */
public class QuestionServiceImpl implements QuestionService {
    public static final String INDEX = "question";


    @Override
    public String addQuestion(Map<String, Object> fieldAndValueMapDoc) {
        return ElasticUtil.addDoc(fieldAndValueMapDoc, INDEX);
    }

    @Override
    public Question updateQuestion(Map<String, Object> wantToUpdateFieldKey, String id) throws IOException {
        int code = ElasticUtil.updateDocById(INDEX, id, wantToUpdateFieldKey);
        if (code== Response.ERROR){
            return null;
        }
        String jsonQuestion = ElasticUtil.getDocById(INDEX,id);
        System.out.println(jsonQuestion);
        return WebUtil.jsonToObj(Question.class,jsonQuestion);
    }
}
