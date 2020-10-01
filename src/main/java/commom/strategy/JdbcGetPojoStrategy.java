package commom.strategy;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
public interface JdbcGetPojoStrategy<T> {
    /**
     * @param resultSet 得到的结果集
     * @return 策略获取到的对象
     */
     T strategy(ResultSet resultSet) throws SQLException;
}
