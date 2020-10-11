package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import dao.BaseDao;
import util.ArrayUtil;
import util.C3P0Util;
import util.JdbcUtil;
import util.ReflectUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.MessageFormat;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static util.ArrayUtil.getArrByOddOrEven;

/**
 * @author Florence
 */
public abstract class BaseDaoImpl<T> implements BaseDao<T> {
    private static final int TWO = 2;
    Connection connection;
    PreparedStatement preparedStatement;
    ResultSet resultSet;

    /**
     * 获取 T 表的名字
     *
     * @return 数据库表的名字
     */
    public abstract String getTableName();

    /**
     * 获取某一列名
     *
     * @return 返回列名
     */
    public abstract String getTableIdField();

    /**
     * 获取相应的jdbc策略
     *
     * @return 获取封装策略
     */
    public abstract JdbcGetPojoStrategy<T> getPackageStrategy();

    /**
     * 根据id获取一个对象
     *
     * @param id 要求的id
     * @return 返回一个javabean对象
     */
    @Override
    public T selectById(int id) {
        String sql = MessageFormat.format("select * from {0} where {1} = {2}", getTableName(), getTableIdField(), id);
        return JdbcUtil.queryForJavaBean(sql, getPackageStrategy());
    }

    /**
     * 根据最后一个条件更新一些
     * 函数的用法 key value key value key value （condition） key value
     *
     * @param pojo 实体类对象
     * @return 返回更新到几行
     */
    @Override
    public int updateColByOneCondition(T pojo, Object... value) {
        try {
            if (value.length % TWO != 0) {
                throw new Exception("参数长度有问题");
            }
            //先利用反射拼接语句，然后根据参数设置
            System.out.println(Arrays.toString(value));
            return JdbcUtil.update(ReflectUtil.getUpdateSql(pojo, getArrByOddOrEven(value, ArrayUtil.ODD)), getArrByOddOrEven(value, ArrayUtil.EVEN));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 插入一行数据
     *
     * @param pojo 实体类对象
     * @return 影响到第几行
     */
    @Override
    public int insertOneRow(T pojo, Object... value) {
        StringBuilder unKnowParameter = new StringBuilder();
        for (int i = 0; i < value.length - 1; i++) {
            unKnowParameter.append("?,");
        }
        unKnowParameter.append("?");
        String sql = "INSERT INTO " + getTableName() + " VALUES (" + unKnowParameter + ")";
        return JdbcUtil.insertOneRow(sql, value);
    }

    /**
     * 根据id删除一条数据
     *
     * @param id id
     * @return 如果为-1则失败
     */
    @Override
    public int deleteById(int id) {
        String sql = MessageFormat.format("DELETE FROM {0} WHERE {1} = {2}", getTableName(), getTableIdField(), id);
        return JdbcUtil.executeSql(sql);
    }

    /**
     * 获取全部的行
     *
     * @return 返回所有数据
     */
    @Override
    public List<T> getAllRow() {
        String sql = MessageFormat.format("select * from {0} ", getTableName());
        return JdbcUtil.queryForJavaBeanAllData(sql, getPackageStrategy());
    }

    /**
     * 根据一个键值对判断是否存在该数据 WHERE KEY =VALUE
     *
     * @param keyAndValue 键值对
     * @return 只有两个条件
     */
    @Override
    public boolean isExistQueryBySomeCondition(Object... keyAndValue) {
        try {
            if (keyAndValue.length != 2) {
                throw new Exception("可变参数输入异常");
            }
            String sql = "SELECT * FROM " + getTableName() + " WHERE " + keyAndValue[0] + " = ? limit 1";
            return JdbcUtil.isExistByOneCondition(sql, keyAndValue[1]);
        } catch (Exception e) {
            e.printStackTrace();
            C3P0Util.close(connection, resultSet);
        }
        return false;
    }

    /**
     * 获取n行数据
     *
     * @param n 具体多少行
     * @return 返回一个含有数据的list
     */
    @Override
    public List<T> getNRow(int n) {
        String sql = MessageFormat.format("select * from {0} LIMIT {1}", getTableName(), n);
        return JdbcUtil.queryForJavaBeanAllData(sql, getPackageStrategy());
    }

    /**
     * 根据一个杂乱的map，获取只跟实体信息有关的map，然后进行插入
     *
     * @param pojo               实体对象
     * @param wantToInsertKeyVal 想插入的键值对没有无关信息
     * @return 插入对象的id
     */
    @Override
    public int insertRowByKeyAndValue(T pojo, Map<String, Object> wantToInsertKeyVal) {
        //获取只有实体属性有的键值对
        Object[] keyAndValue = ArrayUtil.keyValueMapToPojoArr(wantToInsertKeyVal, pojo);
        //根据获得的数组的key 进行sql语句拼接
        String sql = ReflectUtil.getInsertSql(pojo, ArrayUtil.getArrByOddOrEven(keyAndValue, ArrayUtil.ODD));
        //然后再根据value的值进行setPrepareStatement
        return JdbcUtil.insertOneRow(sql, ArrayUtil.getArrByOddOrEven(keyAndValue, ArrayUtil.EVEN));
    }

    /**
     * 根据一个条件删除记录
     *
     * @param pojo      实体对象
     * @param condition 条件（列的值）
     * @param o         具体条件的值
     */
    @Override
    public int deleteByOneCondition(T pojo, String condition, Object o) {
        String sql = "DELETE FROM " + getTableName() + " WHERE " + ReflectUtil.getColVal(pojo, condition) + "=?";
        return JdbcUtil.update(sql, o);
    }

    /**
     * 任意键值对（数据库列名没用反射获得，得实际填写！！！！！！）
     *
     * @param condition 数据库列名
     * @param o         具体的数据库列值
     * @return 影响的行数
     */
    @Override
    public int deleteByKeyAndValue(String condition, Object o) {
        String sql = "DELETE FROM " + getTableName() + " WHERE " + condition + " =?";
        return JdbcUtil.update(sql, o);
    }

    /**
     * 拿根据键值对拿到一行数据
     *
     * @param condition 键
     * @param o         值
     * @return 返回一个封装好的对象
     */
    @Override
    public T selectOneColByOneCondition(String condition, Object o) {
        String sql = "SELECT * FROM " + getTableName() + " WHERE " + condition + "= ? LIMIT 1";
        return (T) JdbcUtil.queryForJavaBean(sql, getPackageStrategy(), o);
    }

    /**
     * 根据limit begin size 获取数据
     *
     * @param pojo  实体类对象
     * @param begin 开始的地方
     * @param size  大小
     * @return 获取到的list结果
     */
    @Override
    public List<T> getRowBeginNumAndSize(T pojo, int begin, int size) {
        String sql = MessageFormat.format("SELECT * FROM " + getTableName() + "WHERE" + " LIMIT {0},{1}", begin, size);
        return JdbcUtil.queryForJavaBeanAllData(sql, getPackageStrategy());
    }

    @Override
    public List<T> getRowBeginNumAndSizeByCondition(T pojo, int begin, int size, Map<String, Object> condition) {
        Object[] objects = ArrayUtil.keyValueMapToPojoArr(condition, pojo);
        String sql = MessageFormat.format("select * from {0} WHERE {1} {2} LIMIT {3},{4}",
                //表名
                getTableName(),
                //获取条件语句 where 1=1 and field1=？and field2=？
                ReflectUtil.getConditionAnd(pojo, ArrayUtil.getArrByOddOrEven(objects, ArrayUtil.ODD)),
                //获取排序语句 order by field +方向
                ReflectUtil.getOrder(condition, pojo),
                //开始的地方
                begin,
                //页面的大小
                size);
        //调用jdbc获取封装对象
        return JdbcUtil.queryForJavaBeanAllData(sql, getPackageStrategy(), ArrayUtil.getArrByOddOrEven(objects, ArrayUtil.EVEN));
    }

    /**
     * 根据条件计算总的记录数目
     *
     * @param pojo 实体对象
     * @param map  可以是一个含有其他不关于数据库的map，代码已经排除异类
     * @return 得到的记录总数
     */
    @Override
    public int getCountByCondition(T pojo, Map<String, Object> map) {
        Object[] objects = ArrayUtil.keyValueMapToPojoArr(map, pojo);
        String sql = "SELECT count(*) FROM " + getTableName() + " WHERE " + ReflectUtil.getConditionAnd(pojo, ArrayUtil.getArrByOddOrEven(objects, ArrayUtil.ODD));
        return JdbcUtil.getCount(sql, ArrayUtil.getArrByOddOrEven(objects, ArrayUtil.EVEN));
    }
}
