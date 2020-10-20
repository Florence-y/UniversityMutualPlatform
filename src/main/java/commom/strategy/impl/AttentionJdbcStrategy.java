package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Attention;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 * Attention封装策略
 */
public class AttentionJdbcStrategy implements JdbcGetPojoStrategy<Attention> {

    @Override
    public Attention strategy(ResultSet resultSet) throws SQLException {
        Attention attention = new Attention();
        attention.setId(resultSet.getInt("attention_id"));
        attention.setMajorMarkNumber(resultSet.getString("attention_majorMarkNumber"));
        attention.setPassMarkNumber(resultSet.getString("attention_passMarkNumber"));
        attention.setMutual(resultSet.getBoolean("attention_isMutual"));
        return attention;
    }
}
