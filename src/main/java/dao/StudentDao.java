package dao;

import pojo.Student;

/**
 * @author Florence
 */
public interface StudentDao extends BaseDao<Student> {
    /**
     * 根据值来更新用户信息
     *
     * @param value 值 （最后一个是条件）
     * @return 返回值
     */
    int updateColByOneCondition(Object... value);

    /**
     * 根据键值条件删除记录
     *
     * @param condition 条件
     * @param o         具体的值
     * @return 影响的行数
     */
    int deleteByOneCondition(String condition, Object o);

    /**
     * 根据条件获取一个对象
     *
     * @param condition 条件
     * @param o         值
     * @return 学生对象
     */
    Student getStudentByCondition(String condition, Object o);
}
