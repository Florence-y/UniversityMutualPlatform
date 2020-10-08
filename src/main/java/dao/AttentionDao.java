package dao;

import pojo.Attention;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public interface AttentionDao extends BaseDao<Attention> {
    /**
     * 获取我主动关注的人的信息
     *
     * @param currentPage 当前页数
     * @param pageSize    页面大小
     * @param map         条件map
     * @return 关注的人的信息列表
     */
    List<Attention> getMajorAttention(int currentPage, int pageSize, Map<String, Object> map);

    /**
     * 获取关注我的人的信息
     *
     * @param currentPage 当前页数
     * @param pageSize    页面大小
     * @param map         条件map
     * @return 关注的人的信息列表
     */
    List<Attention> getPassAttention(int currentPage, int pageSize, Map<String, Object> map);

    /**
     * 键值对
     *
     * @param keyAndValue 前端传送过来的键值对
     * @param map         键值对
     * @return -1为失败
     */
    int deleteAttention(Object[] keyAndValue, Map<String, Object> map);

    /**
     * 添加关注
     *
     * @param map 条件集合
     * @return 刚插入的id
     */
    int addAttention(Map<String, Object> map);
}
