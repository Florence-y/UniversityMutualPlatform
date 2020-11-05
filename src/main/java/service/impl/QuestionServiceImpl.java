package service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import commom.constantval.ServletConstantVal;
import dao.AttentionDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.AttentionDaoImpl;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.*;
import service.AgreeService;
import service.AnswerService;
import service.QuestionService;
import util.ElasticUtil;
import util.TimeUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 问题服务类
 */
public class QuestionServiceImpl implements QuestionService {
    public static final String INDEX = "question";
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    AttentionDao attentionDao = new AttentionDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    AnswerService answerService = new AnswerServiceImpl();
    AgreeService agreeService = new AgreeServiceImpl();


    @Override
    public String addQuestion(Map<String, Object> fieldAndValueMapDoc) throws JsonProcessingException {
        fieldAndValueMapDoc.put("time", TimeUtil.getSystemTimeStamp());
        System.out.println(WebUtil.mapToJson(fieldAndValueMapDoc));
        return ElasticUtil.addDoc(WebUtil.mapToJson(fieldAndValueMapDoc), INDEX);
    }

    @Override
    public Question updateQuestion(Map<String, Object> wantToUpdateFieldKey, String id) throws IOException {
        int code = ElasticUtil.updateDocById(INDEX, id, wantToUpdateFieldKey);
        if (code == Response.ERROR) {
            return null;
        }
        String jsonQuestion = ElasticUtil.getDocById(INDEX, id);
        System.out.println(jsonQuestion);
        return WebUtil.jsonToObj(Question.class, jsonQuestion);
    }

    @Override
    public Question getDetailQuestion(String id, Map<String, Object> map) throws IOException {
        String jsonQuestion = ElasticUtil.getDocById(INDEX, id);
        //获取文章的基本内容
        Question question = WebUtil.jsonToObj(Question.class, jsonQuestion);
        String authorMarkNumber = question.getAuthorMarkNumber();
        String viewerMarkNumber = (String) map.get("ViewerMarkNumber");
        String userType = markNumberTypeDao.getUserType(authorMarkNumber);
        int agreeCount = agreeService.getAgreeCountQuestionOrAnswer("question", id);
        if (viewerMarkNumber != null) {
            boolean isAgree = agreeService.isAgree("question", id, viewerMarkNumber);
            boolean isAttention = attentionDao.isAttention(viewerMarkNumber, authorMarkNumber);
            question.setAttentionAuthor(isAttention);
            question.setAgree(isAgree);
        }
        //设置初始化为第一页
        map.put("currentPage", "1");
        Page<Answer> answerList = answerService.getAnswers("question", map);
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(userType)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, authorMarkNumber);
            question.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(userType)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, authorMarkNumber);
            question.setTeacher(teacher);
        }
        question.setUserType(userType);
        question.setAnswer(answerList);
        question.setAgreeCount(agreeCount);

        return question;
    }
}
