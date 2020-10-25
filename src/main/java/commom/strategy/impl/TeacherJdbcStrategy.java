package commom.strategy.impl;

import commom.strategy.JdbcGetPojoStrategy;
import pojo.Teacher;
import util.ReflectUtil;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

/**
 * @author Florence
 * teacher封装策略
 */
public class TeacherJdbcStrategy implements JdbcGetPojoStrategy<Teacher> {
    @Override
    public Teacher strategy(ResultSet resultSet) throws SQLException {
        Teacher teacher = new Teacher();
        Map<String, String> pojoField = ReflectUtil.getPojoField(teacher);
        teacher.setArea(resultSet.getString(pojoField.get("area")));
        teacher.setId(resultSet.getInt(pojoField.get("id")));
        teacher.setCollege(resultSet.getString(pojoField.get("college")));
        teacher.setEmail(resultSet.getString(pojoField.get("email")));
        teacher.setFace(resultSet.getString(pojoField.get("face")));
        teacher.setDegree(resultSet.getString(pojoField.get("degree")));
        teacher.setGraduatedUniversity(resultSet.getString(pojoField.get("graduatedUniversity")));
        teacher.setMarkNumber(resultSet.getString(pojoField.get("markNumber")));
        teacher.setSex(resultSet.getString(pojoField.get("sex")));
        teacher.setUserName(resultSet.getString(pojoField.get("userName")));
        return teacher;
    }
}
