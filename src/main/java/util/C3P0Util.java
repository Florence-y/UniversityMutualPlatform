package util;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 * C3P0数据库
 */
public class C3P0Util {
    private static ComboPooledDataSource dataSource;

    //静态块初始化建表
    static {
        try {
            //先连接备用配置
            ComboPooledDataSource tempDataSource = new ComboPooledDataSource("initDatabase");
            Connection tempConnection = tempDataSource.getConnection();
            //建库
            PreparedStatement tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_DATABASE.toString());
            tempPreparedStatement.executeUpdate();
            //关闭备用连接库
            tempDataSource.close();
            //重新连接建好刚建的库
            dataSource = new ComboPooledDataSource();
            //获取连接
            tempConnection = dataSource.getConnection();
            //建立学生表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_STUDENT.toString());
            tempPreparedStatement.executeUpdate();
            //建立老师表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_TEACHER.toString());
            tempPreparedStatement.executeUpdate();
            //建立消息通知表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_INF.toString());
            tempPreparedStatement.executeUpdate();
            //建立关注表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_ATTENTION.toString());
            tempPreparedStatement.executeUpdate();
            //建立学号用户类型连接表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_MARK_NUMBER_TYPE.toString());
            tempPreparedStatement.executeUpdate();
            //建立回答表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_ANSWER.toString());
            tempPreparedStatement.executeUpdate();
            //建立评论表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_COMMENT.toString());
            tempPreparedStatement.executeUpdate();
            //建立问题点赞表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_QUESTION_AGREE.toString());
            tempPreparedStatement.executeUpdate();
            //建立回答点赞表
            tempPreparedStatement = tempConnection.prepareStatement(MySql.CREATE_TABLE_ANSWER_AGREE.toString());
            tempPreparedStatement.executeUpdate();
            close(tempConnection, tempPreparedStatement);
            System.out.println("初始化数据库表结构初始化完成");
        } catch (SQLException throwable) {
            System.out.println("数据库表结构已经建立，不用初始化");
        }
    }

    /**
     * 获取连接
     *
     * @return 返回连接
     */
    public static Connection getConnection() {
        try {
            return dataSource.getConnection();
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("数据库获取连接失败");
            return null;
        }
    }

    /**
     * 释放资源（用于查询方法）
     *
     * @param conn 连接
     * @param pst  prepareStatement语句
     * @param rs   结果集
     */
    public static void close(Connection conn, PreparedStatement pst, ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println("ResultSet数据库资源解放失败");
            }
        }
        if (pst != null) {
            try {
                pst.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
    }

    /**
     * 解放资源（用于修改语句）
     *
     * @param conn 连接
     * @param pst  prepareStatement语句
     */
    public static void close(Connection conn, PreparedStatement pst) {
        if (pst != null) {
            try {
                pst.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
    }

    public static void close(ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println("ResultSet数据库资源解放失败");
            }
        }
    }

    public static void close(Connection conn, ResultSet rs) {
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                System.out.println("ResultSet数据库资源解放失败");
            }
        }
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                System.out.println("PreparedStatement数据库资源解放失败");
            }
        }
    }
}
