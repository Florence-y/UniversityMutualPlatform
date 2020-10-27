package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import dao.TagDao;
import util.C3P0Util;
import util.JdbcUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Florence
 * 分类dao获取类
 */
public class TagDaoImpl extends BaseDaoImpl implements TagDao {

    @Override
    public String getTableName() {
        return "t_tags";
    }

    @Override
    public String getTableIdField() {
        return "tag_name";
    }

    @Override
    public JdbcGetPojoStrategy getPackageStrategy() {
        return null;
    }


    @Override
    public List<String> getAllQuestionType() throws SQLException {
        List<String> list = new ArrayList<>();
        String sql = "SELECT tag_name from " + getTableName();
        Connection connection = C3P0Util.getConnection();
        ResultSet resultSet = JdbcUtil.queryForGetResultSet(connection, sql);
        while (resultSet.next()) {
            list.add(resultSet.getString("tag_name"));
        }
        return list;
    }
}
