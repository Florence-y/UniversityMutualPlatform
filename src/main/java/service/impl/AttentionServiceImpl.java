package service.impl;

import dao.AttentionDao;
import dao.impl.AttentionDaoImpl;
import lombok.extern.slf4j.Slf4j;
import pojo.Attention;
import pojo.Page;
import pojo.Response;
import service.AttentionService;
import util.ArrayUtil;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
@Slf4j
public class AttentionServiceImpl implements AttentionService {
    private static final String MAJOR_ATTENTION = "major";
    private static final String PASS_ATTENTION = "pass";
    AttentionDao attentionDao = new AttentionDaoImpl();


    @Override
    public int addAttention(Map<String, Object> map) {
        //返回状态说明是否成功
        return attentionDao.addAttention(map) > 0 ? Response.OK : Response.ERROR;
    }


    @Override
    public Page<Attention> getAttentionByCondition(String attentionType, Map<String, Object> map) {
        Page<Attention> page = new Page<>();
        List<Attention> datalist;
        int totalPage;
        int curPage = Integer.parseInt((String) map.get("currentPage"));
        //页面大小
        int pageSize = Page.PAGE_SIZE;
        totalPage = attentionDao.getCountByCondition(new Attention(), map);
        if (MAJOR_ATTENTION.equals(attentionType)) {
            //获取我关注的人信息
            datalist = attentionDao.getMajorAttention((curPage - 1) * pageSize, pageSize, map);
        } else if (PASS_ATTENTION.equals(attentionType)) {
            //获取关注我的人信息
            datalist = attentionDao.getPassAttention((curPage - 1) * pageSize, pageSize, map);
        } else {
            log.error("获取关注者类型输入错误（或者得不到参数）");
            return null;
        }
        page.setDataList(datalist);
        //设置当前页面
        page.setNowPosition(curPage);
        //设置页面总数
        page.setTotalPage(totalPage);
        //设置是否有下一页
        page.setNext(pageSize * curPage <= totalPage);
        return page;
    }

    @Override
    public int unAttention(Map<String, Object> map) {
        return attentionDao.deleteAttention(ArrayUtil.keyValueMapToPojoArr(map, new Attention()), map) <= 0 ? Response.ERROR : Response.OK;
    }
}
