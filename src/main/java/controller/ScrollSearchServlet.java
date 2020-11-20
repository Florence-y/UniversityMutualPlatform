package controller;

import commom.constantval.ServletConstantVal;
import commom.factory.ResponseFactory;
import dao.AttentionDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.AttentionDaoImpl;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.Page;
import pojo.Question;
import pojo.Student;
import pojo.Teacher;
import service.AgreeService;
import service.AnswerService;
import service.ExploreService;
import service.impl.AgreeServiceImpl;
import service.impl.AnswerServiceImpl;
import service.impl.ExploreServiceImpl;
import util.ElasticUtil;
import util.WebUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

import static commom.constantval.ServletConstantVal.POJO_QUESTION;

/**
 * @author Florence
 * 分页查询search控制类
 */
@WebServlet("/Servlet/ScrollSearchServlet")
public class ScrollSearchServlet extends HttpServlet {
    Map<String, Object> map;
    ExploreService exploreService = new ExploreServiceImpl();
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    AttentionDao attentionDao = new AttentionDaoImpl();
    AgreeService agreeService = new AgreeServiceImpl();
    AnswerService answerService = new AnswerServiceImpl();
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.jsonToMap(WebUtil.getJsonString(request));
        if (ServletConstantVal.PUT.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doPut(request, response);
            return;
        }
        System.out.println("post");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        map = WebUtil.formToMap(request);
        if (ServletConstantVal.DELETE.equals(map.get(ServletConstantVal.REQUEST_TYPE))) {
            doDelete(request, response);
            return;
        }
        //滚动id
        String id = (String) map.get("scrollId");
        //实体类型
        String type = (String) map.get("pojoType");
        if (POJO_QUESTION.equals(type)) {
            Page<Question> page = ElasticUtil.scrollSearch(id, new Question());
            for (Question question:page.getDataList()){
                setQuestionMessage(question, (String) map.get("ViewerMarkNumber"));
            }
            WebUtil.writeObjToResponse(response,page );
        //待扩展
        } else if (1 == 2) {

        } else {
            WebUtil.writeObjToResponse(response, ResponseFactory.getStatus(500));
        }
        System.out.println("get");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("put");
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("delete");
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
}
