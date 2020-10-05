package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Inf;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
public class InfJdbcStrategy implements JdbcGetPojoStrategy<Inf> {
    @Override
    public Inf strategy(ResultSet resultSet) throws SQLException {
        return null;
    }
}
