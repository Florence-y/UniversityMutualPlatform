package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.AttentionJdbcStrategy;
import dao.AttentionDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import lombok.extern.slf4j.Slf4j;
import pojo.Attention;
import pojo.Student;
import pojo.Teacher;
import util.ArrayUtil;
import util.JdbcUtil;
import util.ReflectUtil;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
@Slf4j
public class AttentionDaoImpl extends BaseDaoImpl<Attention> implements AttentionDao {
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    Teacher teacher;
    Student student;
    String userType;
    String markNumber;

    @Override
    public String getTableName() {
        return "t_attention";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Attention());
    }

    @Override
    public JdbcGetPojoStrategy<Attention> getPackageStrategy() {
        return new AttentionJdbcStrategy();
    }

    /**
     * 虽然代码一样，但是因为业务不同，还是分开比较好，后期可扩展性好
     *
     * @param currentPage 当前页数
     * @param pageSize    页面大小
     * @param map         条件map
     * @return 关注信息的集合
     */
    @Override
    public List<Attention> getMajorAttention(int currentPage, int pageSize, Map<String, Object> map) {
        List<Attention> attentions = super.getRowBeginNumAndSizeByCondition(new Attention(), currentPage, pageSize, map);
        //循环遍历增加attention信息
        for (Attention attention : attentions) {
            //获取学号
            markNumber = attention.getPassMarkNumber();
            //获取用户类型
            userType = markNumberTypeDao.getUserType(markNumber);
            //如果类型为学生的话
            if ("student".equals(userType)) {
                //反射获取学生表学号列名
                String markNumberCol = ReflectUtil.getColVal(new Student(), "markNumber");
                student = studentDao.getStudentByCondition(markNumberCol, markNumber);
                addInfToAttention(student, attention);
            }
            //如果类型为老师的话
            else if ("teacher".equals(userType)) {
                //反射获取老师表学号列名
                String markNumberCol = ReflectUtil.getColVal(new Teacher(), "markNumber");
                teacher = teacherDao.getTeacherByCondition(markNumberCol, markNumber);
                addInfToAttention(teacher, attention);
            } else {
                log.error("增加关注信息出现异常");
            }
        }
        return attentions;
    }

    @Override
    public List<Attention> getPassAttention(int currentPage, int pageSize, Map<String, Object> map) {
        List<Attention> attentions = super.getRowBeginNumAndSizeByCondition(new Attention(), currentPage, pageSize, map);
        //循环遍历增加attention信息
        for (Attention attention : attentions) {
            //获取学号
            markNumber = attention.getMajorMarkNumber();
            //获取用户类型
            userType = markNumberTypeDao.getUserType(markNumber);
            //如果类型为学生的话
            if ("student".equals(userType)) {
                //反射获取学生表学号列名
                String markNumberCol = ReflectUtil.getColVal(new Student(), "markNumber");
                student = studentDao.getStudentByCondition(markNumberCol, markNumber);
                addInfToAttention(student, attention);
            }
            //如果类型为老师的话
            else if ("teacher".equals(userType)) {
                //反射获取老师表学号列名
                String markNumberCol = ReflectUtil.getColVal(new Teacher(), "markNumber");
                teacher = teacherDao.getTeacherByCondition(markNumberCol, markNumber);
                addInfToAttention(teacher, attention);
            } else {
                log.error("增加关注信息出现异常");
            }
        }
        return attentions;
    }

    @Override
    public int deleteAttention(Object[] value, Map<String, Object> map) {
        //用来发射的对象
        Attention attention = new Attention();
        String deleteSql = "DELETE FROM " + getTableName() + " WHERE " +
                //获取and语句
                ReflectUtil.getConditionAnd(attention, ArrayUtil.getArrByOddOrEven(value, ArrayUtil.ODD));
        String updateSql = "UPDATE " + getTableName() + " SET attention_isMutual=false WHERE attention_majorMarkNumber=? AND attention_passMarkNumber =?";
        int deleteVal = JdbcUtil.update(deleteSql, ArrayUtil.getArrByOddOrEven(value, ArrayUtil.EVEN));
        int updateVal = JdbcUtil.update(updateSql, map.get("passMarkNumber"), map.get("majorMarkNumber"));
        return 1;
    }

    @Override
    public int addAttention(Map<String, Object> map) {
        String updateSql = "UPDATE " + getTableName() + " SET attention_isMutual=true WHERE attention_majorMarkNumber=? AND attention_passMarkNumber =?";
        int updateVal = JdbcUtil.update(updateSql, map.get("passMarkNumber"), map.get("majorMarkNumber"));
        String isExistSql = "SELECT * FROM " + getTableName() + " WHERE attention_majorMarkNumber=? AND attention_passMarkNumber =?";
        //判断是否存在
        boolean existByOneCondition = JdbcUtil.isExistByOneCondition(isExistSql, map.get("passMarkNumber"), map.get("majorMarkNumber"));
        if (existByOneCondition) {
            //存在说明是相互关注
            map.put("isMutual", true);
        }
        return super.insertRowByKeyAndValue(new Attention(), map);
    }

    @Override
    public boolean isAttention(String viewerMarkNumber, String beAttentionMarkNumber) {
        String majorTableCol = ReflectUtil.getColVal(new Attention(), "majorMarkNumber");
        String passTableCol = ReflectUtil.getColVal(new Attention(), "passMarkNumber");
        String sql = "SELECT * FROM " + getTableName() + " WHERE " + majorTableCol + " = ? AND " + passTableCol + " = ? limit 1";
        return JdbcUtil.isExistByOneCondition(sql, viewerMarkNumber, beAttentionMarkNumber);
    }

    private void addInfToAttention(Student student, Attention attention) {
        if (student == null) {
            log.error("为关注列表增添信息的时候学生对象为空");
            return;
        }
        attention.setCollage(student.getCollege());
        attention.setMajor(student.getMajor());
        attention.setSex(student.getSex());
        attention.setUserFace(student.getFace());
        attention.setUserName(student.getUserName());
        attention.setUserType("student");
    }

    private void addInfToAttention(Teacher teacher, Attention attention) {
        if (teacher == null) {
            log.error("为关注列表增添信息的时候老师对象为空");
            return;
        }
        attention.setCollage(teacher.getCollege());
        attention.setSex(teacher.getSex());
        attention.setUserName(teacher.getUserName());
        attention.setUserFace(teacher.getFace());
        attention.setUserType("teacher");
    }
}
