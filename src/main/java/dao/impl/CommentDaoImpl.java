package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.CommentJdbcStrategy;
import dao.CommentDao;
import pojo.Comment;
import pojo.Response;
import util.ReflectUtil;

import java.util.Map;

/**
 * @author DEL
 */
public class CommentDaoImpl extends BaseDaoImpl<Comment> implements CommentDao {
    @Override
    public String getTableName() {
        return "t_comment";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Comment());
    }

    @Override
    public JdbcGetPojoStrategy<Comment> getPackageStrategy() {
        return new CommentJdbcStrategy();
    }

    @Override
    public int insertComment(Map<String, Object> pojoMap) {
        int id = super.insertRowByKeyAndValue(new Comment(), pojoMap);
        return id > 0 ? Response.OK : Response.ERROR;
    }
}
