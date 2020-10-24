package service;

import pojo.Found;
import pojo.Lost;
import pojo.Page;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 失物招领服务接口
 */
public interface LostAndFoundService {
    /**
     * 添加失主信息
     *
     * @param map 只包含丢失信息的成员变量的map
     * @return 状态码
     */
    int addLost(Map<String, Object> map);

    /**
     * 添加得主信息
     *
     * @param map 只包含得主有效域的map
     * @return
     */
    int addFound(Map<String, Object> map);

    /**
     * 精确获取一个lost信息
     *
     * @param id lost信息的id
     * @return 失主对象
     */
    Lost getLostByTerm(String id) throws IOException;

    /**
     * 精确获取一个found信息
     *
     * @param id found信息的id
     * @return 得主对象
     * @throws IOException 查询异常
     */
    Found getFoundByTerm(String id) throws IOException;

    /**
     * 获取全部失主数据
     *
     * @param scrollId 滑动id，如果为空说明是第一次
     * @return 一个页面对象
     */
    Page<Lost> getLostAll(String scrollId) throws IOException;

    /**
     * 获取全部得主数据
     *
     * @param scrollId 滑动id，如果为空说明是第一次
     * @return 一个页面对象
     */
    Page<Found> getFoundAll(String scrollId) throws IOException;

    /**
     * 根据搜索获取失主信息
     *
     * @param scrollId 如果滑动id不为空，说明是第一次
     * @param map      只包含条件信息的map
     * @return 一个页面对象
     */
    Page<Lost> getLostByExplore(String scrollId, Map<String, Object> map) throws IOException;

    /**
     * 根据搜索获取得主信息
     *
     * @param scrollId 如果滑动id不为空，说明是第一次
     * @param map      只包含条件信息的map
     * @return 一个页面对象
     */
    Page<Found> getFoundByExplore(String scrollId, Map<String, Object> map) throws IOException;
}
