package service.impl;

import dao.AnswerDao;
import dao.impl.AnswerDaoImpl;
import pojo.Answer;
import pojo.Page;
import pojo.Response;
import service.AnswerService;
import util.ArrayUtil;
import util.ReflectUtil;
import util.WebUtil;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class AnswerServiceImpl implements AnswerService {
    AnswerDao answerDao = new AnswerDaoImpl();
    private static final String INDIVIDUAL ="individual";
    private static final String QUESTION ="question";

    @Override
    public int addAnswer(Map<String, Object> map) {
        int id = answerDao.insertRowByKeyAndValue(new Answer(), map);
        return id > 0 ? Response.OK : Response.ERROR;
    }

    @Override
    public Answer editAnswer(Map<String, Object> map,String condition) {
        //获取条件的的值
        int conditionValue=Integer.parseInt((String) map.get(condition));
        //获取key value key value condition conditionValue 去更新
        Object[] objects = ArrayUtil.mapToUpdateArr(ReflectUtil.getObjectFieldMap(new Answer()), map, condition);
        //更新数据库
        answerDao.updateColByOneCondition(new Answer(), objects);
        return answerDao.selectById(conditionValue);
    }

    @Override
    public Page<Answer> getAnswers(String getAnswerType, Map<String, Object> map) {
        Page<Answer> page = new Page<>();
        List<Answer> answers = null;
        int totalPage=answerDao.getCountByCondition(new Answer(),map);
        int curPage = Integer.parseInt((String) map.get("currentPage"));
        //页面大小
        int pageSize = Page.PAGE_SIZE;
        //页面开始的地方
        int begin=(curPage - 1) * pageSize;
        if (INDIVIDUAL.equals(getAnswerType)){
            answers=answerDao.getAnswers(begin,pageSize,map);
        }
        else if (QUESTION.equals(getAnswerType)){
            answers=answerDao.getAnswers(begin,pageSize,map);
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
}
