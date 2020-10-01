package commom.factory;

import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;

/**
 * @author Florence
 * Dao层工厂类
 */
public class DaoFactory {
    public static TeacherDao getTeacherDao(){return new TeacherDaoImpl(); }

    public static StudentDao getStudentDao(){return new StudentDaoImpl(); }

}
