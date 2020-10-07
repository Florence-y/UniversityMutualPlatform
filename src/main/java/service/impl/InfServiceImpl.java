package service.impl;

import commom.factory.DaoFactory;
import dao.InfDao;
import dao.impl.InfDaoImpl;
import pojo.Inf;
import pojo.Page;
import pojo.Response;
import service.InfService;
import util.ArrayUtil;
import util.TimeUtil;

import javax.websocket.server.PathParam;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class InfServiceImpl implements InfService {
    InfDao infDao = DaoFactory.getInfDao();

    @Override
    public Page<Inf> getInfListByCondition(Map<String, Object> condition) {
        Page<Inf> page = new Page<>();
        //当前页面
        int curPage = Integer.parseInt((String) condition.get("currentPage"));
        //页面大小
        int pageSize = Page.PAGE_SIZE;
        //调用
        int totalPage = infDao.getCountByCondition(new Inf(), condition);
        //获取文章信息
        List<Inf> datalist = infDao.getRowBeginNumAndSizeByCondition(new Inf(), (curPage - 1) * pageSize, pageSize, condition);
        //设置文章信息
        page.setDataList(datalist);
        //设置当前页面
        page.setNowPosition(curPage);
        //设置页面总数
        page.setTotalPage(totalPage);
        //设置是否有下一页
        page.setNext(pageSize * curPage > totalPage ? false : true);
        return page;
    }

    @Override
    public int addInf(Map<String, Object> map) {
        //添加当前添加的时间
        map.put("sendTime", TimeUtil.getSystemTimeStamp());
        return infDao.insertRowByKeyAndValue(new Inf(), map);
    }

    /**
     * 修改inf信息的已读状态
     * @param map 包含要修改的键值对的map（可以包含其他的 ，到时候会去掉的）
     * @return 状态码
     */
    @Override
    public int changeIsRead(Map<String, Object> map) {
        Inf pojo = new Inf();
        int row = infDao.updateColByOneCondition(pojo, ArrayUtil.keyValueMapToPojoArr(map, pojo));
        return row != -1 ? Response.OK : Response.ERROR;
    }

    /**
     * 删除对应id的inf行
     * @param map 包含删除的通知的id
     * @return 状态码
     */
    @Override
    public int deleteInfById(Map<String, Object> map) {
        int row =infDao.deleteById(Integer.parseInt(String.valueOf((map.get("id")))));
        return row != -1 ? Response.OK : Response.ERROR;
    }
}
