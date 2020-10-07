package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Inf;
import util.TimeUtil;

import java.sql.ResultSet;
import java.sql.SQLException;


/**
 * @author Florence
 *
 */
public class InfJdbcStrategy implements JdbcGetPojoStrategy<Inf> {
    @Override
    public Inf strategy(ResultSet resultSet) throws SQLException {
        Inf inf = new Inf();
        inf.setId(resultSet.getInt("inf_id"));
        inf.setSenderMarkNumber(resultSet.getString("inf_senderMarkNumber"));
        inf.setReceiverMarkNumber(resultSet.getString("inf_receiverMarkNumber"));
        inf.setContent(resultSet.getString("inf_content"));
        inf.setSendTime(resultSet.getTimestamp("inf_sendTime"));
        inf.setAdditionContent(resultSet.getString("inf_additionContent"));
        inf.setType(resultSet.getString("inf_type"));
        inf.setSenderName(resultSet.getString("inf_senderName"));
        inf.setInfIsRead(resultSet.getInt("inf_isRead"));
        //设置离目前是多长时间
        inf.setTimeUpToNow(TimeUtil.getTimeGapToSpecialStr(inf.getSendTime()));
        return inf;
    }
}
