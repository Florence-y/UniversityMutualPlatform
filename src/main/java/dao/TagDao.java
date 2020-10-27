package dao;

import java.sql.SQLException;
import java.util.List;

/**
 * @author Florence
 * 分类dao
 */
public interface TagDao extends BaseDao {
    /**
     * 获取全部标签
     *
     * @return 全部标签的记录
     */
    List<String> getAllQuestionType() throws SQLException;
}
