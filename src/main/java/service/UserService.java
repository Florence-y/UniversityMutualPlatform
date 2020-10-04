package service;

import pojo.Response;

import java.util.Map;

/**
 * @author Florence
 * 用户服务类
 */
public interface UserService {
    /**
     * 添加用户
     * @param userType 用户类型
     * @param map 数据map
     * @return 状态码
     */
    int addUser(String  userType, Map<String, Object> map);

    /**
     * 更新用户信息
     * @param userType 用户类型
     * @param map 数据map
     * @param condition 条件
     * @return 状态码
     */
    int updateUser(String userType, Map<String, Object> map,String condition);

    /**
     * 删除用户根据map获取条件
     * @param map 条件map
     * @param userType 用户类型
     * @return 状态码
     */
    int deleteUser(String userType,Map<String, Object> map);

    /**
     * 用户登录
     * @param userType 用户类型
     * @param map 数据map
     * @return 状态码
     */
     <T> Response<T> userLogin(String userType, Map<String, Object> map);
}
