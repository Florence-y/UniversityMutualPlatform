package commom.strategy.impl;



import pojo.User;
import commom.strategy.JdbcGetPojoStrategy;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
public class UserJdbcStrategy implements JdbcGetPojoStrategy<User> {
    @Override
    public User strategy(ResultSet resultSet) throws SQLException {
        User user = new User();
        return user;
    }
}
