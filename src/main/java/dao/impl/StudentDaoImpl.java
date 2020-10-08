package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.StudentJdbcStrategy;
import dao.StudentDao;
import pojo.Student;
import util.ReflectUtil;

/**
 * @author Florence
 */
public class StudentDaoImpl extends BaseDaoImpl<Student> implements StudentDao {
    @Override
    public String getTableName() {
        return "t_student";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Object());
    }

    @Override
    public JdbcGetPojoStrategy<Student> getPackageStrategy() {
        return new StudentJdbcStrategy();
    }

    @Override
    public int updateColByOneCondition(Object... value) {
        return super.updateColByOneCondition(new Student(), value);
    }


    @Override
    public int deleteByOneCondition(String condition, Object o) {
        return super.deleteByOneCondition(new Student(), condition, o);
    }

    @Override
    public Student getStudentByCondition(String condition, Object o) {
        return super.selectOneColByOneCondition(condition, o);
    }


}
