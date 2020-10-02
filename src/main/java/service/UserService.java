package service;

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
}
