package util;

import com.mchange.v2.c3p0.ComboPooledDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class C3P0Util {
    private static ComboPooledDataSource dataSource;
    //静态块初始化建表
    static {
        try {
            //先连接备用配置
            ComboPooledDataSource tempDataSource = new ComboPooledDataSource("initDatabase");
            Connection tempConnection= tempDataSource.getConnection();
            //建库
            PreparedStatement tempPreparedStatement= tempConnection.prepareStatement(MySql.CREATE_DATABASE.toString());
            tempPreparedStatement.executeUpdate();
            //关闭备用连接库
            tempDataSource.close();
            //重新连接建好刚建的库
            dataSource=new ComboPooledDataSource();
            //获取连接
            tempConnection=dataSource.getConnection();
            //建立用户表
            tempPreparedStatement=tempConnection.prepareStatement(MySql.CREATE_TABLE_USER.toString());
            tempPreparedStatement.executeUpdate();
            //建立文章表
            tempPreparedStatement=tempConnection.prepareStatement(MySql.CREATE_TABLE_ARTICLE.toString());
            tempPreparedStatement.executeUpdate();
            //建立评论表
            tempPreparedStatement=tempConnection.prepareStatement(MySql.CREATE_TABLE_COMMENT.toString());
            tempPreparedStatement.executeUpdate();
            //建立分类和文章的连接表
            tempPreparedStatement=tempConnection.prepareStatement(MySql.CREATE_TABLE_SORT_LINK_ARTICLE.toString());
            tempPreparedStatement.executeUpdate();
            //建立分类表
            tempPreparedStatement=tempConnection.prepareStatement(MySql.CREATE_TABLE_SORT.toString());
            tempPreparedStatement.executeUpdate();
            //添加默认分类（算法、后端和其他）
            tempPreparedStatement=tempConnection.prepareStatement(MySql.INSERT_SORT.toString());
            tempPreparedStatement.setInt(1,1);
            tempPreparedStatement.setString(2,"算法");
            tempPreparedStatement.executeUpdate();
            tempPreparedStatement.setInt(1,2);
            tempPreparedStatement.setString(2,"后端");
            tempPreparedStatement.executeUpdate();
            tempPreparedStatement.setInt(1,3);
            tempPreparedStatement.setString(2,"无");
            tempPreparedStatement.executeUpdate();
            //初始化第一个用户主键
            tempPreparedStatement=tempConnection.prepareStatement(MySql.INSERT_USER.toString());
            tempPreparedStatement.setInt(1,1);
            tempPreparedStatement.setString(2,"***");
            tempPreparedStatement.setString(3,"***");
            tempPreparedStatement.setString(4,"***");
            tempPreparedStatement.setString(5,"***");
            tempPreparedStatement.setString(6,"***");
            tempPreparedStatement.executeUpdate();
            close(tempConnection,tempPreparedStatement);
            System.out.println("初始化数据库表结构初始化完成");
        } catch (SQLException throwable) {
            System.out.println("数据库表结构已经建立，不用初始化");
        }
    }

    /**
     * 获取连接
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
     * @param conn 连接
     * @param pst prepareStatement语句
     * @param rs 结果集
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
     * @param conn 连接
     * @param pst prepareStatement语句
     */
    public static void close(Connection conn,PreparedStatement pst){
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
    public static void close(Connection conn){
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
    public static void close(Connection conn,ResultSet rs) {
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
