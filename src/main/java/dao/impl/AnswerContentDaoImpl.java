package dao.impl;
import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.AnswerContentJdbcStrategy;
import dao.AnswerContentDao;
import pojo.AnswerContent;
import util.JdbcUtil;
import util.ReflectUtil;
import util.WebUtil;
import java.text.MessageFormat;
import java.util.List;
import java.util.Map;




/**
 * @author Florence
 */
public class AnswerContentDaoImpl extends BaseDaoImpl<AnswerContent> implements AnswerContentDao {
    @Override
    public String getTableName() {
        return "t_answer_multiply_content";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new AnswerContent());
    }

    @Override
    public JdbcGetPojoStrategy<AnswerContent> getPackageStrategy() {
        return new AnswerContentJdbcStrategy();
    }


    @Override
    public List<AnswerContent> getAnswerContentByAnswerId(int answerId) {
        String sql = MessageFormat.format("SELECT * FROM {0} WHERE answer_id =? ORDER BY content_order", getTableName());
        return JdbcUtil.queryForJavaBeanAllData(sql, getPackageStrategy(), answerId);
    }

    @Override
    public int addRow(Map<String, Object> map) {
        return super.insertRowByKeyAndValue(new AnswerContent(), WebUtil.getPureMapFromMixMapToPojo(map, new AnswerContent()));
    }
}
