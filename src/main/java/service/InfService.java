package service;

import org.omg.PortableInterceptor.INACTIVE;
import pojo.Inf;
import pojo.Page;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public interface InfService {
    /**
     * 根据条件查询用户信息
     *
     * @param condition 包含着用户名，排序的条件，排序的顺序
     * @return 返回包含Inf的list
     */
    Page<Inf> getInfListByCondition(Map<String, Object> condition);

    /**
     * 添加通知
     *
     * @param map map
     * @return 添加后的Inf的id
     */
    int addInf(Map<String, Object> map);

    /**
     * 改变已读状态
     *
     * @param map 包含要修改的键值对的map（可以包含其他的 ，到时候会去掉的）
     * @return 状态码
     */
    int changeIsRead(Map<String, Object> map);

    /**
     * 删除通知
     *
     * @param map 包含删除的通知的id
     * @return 状态码
     */
    int deleteInfById(Map<String, Object> map);
}
