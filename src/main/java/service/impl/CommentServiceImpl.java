package service.impl;

import dao.CommentDao;
import dao.impl.CommentDaoImpl;
import pojo.Answer;
import pojo.Comment;
import service.CommentService;
import util.ArrayUtil;
import util.ReflectUtil;
import util.WebUtil;

import java.util.Map;

/**
 * @author Florence
 * 评论服务类
 */
public class CommentServiceImpl implements CommentService {
    CommentDao commentDao = new CommentDaoImpl();

    @Override
    public int addComment(Map<String, Object> map) {
        return commentDao.insertComment(WebUtil.getPureMapFromMixMapToPojo(map,new Comment()));
    }

    @Override
    public Comment editComment(Map<String, Object> map,String condition) {
        //获取条件的的值
        int conditionValue=Integer.parseInt((String) map.get(condition));
        //获取key value key value condition conditionValue 去更新
        Object[] objects = ArrayUtil.mapToUpdateArr(ReflectUtil.getObjectFieldMap(new Answer()), map, condition);
        //更新数据库
        commentDao.updateColByOneCondition(new Comment(), objects);
        return commentDao.selectById(conditionValue);
    }


}
