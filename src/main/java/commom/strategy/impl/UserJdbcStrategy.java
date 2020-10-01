package commom.strategy.impl;


import commom.strategy.JdbcGetPojoStrategy;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
public class UserJdbcStrategy implements JdbcGetPojoStrategy<Object> {

    @Override
    public Object strategy(ResultSet resultSet) throws SQLException {
        return null;
    }
}
