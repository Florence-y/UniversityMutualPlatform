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
import util.ArrayUtil;
import util.Md5Until;
import util.ReflectUtil;

import java.util.Map;

/**
 * @author Florence
 */
public class UserServiceImpl implements UserService {
    private static final String STUDENT="student";
    private static final String TEACHER="teacher";
    private static final String PASSWORD = "password";
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    /**
     * 添加用户
     * @param userType 用户类型
     * @param map 数据map
     * @return 状态码
     */
    @Override
    public int addUser(String userType, Map<String, Object> map) {
        //MD5编码存入数据库
        map.put("password", Md5Until.getMd5((String) map.get("password")));
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

    @Override
    public int updateUser(String userType, Map<String, Object> map,String condition) {
        if (STUDENT.equals(userType)){
            //首先根据反射工具获取他的实体类域，根据实体判断是否数据该实体类的元素，然后封装语句
            studentDao.updateColByOneCondition(ArrayUtil.mapToUpdateArr(ReflectUtil.getPojoFieldIsExist(new Student()),map,condition));
            return Response.OK;
        }
        else if(TEACHER.equals(userType)){
            teacherDao.updateColByOneCondition(ArrayUtil.mapToUpdateArr(ReflectUtil.getPojoFieldIsExist(new Teacher()),map,condition));
            return Response.OK;
        }
        else {
            return Response.ERROR;
        }
    }

    /**
     * 删除用户根据map获取条件
     * @param map 条件map
     * @param userType 用户类型
     * @return 状态码
     */
    @Override
    public int deleteUser(String userType,Map<String, Object> map) {
        String condition= (String) map.get("condition");
        if (STUDENT.equals(userType)){
            studentDao.deleteByOneCondition(condition,map.get(condition));
            return Response.OK;
        }
        else if (TEACHER.equals(userType)){
            teacherDao.deleteByOneCondition(condition,map.get(condition));
            return Response.OK;
        }
        return Response.ERROR;
    }

    /**
     * 根据用户名或者学号登录
     * @param userType 用户类型
     * @param map 数据map
     * @param <T> 泛型具体类型
     * @return 相应对象
     */
    @Override
    public <T> Response<T> userLogin(String userType, Map<String, Object> map) {
        //用户名或者密码
        String value= (String) map.get("loginValue");
        //用户名数据库列名
        String colUserName;
        //学号数据库列名
        String colMarkNumber;
        if (STUDENT.equals(userType)){
            //获取用户列名和学号列名
            colUserName=ReflectUtil.getColVal(new Student(),"userName");
            colMarkNumber=ReflectUtil.getColVal(new Student(),"markNumber");
            Student inf=null;
            if (studentDao.isExistQueryBySomeCondition(colMarkNumber,value)){
                inf = studentDao.getStudentByCondition(colMarkNumber,value);
            }
            if (studentDao.isExistQueryBySomeCondition(colUserName,value)){
                inf = studentDao.getStudentByCondition(colUserName,value);
            }
            //用户不存在(用户名和哪个都不行)
            if (inf==null){
                return (Response<T>) ResponseFactory.getMessage("用户不存在").setStatusCode(500);
            }
            //密码错误
            if (!inf.getPassword().equals(Md5Until.getMd5((String) map.get(PASSWORD)))){
                return (Response<T>) ResponseFactory.getMessage("密码错误").setStatusCode(500);
            }
            //登录成功发送成功对象
            return ResponseFactory.getLoginSuccessResponse(inf.getId(),inf.getMarkNumber(),inf.getUserName(),inf.getUserName());
        }
        else if (TEACHER.equals(userType)){
            //获取用户列名和学号列名
            colUserName=ReflectUtil.getColVal(new Teacher(),"userName");
            colMarkNumber=ReflectUtil.getColVal(new Teacher(),"markNumber");
            Teacher inf=null;
            if (teacherDao.isExistQueryBySomeCondition(colMarkNumber,value)){
                inf = teacherDao.getTeacherByCondition(colMarkNumber,value);
            }
            if (teacherDao.isExistQueryBySomeCondition(colUserName,value)){
                inf = teacherDao.getTeacherByCondition(colUserName,value);
            }
            //用户不存在(用户名和哪个都不行)
            if (inf==null){
                return (Response<T>) ResponseFactory.getMessage("用户不存在").setStatusCode(Response.ERROR);
            }
            //密码错误
            if (!inf.getPassword().equals(Md5Until.getMd5((String) map.get(PASSWORD)))){
                return (Response<T>) ResponseFactory.getMessage("密码错误").setStatusCode(Response.ERROR);
            }
            //登录成功发送成功对象
            return ResponseFactory.getLoginSuccessResponse(inf.getId(),inf.getMarkNumber(),inf.getUserName(),inf.getUserName());
        }
        return (Response<T>) ResponseFactory.getPureResponse().setStatusCode(Response.ERROR);
    }

    /**
     * 查询用户信息是否存在
     * @param userType 用户类型
     * @param map 信息键值对
     * @return 返回状态码
     */
    @Override
    public int isExistOneInf(Object userType, Map<String, Object> map) {

        String value=(String)map.get("value");
        int statusCode;
        if(STUDENT.equals(userType)){
            String field =ReflectUtil.getColVal(new Student(),(String) map.get("field"));
            statusCode= studentDao.isExistQueryBySomeCondition(field, value)?Response.OK:Response.ERROR;
        }
        else if (TEACHER.equals(userType)){
            String field =ReflectUtil.getColVal(new Teacher(),(String) map.get("field"));
            statusCode= teacherDao.isExistQueryBySomeCondition(field, value)?Response.OK:Response.ERROR;
        }
        else {
            statusCode= Response.ERROR;
        }
        return statusCode;
    }
}
