package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Comment;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 * 评论包装类
 */
public class CommentJdbcStrategy implements JdbcGetPojoStrategy<Comment> {
    @Override
    public Comment strategy(ResultSet resultSet) throws SQLException {
        Comment comment = new Comment();
        return comment;
    }
}
