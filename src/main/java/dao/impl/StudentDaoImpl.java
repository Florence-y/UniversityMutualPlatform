package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
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
    public JdbcGetPojoStrategy getPackageStrategy() {
        return null;
    }

}
