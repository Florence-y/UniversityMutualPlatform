package service;

import pojo.Comment;

import java.util.Map;

/**
 * @author Florence
 * 评论服务类接口
 */
public interface CommentService {
    /**
     * 添加评论
     * @param map 包含评论数据map
     * @return 状态码
     */
    int  addComment(Map<String, Object> map);

    /**
     * 更新评论
     * @param map 包含更新数据的map
     * @param  condition 条件
     * @return 新的对象
     */
    Comment editComment(Map<String, Object> map,String condition);
}
