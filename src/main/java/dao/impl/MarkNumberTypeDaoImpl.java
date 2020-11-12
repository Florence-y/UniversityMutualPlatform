package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import dao.MarkNumberTypeDao;
import lombok.extern.slf4j.Slf4j;
import util.C3P0Util;
import util.JdbcUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 */
@Slf4j
public class MarkNumberTypeDaoImpl extends BaseDaoImpl implements MarkNumberTypeDao {
    public static final String MARK_NUMBER_COL = "markNumberType_markNumber";
    public static final String USER_TYPE_COL = "markNumber_userType";

    @Override
    public String getTableName() {
        return "t_markNumberType";
    }

    @Override
    public String getTableIdField() {
        return "markNumberType_id";
    }

    @Override
    public JdbcGetPojoStrategy getPackageStrategy() {
        return null;
    }

    @Override
    public String getUserType(String markNumber) {
        String userType=null;
        try {
            Connection connection = C3P0Util.getConnection();
            String sql = "SELECT * FROM " + getTableName() + " WHERE " + MARK_NUMBER_COL + " =?";
            ResultSet resultSet = JdbcUtil.queryForGetResultSet(connection, sql, markNumber);
            assert resultSet != null;
            if (resultSet.next()) {
                userType= resultSet.getString(USER_TYPE_COL);
            }
            C3P0Util.close(connection, resultSet);
        } catch (SQLException throwable) {
            log.error("获取用户类型失败{}", throwable.getMessage());
            throwable.printStackTrace();
        }
        if (userType==null){
            System.out.println("此用户类型没有记录");
        }
        return userType;
    }
}
