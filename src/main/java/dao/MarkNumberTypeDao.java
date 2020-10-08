package dao;

import dao.BaseDao;

/**
 * @author Florence
 */
public interface MarkNumberTypeDao extends BaseDao {
    /**
     * 获取用户类型
     *
     * @param markNumber 学号
     * @return 用户类型
     */
    String getUserType(String markNumber);
}
