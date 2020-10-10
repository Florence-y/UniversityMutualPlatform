package service;

import pojo.Question;
import pojo.Response;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 问题服务接口
 */
public interface QuestionService {
    /**
     * 添加问题
     * @param fieldAndValueMapDoc 关于文档的键值对
     * @return 文档ID
     */
    String addQuestion(Map<String, Object> fieldAndValueMapDoc);

    /**
     * 更新问题
     * @param wantToUpdateFieldKey 想要更新的问题键值对
     * @param id 问题的id
     * @return 返回一个更新完的问题回去
     */
    Question updateQuestion(Map<String, Object> wantToUpdateFieldKey, String id) throws IOException;
}
