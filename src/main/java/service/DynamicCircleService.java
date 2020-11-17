package service;

import pojo.Page;
import pojo.Question;

import java.io.IOException;

/**
 * @author Florence
 */
public interface DynamicCircleService {
    /**
     * 获取初始化动态
     * @return
     */
    Page<Question> getAll(String viewerMarkNumber) throws IOException;

    /**
     * 获取搜索的动态
     * @param exploreContent 搜索
     * @return 返回一个page对象
     */
    Page<Question> getDynamicShowByExplore(Object exploreContent);
}
