package service;

import pojo.Comment;
import pojo.Page;

import java.util.Map;

/**
 * @author Florence
 * 评论服务类接口
 */
public interface CommentService {
    /**
     * 添加评论
     *
     * @param map 包含评论数据map
     * @return 状态码
     */
    int addComment(Map<String, Object> map);

    /**
     * 更新评论
     *
     * @param map       包含更新数据的map
     * @param condition 条件
     * @return 新的对象
     */
    Comment editComment(Map<String, Object> map, String condition);

    /**
     * 获取一个问题的评论
     *
     * @param getType 获取的类型 individual：个人中心那里 和 answer 回答页面那里
     * @param dataMap 数据map
     * @return 返回包含评论的列表
     */
    Page<Comment> getComments(String getType, Map<String, Object> dataMap);
}
