package dao;

import pojo.AnswerContent;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public interface AnswerContentDao extends BaseDao<AnswerContent> {

    /**
     * 获取文章内容（可以是文字或者图片）
     *
     * @param answerId 回答的id
     * @return 返回一个包含 AnswerContent的list
     */
    List<AnswerContent> getAnswerContentByAnswerId(int answerId);


    /**
     * 添加一行
     *
     * @param map 包含数据的map
     * @return 状态码
     */
    int addRow(Map<String, Object> map);
}
