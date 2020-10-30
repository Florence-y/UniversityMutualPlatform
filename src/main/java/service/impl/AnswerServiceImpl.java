package service.impl;

import dao.AnswerContentDao;
import dao.AnswerDao;
import dao.CommentDao;
import dao.impl.AnswerContentDaoImpl;
import dao.impl.AnswerDaoImpl;
import dao.impl.CommentDaoImpl;
import pojo.Answer;
import pojo.Comment;
import pojo.Page;
import service.AgreeService;
import service.AnswerService;
import util.ArrayUtil;
import util.ReflectUtil;
import util.TimeUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class AnswerServiceImpl implements AnswerService {
    private static final String INDIVIDUAL = "individual";
    private static final String QUESTION = "question";
    AnswerDao answerDao = new AnswerDaoImpl();
    AgreeService agreeService = new AgreeServiceImpl();
    AnswerContentDao answerContentDao = new AnswerContentDaoImpl();
    CommentDao commentDao = new CommentDaoImpl();

    @Override
    public int addAnswer(Map<String, Object> map) throws IOException {
        map.put("time", TimeUtil.getSystemTimeStamp());
        int id = answerDao.insertRowByKeyAndValue(new Answer(), WebUtil.getPureMapFromMixMapToPojo(map, new Answer()));
        ArrayList<String> answerContents = (ArrayList<String>) map.get("answerContents");
        for (String content : answerContents) {
            Map json = WebUtil.jsonToMap(content);
            json.put("answerId", id);
            answerContentDao.addRow(json);
        }
        return id;
    }

    @Override
    public Answer editAnswer(Map<String, Object> map, String condition) {
        //获取条件的的值
        int conditionValue = Integer.parseInt((String) map.get(condition));
        //获取key value key value condition conditionValue 去更新
        Object[] objects = ArrayUtil.mapToUpdateArr(ReflectUtil.getObjectFieldMap(new Answer()), map, condition);
        //更新数据库
        answerDao.updateColByOneCondition(new Answer(), objects);
        return answerDao.selectById(conditionValue);
    }

    @Override
    public Page<Answer> getAnswers(String getAnswerType, Map<String, Object> map) throws IOException {
        Page<Answer> page = new Page<>();
        Map<String, Object> countMap = new HashMap<>(5);
        List<Answer> answers = null;
        int totalPage = answerDao.getCountByCondition(new Answer(), map);
        int curPage = Integer.parseInt((String) map.get("currentPage"));
        //页面大小
        int pageSize = Page.PAGE_SIZE;
        //页面开始的地方
        int begin = (curPage - 1) * pageSize;
        if (INDIVIDUAL.equals(getAnswerType)) {
            answers = answerDao.getAnswers(begin, pageSize, map);
        } else if (QUESTION.equals(getAnswerType)) {
            answers = answerDao.getAnswers(begin, pageSize, map);
        }
        for (Answer answer : answers) {
            countMap.put("viewerMarkNumber", map.get("viewerMarkNumber"));
            countMap.put("answerId", answer.getId());
            setAnswerInf(answer, countMap);
        }
        page.setDataList(answers);
        //设置当前页面
        page.setNowPosition(curPage);
        //设置页面总数
        page.setTotalPage(totalPage);
        //设置是否有下一页
        page.setNext(pageSize * curPage <= totalPage);
        //设置回答的列表
        page.setDataList(answers);
        return page;
    }

    public void setAnswerInf(Answer answer, Map<String, Object> map) {

        boolean isAgree = agreeService.isAgree("answer", answer.getId(), String.valueOf(map.get("viewerMarkNumber")));
        answer.setAgree(isAgree);
        answer.setAgreeCount(agreeService.getAgreeCountQuestionOrAnswer("answer", answer.getId()));
        answer.setContents(answerContentDao.getAnswerContentByAnswerId((int) answer.getId()));
        answer.setCommentCount(commentDao.getCountByCondition(new Comment(), map));
    }
}
