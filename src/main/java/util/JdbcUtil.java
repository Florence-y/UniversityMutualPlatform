package util;

import commom.strategy.JdbcGetPojoStrategy;

import java.sql.*;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Florence
 */
public class JdbcUtil {

    /**
     * 执行一条sql语句（一般用来执行DDL语句）
     *
     * @param sql sql语句
     * @return 影响第几行
     */
    public static int executeSql(String sql) {
        try {
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            int i = preparedStatement.executeUpdate();
            C3P0Util.close(connection, preparedStatement);
            return i;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return -1;
    }

    /**
     * 根据可变参数设置未知值
     *
     * @param preparedStatement 预设定语句
     * @param value             参数值
     */
    private static void setPrepareStatementUnknown(PreparedStatement preparedStatement, Object[] value) {
        try {
            for (int i = 0; i < value.length; i++) {
                if (value[i].getClass().isAssignableFrom(Integer.class)) {
                    preparedStatement.setInt(i + 1, (Integer) value[i]);
                } else if (value[i].getClass().isAssignableFrom(String.class)) {
                    preparedStatement.setString(i + 1, (String) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Date.class)) {
                    preparedStatement.setDate(i + 1, (Date) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Boolean.class)) {
                    preparedStatement.setBoolean(i + 1, (Boolean) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Double.class)) {
                    preparedStatement.setDouble(i + 1, (Double) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Float.class)) {
                    preparedStatement.setFloat(i + 1, (Float) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Long.class)) {
                    preparedStatement.setLong(i + 1, (Long) value[i]);
                } else if (value[i].getClass().isAssignableFrom(Timestamp.class)) {
                    preparedStatement.setTimestamp(i + 1, (Timestamp) value[i]);
                }
            }
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
    }

    /**
     * 根据可变参数执行sql语句（用来进行删除或者更新语句）
     *
     * @param sql   sql语句
     * @param value 可变参数 也就是？的数量
     * @return 更新的条数
     */
    public static int update(String sql, Object... value) {
        try {
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            setPrepareStatementUnknown(preparedStatement, value);
            int i = preparedStatement.executeUpdate();
            C3P0Util.close(connection, preparedStatement);
            return i;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return -1;
    }

    /**
     * 根据查询语句获取一个实体对象，无参数的方法，还重载了一个有参数的方法
     *
     * @param sql            sql语句
     * @param strategyObject 获取设置对象的策略
     * @param <T>            泛型参数
     * @return 返回一个javabean对象
     */
    public static <T> T queryForJavaBean(String sql, JdbcGetPojoStrategy<T> strategyObject) {
        try {
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                T pojo = strategyObject.strategy(resultSet);
                C3P0Util.close(connection, preparedStatement, resultSet);
                return pojo;
            }
            else {
                C3P0Util.close(connection,preparedStatement,resultSet);
            }
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return null;
    }

    /**
     * 根据sql查询（多条数据）然后进行封装
     *
     * @param sql          sql语句
     * @param pojoStrategy 获取对象的策略
     * @param <T>          泛型类型
     * @return 返回的结果集合
     */
    public static <T> List<T> queryForJavaBeanAllData(String sql, JdbcGetPojoStrategy<T> pojoStrategy, Object... value) {
        try {
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            setPrepareStatementUnknown(preparedStatement, value);
            ResultSet resultSet = preparedStatement.executeQuery();
            List<T> resultList = new LinkedList<>();
            while (resultSet.next()) {
                resultList.add(pojoStrategy.strategy(resultSet));
            }
            C3P0Util.close(connection, preparedStatement, resultSet);
            return resultList;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return null;
    }

    /**
     * 根据sql获取ResultSet
     *
     * @param sql   sql语句
     * @param value 值
     * @return 返回获取到的结果集
     */
    public static ResultSet queryForGetResultSet(Connection con, String sql, Object... value) {
        try {
            assert con != null;
            PreparedStatement preparedStatement = con.prepareStatement(sql);
            setPrepareStatementUnknown(preparedStatement, value);
            return preparedStatement.executeQuery();
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return null;
    }

    /**
     * 根据sql设置参数 ？ ？ ？ ？ ？
     *
     * @param sql   插入语句
     * @param value 参数的值
     * @return 返回的行数
     */
    public static int insertOneRow(String sql, Object[] value) {
        try {
            int nowArticleId = 0;
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            setPrepareStatementUnknown(preparedStatement, value);
            preparedStatement.executeUpdate();
            ResultSet generatedKeys = preparedStatement.getGeneratedKeys();
            //获取刚插入的对象ID
            if (generatedKeys.next()) {
                nowArticleId = generatedKeys.getInt(1);
            }
            C3P0Util.close(connection, preparedStatement);
            System.out.println(nowArticleId);
            return nowArticleId;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return -1;
    }

    /**
     * 根据一个条件查询数据是否存在
     *
     * @param sql sql语句
     * @return 返回值
     */
    public static boolean isExistByOneCondition(String sql, Object... value) {
        try {
            boolean isExist = false;
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            //设置条件
            setPrepareStatementUnknown(preparedStatement, value);
            //查找用户是否存在
            ResultSet resultSet = preparedStatement.executeQuery();
            //是否存在？
            if (resultSet.next()) {
                isExist = true;
            }
            C3P0Util.close(connection, preparedStatement, resultSet);
            return isExist;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        //不存在
        return false;
    }

    /**
     * 根据查询语句获取一个实体对象，有参数的方法，还重载了一个无参数的方法
     *
     * @param sql             sql语句
     * @param packageStrategy 打包的策略
     * @param o               具体的？的参数
     * @param <T>             实体具体类型
     * @return 封装好的实体对象
     */
    public static <T> T queryForJavaBean(String sql, JdbcGetPojoStrategy<T> packageStrategy, Object... o) {
        try {
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            setPrepareStatementUnknown(preparedStatement, o);
            ResultSet resultSet = preparedStatement.executeQuery();
            T pojo = null;
            if (resultSet.next()) {
                pojo = packageStrategy.strategy(resultSet);
            }
            C3P0Util.close(connection, preparedStatement, resultSet);
            return pojo;
        } catch (SQLException throwable) {
            throwable.printStackTrace();
        }
        return null;
    }

    /**
     * 根据条件获取文章总数（也可以为无条件）
     *
     * @param sql   拼接完成的sql语句
     * @param value ？ 的值
     * @return 返回行的数量
     */
    public static int getCount(String sql, Object... value) {
        try {
            int anInt = -1;
            Connection connection = C3P0Util.getConnection();
            assert connection != null;
            //声明预备语句（放在enum类中）
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            //设置未知参数
            setPrepareStatementUnknown(preparedStatement, value);
            //执行查询
            ResultSet resultSet = preparedStatement.executeQuery();
            //获取总数
            if (resultSet.next()) {
                anInt = resultSet.getInt(1);
            }
            C3P0Util.close(connection, preparedStatement, resultSet);
            return anInt;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return -1;
    }

}
