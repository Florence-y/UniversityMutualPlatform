package commom.strategy;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
public interface JdbcGetPojoStrategy<T> {
    /**
     * 策略模式的策略
     * @param resultSet 得到的结果集
     * @return 策略获取到的对象
     * @throws   SQLException SQL设置获取异常
     */
    T strategy(ResultSet resultSet) throws SQLException;
}
