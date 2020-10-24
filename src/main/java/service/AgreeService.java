package service;

import java.util.Map;

/**
 * @author Florence
 */
public interface AgreeService {
    /**
     * 点赞
     *
     * @param agreeType 点赞的类型
     * @param map       包含点赞需要的数据
     * @return 返回状态码
     */
    int agree(String agreeType, Map<String, Object> map);


    /**
     * 取消点赞
     *
     * @param agreeType 点赞
     * @param map       包含点赞需要的数据
     * @return 返回状态码
     */
    int unAgree(String agreeType, Map<String, Object> map);


    /**
     * 获取某个问题或者回答的点赞
     *
     * @param type 类型 ：question answer
     * @param id   他们的id
     * @return 计数
     */
    int getAgreeCountQuestionOrAnswer(String type, Object id);

    /**
     * 某个人是否点赞过问题或者回答
     *
     * @param type       类型：question answer
     * @param id         他们的id
     * @param markNumber 用户的学号
     * @return 是否点赞
     */
    boolean isAgree(String type, Object id, String markNumber);
}
