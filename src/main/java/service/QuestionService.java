package service;

import com.fasterxml.jackson.core.JsonProcessingException;
import pojo.Question;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 问题服务接口
 */
public interface QuestionService {
    /**
     * 添加问题
     *
     * @param fieldAndValueMapDoc 关于文档的键值对
     * @return 文档ID
     */
    String addQuestion(Map<String, Object> fieldAndValueMapDoc) throws JsonProcessingException;

    /**
     * 更新问题
     *
     * @param wantToUpdateFieldKey 想要更新的问题键值对
     * @param id                   问题的id
     * @return 返回一个更新完的问题回去
     * @throws IOException 获取异常
     */
    Question updateQuestion(Map<String, Object> wantToUpdateFieldKey, String id) throws IOException;

    /**
     * 根据问题id获取文章详细信息
     *
     * @param id  问题的id
     * @param map 包含数据的map
     * @return 返回一个问题对象
     * @throws IOException 转换json异常
     */
    Question getDetailQuestion(String id, Map<String, Object> map) throws IOException;
}
