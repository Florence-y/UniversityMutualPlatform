package service;

import pojo.*;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * @author Florence
 */
public interface ExploreService {
    /**
     * 初始化页面获取的page
     *
     * @return 初始化的6个页面对象
     * @throws IOException 输入异常
     */
    List<Page> initPage() throws IOException, SQLException;

    /**
     * 查询具体的问题类型
     *
     * @param questionType 问题的类型
     * @return 返回一个页面对象
     */
    Page<Question> getSpecialType(String questionType) throws IOException;

    /**
     * 根据搜索框
     *
     * @param fieldAndValueFromTheMixMap
     * @return
     */
    Page<Question> exploreQuestion(String fieldAndValueFromTheMixMap) throws IOException;

    /**
     * 获取分页对象
     *
     * @param scrollId 滑动id
     * @param <T>      具体实体类型
     * @param pojo     实体对象
     * @return 得到的分页对象
     */
    <T extends IndexObject> Page<T> getPageByScrollId(String scrollId, T pojo) throws IOException;

    Page<Found> exploreFound(String exploreContent) throws IOException;

    Page<Lost> exploreLost(String exploreContent) throws IOException;

}
