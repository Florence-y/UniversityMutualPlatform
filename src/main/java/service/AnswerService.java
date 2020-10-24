package service;

import pojo.Answer;
import pojo.Page;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 回答服务类
 */
public interface AnswerService {
    /**
     * 添加回答API
     *
     * @param map 包含我们需要的参数的map
     * @return 状态码
     * @throws IOException io异常
     */
    int addAnswer(Map<String, Object> map) throws IOException;

    /**
     * 修改回答
     *
     * @param map       输入进来的参数map
     * @param condition 条件
     * @return 返回更新后的对象
     */
    Answer editAnswer(Map<String, Object> map, String condition);

    /**
     * 获取answer的page对象进行分页
     *
     * @param getAnswerType 获取的类型
     * @param map           存有数据的map
     * @return 返回一个包含一页回答的页面对象
     */
    public Page<Answer> getAnswers(String getAnswerType, Map<String, Object> map);
}
