package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.TeacherJdbcStrategy;
import dao.TeacherDao;
import pojo.Teacher;
import util.ReflectUtil;

/**
 * @author Florence
 */
public class TeacherDaoImpl extends BaseDaoImpl<Teacher> implements TeacherDao {
    @Override
    public String getTableName() {
        return "t_teacher";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Object());
    }

    @Override
    public JdbcGetPojoStrategy getPackageStrategy() {
        return new TeacherJdbcStrategy();
    }

    @Override
    public int updateColByOneCondition(Object... value) {
        return super.updateColByOneCondition(new Teacher(), value);
    }

    @Override
    public int deleteByOneCondition(String condition, Object o) {
        return super.deleteByOneCondition(new Teacher(), condition, o);
    }

    @Override
    public Teacher getTeacherByCondition(String condition, Object o) {
        return super.selectOneColByOneCondition(condition, o);
    }
}
