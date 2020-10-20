package dao;

import pojo.Answer;
import pojo.Page;


import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 回答dao接口
 */
public interface AnswerDao extends BaseDao<Answer> {
    /**
     * 获取回答的列表
     * @param currentPage 当前页数
     * @param pageSize 页面大小
     * @param map 包含信息的map
     * @return 一个包含answer的list
     */
    List<Answer> getAnswers(int currentPage, int pageSize, Map<String, Object> map);
}
