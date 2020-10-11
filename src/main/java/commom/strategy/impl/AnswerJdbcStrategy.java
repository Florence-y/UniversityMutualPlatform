package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Answer;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Answer实体对象封装策略
 */
public class AnswerJdbcStrategy implements JdbcGetPojoStrategy<Answer> {
    @Override
    public Answer strategy(ResultSet resultSet) throws SQLException {
        Answer answer = new Answer();
        return answer;
    }
}
