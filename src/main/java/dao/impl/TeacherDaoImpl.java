package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
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
        return  ReflectUtil.getIdField(new Object());
    }

    @Override
    public JdbcGetPojoStrategy getPackageStrategy() {
        return null;
    }


}
