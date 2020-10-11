package dao;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 基本dao类接口
 */
public interface BaseDao<T> {
    /**
     * 根据id查找
     *
     * @param id 要求的id
     * @return 返回值
     */
    T selectById(int id);

    /**
     * 根据一项条件，更新数据库
     *
     * @param pojo  实体类对象
     * @param value 可变参数
     * @return 返回在第几行影响
     */
    int updateColByOneCondition(T pojo, Object... value);

    /**
     * 插入一条数据
     *
     * @param pojo  实体类对象
     * @param value 可变参数
     * @return 影响在第几行
     */
    int insertOneRow(T pojo, Object... value);

    /**
     * 根据id删除
     *
     * @param id id
     * @return 返回值
     */
    int deleteById(int id);

    /**
     * 获取全部数据
     *
     * @return 返回拥有全部数据的对象
     */
    List<T> getAllRow();

    /**
     * 查询符合某个条件的数据是否存在
     *
     * @param keyAndValue 键值对
     * @return 是否存在
     */
    boolean isExistQueryBySomeCondition(Object... keyAndValue);

    /**
     * 获取n行数据
     *
     * @param n 具体多少行
     * @return 返回一个含有数据的list
     */
    List<T> getNRow(int n);

    /**
     * 根据键值对插入对象
     *
     * @param pojo               实体对象
     * @param wantToInsertKeyVal 想插入的键值对 key value
     * @return 插入对象的id
     */
    int insertRowByKeyAndValue(T pojo, Map<String, Object> wantToInsertKeyVal);

    /**
     * 根据一个条件删除记录
     *
     * @param pojo      实体对象
     * @param condition 条件（列的值）
     * @param o         具体条件的值
     * @return 影响的行数
     */
    int deleteByOneCondition(T pojo, String condition, Object o);

    /**
     * 根据开始的位置和行数获取数据
     *
     * @param pojo  实体类对象
     * @param begin 开始的地方
     * @param size  大小
     * @return 返回的对象列表
     */
    List<T> getRowBeginNumAndSize(T pojo, int begin, int size);

    /**
     * 根据页面开始的地方与文章
     *
     * @param pojo      实体对象
     * @param begin     开始的页数
     * @param size      文章的数量
     * @param condition 具体的条件
     * @return 返回一个封装好的List对象
     */
    List<T> getRowBeginNumAndSizeByCondition(T pojo, int begin, int size, Map<String, Object> condition);

    /**
     * 根据条件计数
     *
     * @param pojo 实体对象
     * @param map  条件集合
     * @return 返回值
     */
    int getCountByCondition(T pojo, Map<String, Object> map);

    /**
     * 任意键值对（数据库列名没用反射获得，得实际填写！！！！！！）
     *
     * @param condition 数据库列名
     * @param o         具体的数据库列值
     * @return 影响的行数
     */
    int deleteByKeyAndValue(String condition, Object o);

    /**
     * 拿根据键值对拿到一行数据
     *
     * @param condition 键
     * @param o         值
     * @return 返回一个封装好的对象
     */
    T selectOneColByOneCondition(String condition, Object o);
}
