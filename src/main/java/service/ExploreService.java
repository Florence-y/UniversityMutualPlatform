package service;

import pojo.Question;

import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public interface ExploreService {
    /**
     * 初始化页面获取的page
     *
     * @param map
     * @return
     */
    List<Question> initPage(Map<String, Object> map);
}
