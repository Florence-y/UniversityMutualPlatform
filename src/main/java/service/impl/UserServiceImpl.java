package service.impl;

import commom.factory.ResponseFactory;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.Response;
import pojo.Student;
import pojo.Teacher;
import service.UserService;

import java.util.Map;

/**
 * @author Florence
 */
public class UserServiceImpl implements UserService {
    private static final String STUDENT="student";
    private static final String TEACHER="teacher";
    /**
     * 添加用户
     * @param userType 用户类型
     * @param map 数据map
     * @return 状态码
     */
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    @Override
    public int addUser(String userType, Map<String, Object> map) {
        if (STUDENT.equals(userType)){
            studentDao.insertRowByKeyAndValue(new Student(),map);
            return Response.OK;
        }
        else if(TEACHER.equals(userType)){
            teacherDao.insertRowByKeyAndValue(new Teacher(),map);
            return Response.OK;
        }
        else {
            return Response.ERROR;
        }
    }
}
