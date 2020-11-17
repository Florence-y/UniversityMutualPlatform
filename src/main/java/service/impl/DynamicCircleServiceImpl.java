package service.impl;

import commom.constantval.ServletConstantVal;
import dao.AttentionDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.AttentionDaoImpl;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import pojo.*;
import service.AgreeService;
import service.AnswerService;
import service.DynamicCircleService;
import util.ElasticUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Florence
 */
public class DynamicCircleServiceImpl implements DynamicCircleService {
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    AttentionDao attentionDao = new AttentionDaoImpl();
    AgreeService agreeService = new AgreeServiceImpl();
    AnswerService answerService = new AnswerServiceImpl();
    @Override
    public Page<Question> getAll(String viewerMarkNumber) throws IOException {
        Page<Question> dynamicPage = ElasticUtil.scrollSearchFirst("question",
                ElasticUtil.getTermBuilder("questionType","Dynamic"),
                new Question(), false);
        for (Question question:dynamicPage.getDataList()){
            setQuestionMessage(question,viewerMarkNumber);
        }
        return dynamicPage;
    }

    private void setQuestionMessage(Question question,String viewerMarkNumber) {
        String id =question.getId();
        //作者学号
        String authorMarkNumber = question.getAuthorMarkNumber();
        //用户类型
        String userType = markNumberTypeDao.getUserType(authorMarkNumber);
        //点赞数
        int agreeCount = agreeService.getAgreeCountQuestionOrAnswer("question", id);
        //回答数
        int answerCount= answerService.getQuestionAnswerCount(id);
        //是否被关注和点赞
        if (viewerMarkNumber != null) {
            boolean isAgree = agreeService.isAgree("question", id, viewerMarkNumber);
            boolean isAttention = attentionDao.isAttention(viewerMarkNumber, authorMarkNumber);
            question.setAttentionAuthor(isAttention);
            question.setAgree(isAgree);
        }
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(userType)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, authorMarkNumber);
            question.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(userType)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, authorMarkNumber);
            question.setTeacher(teacher);
        }
        question.setUserType(userType);
        question.setAgreeCount(agreeCount);
        question.setAnswerCount(answerCount);
    }

    @Override
    public Page<Question> getDynamicShowByExplore(Object exploreContent) {
        return null;
    }
}
