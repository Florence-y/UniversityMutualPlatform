package dao;

import pojo.Teacher;

/**
 * @author Florecne
 */
public interface TeacherDao extends BaseDao<Teacher> {
    /**
     * 根据键值对更新用户信息（最后位置放条件）
     *
     * @param value 键值对
     * @return 状态码
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
     * 根据条件得到一个教师对象
     *
     * @param condition 条件
     * @param o         条件的值
     * @return 返回封装好的教师对象
     */
    Teacher getTeacherByCondition(String condition, Object o);

}
