package service.impl;

import dao.AnswerDao;
import dao.impl.AnswerDaoImpl;
import pojo.Answer;
import pojo.Response;
import service.AnswerService;
import util.ArrayUtil;
import util.ReflectUtil;

import java.util.Map;

/**
 * @author Florence
 */
public class AnswerServiceImpl implements AnswerService {
    AnswerDao answerDao = new AnswerDaoImpl();


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
}
