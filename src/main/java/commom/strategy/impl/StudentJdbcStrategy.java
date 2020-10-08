package commom.strategy.impl;


import commom.strategy.JdbcGetPojoStrategy;
import pojo.Student;
import util.ReflectUtil;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

/**
 * @author Florence
 */
public class StudentJdbcStrategy implements JdbcGetPojoStrategy<Student> {

    @Override
    public Student strategy(ResultSet resultSet) throws SQLException {
        Student student = new Student();
        Map<String, String> pojoField = ReflectUtil.getPojoField(student);
        student.setArea(resultSet.getString(pojoField.get("area")));
        student.setId(resultSet.getInt(pojoField.get("id")));
        student.setCollege(resultSet.getString(pojoField.get("college")));
        student.setEmail(resultSet.getString(pojoField.get("email")));
        student.setFace(resultSet.getString(pojoField.get("face")));
        student.setLevel(resultSet.getString(pojoField.get("level")));
        student.setMajor(resultSet.getString(pojoField.get("major")));
        student.setMarkNumber(resultSet.getString(pojoField.get("markNumber")));
        student.setPassword(resultSet.getString(pojoField.get("password")));
        student.setSex(resultSet.getString(pojoField.get("sex")));
        student.setUserName(resultSet.getString(pojoField.get("userName")));
        return student;
    }
}
