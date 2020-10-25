package service;

import pojo.Page;
import pojo.Question;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public interface ExploreService {
    /**
     * 初始化页面获取的page
     * @throws IOException 输入异常
     * @return 初始化的6个页面对象
     */
    List<Page> initPage() throws IOException, SQLException;

    /**
     * 查询具体的问题类型
     * @param questionType 问题的类型
     * @return 返回一个页面对象
     */
    Page<Question> getSpecialType(String questionType) throws IOException;

    /**
     * 根据搜索框
     * @param fieldAndValueFromTheMixMap
     * @return
     */
    Page<Question> exploreQuestion(String fieldAndValueFromTheMixMap) throws IOException;

    /**
     * 获取分页对象
     * @param scrollId 滑动id
     * @return 得到的分页对象
     */
    Page getPageByScrollId(String  scrollId);
}
