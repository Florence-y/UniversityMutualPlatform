package service;

import pojo.Attention;
import pojo.Page;

import java.util.Map;

/**
 * @author Florence
 * 关注服务类
 */
public interface AttentionService {
    /**
     * 添加关注
     *
     * @param map 相关的参数，关注人
     * @return  状态码
     */
    int addAttention(Map<String, Object> map);

    /**
     * 获取我的关注（我关注的人和关注我的人）列表
     *
     * @param attentionType major：我关注的人 pass：关注我的人
     * @param map           条件map
     * @return 包含关注信息的对象
     */
    Page<Attention> getAttentionByCondition(String attentionType, Map<String, Object> map);

    /**
     * 关于更新的map 带有关注者的学号和被关注者的学号
     *
     * @param map map
     * @return 状态码
     */
    int unAttention(Map<String, Object> map);
}
