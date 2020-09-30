package commom.strategy;

import java.sql.PreparedStatement;

/**
 * @author Florence
 */
public interface InsertStrategy {
    /**
     *
     * @param value 参数值
     * @param sqlStatement  插入的语句
     * @return 返回一个设置好的prepareStatement
     */
    PreparedStatement strategy(Object[] value, PreparedStatement sqlStatement);
}
