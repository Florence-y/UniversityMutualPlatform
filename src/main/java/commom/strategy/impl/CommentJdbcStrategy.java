package commom.strategy.impl;

import commom.constantval.ServletConstantVal;
import commom.strategy.JdbcGetPojoStrategy;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.Comment;
import pojo.Student;
import pojo.Teacher;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Florence
 * 评论包装类
 */
public class CommentJdbcStrategy implements JdbcGetPojoStrategy<Comment> {
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();

    @Override
    public Comment strategy(ResultSet resultSet) throws SQLException {
        Comment comment = new Comment();
        //获取评论学号
        String commentMarkNumber = resultSet.getString("comment_MarkNumber");
        comment.setId(resultSet.getInt("comment_id"));
        comment.setContent(resultSet.getString("comment_content"));
        comment.setAnswerId(resultSet.getInt("comment_answerId"));
        comment.setMarkNumber(commentMarkNumber);
        //根据学号得到类型
        String type = markNumberTypeDao.getUserType(commentMarkNumber);
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(type)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, commentMarkNumber);
            comment.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(type)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, commentMarkNumber);
            comment.setTeacher(teacher);
        }
        return comment;
    }
}
