package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.AnswerJdbcStrategy;
import dao.AnswerDao;
import pojo.Answer;
import util.ReflectUtil;

/**
 * @author Florence
 */
public class AnswerDaoImpl extends BaseDaoImpl<Answer> implements AnswerDao {
    @Override
    public String getTableName() {
        return "t_answer";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Answer());
    }

    @Override
    public JdbcGetPojoStrategy<Answer> getPackageStrategy() {
        return new AnswerJdbcStrategy();
    }
}
