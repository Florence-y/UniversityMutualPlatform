package commom.strategy.impl;

import commom.constantval.ServletConstantVal;
import commom.strategy.JdbcGetPojoStrategy;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.Answer;
import pojo.Student;
import pojo.Teacher;
import util.TimeUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Answer实体对象封装策略
 */
public class AnswerJdbcStrategy implements JdbcGetPojoStrategy<Answer> {
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();

    @Override
    public Answer strategy(ResultSet resultSet) throws SQLException {
        Answer answer = new Answer();
        String answerMarkNumber = resultSet.getString("answer_MarkNumber");
        answer.setId(resultSet.getInt("answer_id"));
        answer.setMarkNumber(answerMarkNumber);
        answer.setQuestionId(resultSet.getString("answer_questionId"));
        String type = markNumberTypeDao.getUserType(answerMarkNumber);
        if (ServletConstantVal.STUDENT.equals(type)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, answerMarkNumber);
            answer.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(type)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, answerMarkNumber);
            answer.setTeacher(teacher);
        }
        answer.setTimeUpToNow(TimeUtil.getTimeGapToSpecialStr(resultSet.getTimestamp("answer_time")));
        return answer;
    }
}
