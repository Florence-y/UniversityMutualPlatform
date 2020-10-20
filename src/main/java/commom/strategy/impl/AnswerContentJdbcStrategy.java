package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.AnswerContent;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author 问题回答包装类
 */
public class AnswerContentJdbcStrategy implements JdbcGetPojoStrategy<AnswerContent> {
    @Override
    public AnswerContent strategy(ResultSet resultSet) throws SQLException {
        AnswerContent answerContent = new AnswerContent();
        answerContent.setContentId(resultSet.getInt("content_id"));
        answerContent.setAnswerId(resultSet.getInt("answer_id"));
        answerContent.setContentOrder(resultSet.getInt("content_order"));
        answerContent.setContentType(resultSet.getString("content_type"));
        answerContent.setContentMain(resultSet.getString("content_main"));
        return answerContent;
    }
}
