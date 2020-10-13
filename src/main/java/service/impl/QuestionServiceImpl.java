package service.impl;

import commom.constantval.ServletConstantVal;
import dao.AnswerDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.AnswerDaoImpl;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.*;
import service.AnswerService;
import service.QuestionService;
import util.ElasticUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 问题服务类
 */
public class QuestionServiceImpl implements QuestionService {
    public static final String INDEX = "question";
    AnswerDao answerDao = new AnswerDaoImpl();
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    AnswerService answerService = new AnswerServiceImpl();

    @Override
    public String addQuestion(Map<String, Object> fieldAndValueMapDoc) {
        return ElasticUtil.addDoc(fieldAndValueMapDoc, INDEX);
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
    public Question getDetailQuestion(String id,Map<String,Object> map) throws IOException {
        String jsonQuestion=ElasticUtil.getDocById(INDEX,id);
        //获取文章的基本内容
        Question question = WebUtil.jsonToObj(Question.class, jsonQuestion);
        String authorMarkNumber = question.getAuthorMarkNumber();
        String userType=markNumberTypeDao.getUserType(authorMarkNumber);
        //设置初始化为第一页
        map.put("currentPage","1");
        Page<Answer> answerList = answerService.getAnswers("question",map);
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(userType)){
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL,authorMarkNumber);
            question.setStudent(student);
        }
        else if (ServletConstantVal.TEACHER.equals(userType)){
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL,authorMarkNumber);
            question.setTeacher(teacher);
        }
        question.setUserType(userType);
        question.setAnswer(answerList);
        return question;
    }
}
