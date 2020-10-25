package service.impl;

import dao.CommentDao;
import dao.impl.CommentDaoImpl;
import pojo.Comment;
import pojo.Page;
import service.CommentService;
import util.ArrayUtil;
import util.ReflectUtil;
import util.WebUtil;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 评论服务类
 */
public class CommentServiceImpl implements CommentService {
    private static final String ANSWER_TYPE = "answer";
    private static final String INDIVIDUAL_TYPE = "individual";
    CommentDao commentDao = new CommentDaoImpl();

    @Override
    public int addComment(Map<String, Object> map) {
        return commentDao.insertComment(WebUtil.getPureMapFromMixMapToPojo(map, new Comment()));
    }

    @Override
    public Comment editComment(Map<String, Object> map, String condition) {
        //获取条件的的值
        Integer conditionValue = Integer.parseInt((String) map.get(condition));
        //获取key value key value condition conditionValue 去更新
        Object[] objects = ArrayUtil.mapToUpdateArr(ReflectUtil.getObjectFieldMap(new Comment()), map, condition);
        //更新数据库
        commentDao.updateColByOneCondition(new Comment(), objects);
        return commentDao.selectById(conditionValue);
    }

    @Override
    public Page<Comment> getComments(String getType, Map<String, Object> map) {
        Page<Comment> page = new Page<>();
        List<Comment> comments = null;
        int totalPage = 0;
        int curPage = Integer.parseInt((String) map.get("currentPage"));
        //页面大小
        int pageSize = Page.PAGE_SIZE;
        //页面开始的地方
        int begin = (curPage - 1) * pageSize;
        if (ANSWER_TYPE.equals(getType)) {
            totalPage = commentDao.getCountByCondition(new Comment(), map);
            comments = commentDao.getRowBeginNumAndSizeByCondition(new Comment(), begin, pageSize, map);
        } else if (INDIVIDUAL_TYPE.equals(getType)) {

        }
        page.setDataList(comments);
        //设置当前页面
        page.setNowPosition(curPage);
        //设置页面总数
        page.setTotalPage(totalPage);
        //设置是否有下一页
        page.setNext(pageSize * curPage <= totalPage);
        return page;
    }


}
