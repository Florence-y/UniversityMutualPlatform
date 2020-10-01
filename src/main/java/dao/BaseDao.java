package dao;

import java.util.List;

/**
 * @author Florence
 * 基本dao类接口
 */
public interface BaseDao<T> {
    /**
     * 根据id查找
     * @param id 要求的id
     * @return 返回值
     */
    T selectById(int id);

    /**
     * 根据一项条件，更新数据库
     * @param pojo 实体类对象
     * @param value 可变参数
     * @return 返回在第几行影响
     */
    int updateColByOneCondition(T pojo, Object... value);

    /**
     * 插入一条数据
     * @param pojo 实体类对象
     * @param value 可变参数
     * @return 影响在第几行
     */
    int insertOneRow(T pojo, Object... value);

    /**
     * 根据id删除
     * @param id id
     * @return 返回值
     */
    int deleteById(int id);

    /**
     * 获取全部数据
     * @return 返回拥有全部数据的对象
     */
     List<T> getAllRow();

    /**
     * 查询符合某个条件的数据是否存在
     * @param keyAndValue 键值对
     * @return 是否存在
     */
     boolean isExistQueryBySomeCondition(Object... keyAndValue);

    /**
     * 获取n行数据
     * @param n 具体多少行
     * @return 返回一个含有数据的list
     */
     List<T> getNRow(int n);
}
