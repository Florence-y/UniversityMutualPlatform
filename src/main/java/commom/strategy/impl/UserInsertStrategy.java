package commom.strategy.impl;

import commom.strategy.InsertStrategy;

import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * @author Florence
 */
public class UserInsertStrategy implements InsertStrategy {
    @Override
    public PreparedStatement strategy(Object[] value, PreparedStatement sqlStatement) {
        try {
            sqlStatement.setInt(1, (Integer) value[0]);
            for (int i=1;i<value.length;i++){
                sqlStatement.setString(i+1, (String) value[i]);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return sqlStatement;
    }
}
