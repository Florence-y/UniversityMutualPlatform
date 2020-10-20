package dao;

import pojo.Comment;

import java.util.Map;

/**
 * @author Florence
 * 评论dao接口
 */
public interface CommentDao extends BaseDao<Comment> {
    /**
     * 插入一条评论的信息
     *
     * @param pojoMap 实体map
     * @return 状态码
     */
    int insertComment(Map<String, Object> pojoMap);
}
