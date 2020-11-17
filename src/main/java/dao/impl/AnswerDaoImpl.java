package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.AnswerJdbcStrategy;
import dao.AnswerDao;
import pojo.Answer;
import pojo.Question;
import util.ElasticUtil;
import util.ReflectUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 * 问题关系dao实现类
 */
public class AnswerDaoImpl extends BaseDaoImpl<Answer> implements AnswerDao {
    private static final String INDIVIDUAL = "individual";
    private static final String QUESTION = "question";

    @Override
    public String getTableName() {
        return "t_answer";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Answer());
    }

    @Override
    public JdbcGetPojoStrategy<Answer> getPackageStrategy() {
        return new AnswerJdbcStrategy();
    }

    @Override
    public List<Answer> getAnswers(int begin, int pageSize, Map<String, Object> map) throws IOException {
        //分页获取回答
        List<Answer> rowBeginNumAndSizeByCondition = super.getRowBeginNumAndSizeByCondition(new Answer(), begin, pageSize, map);
        //问题添加包装内容
        for (Answer answer : rowBeginNumAndSizeByCondition) {
            String question = ElasticUtil.getDocById("question", answer.getQuestionId());
            Question questionName = WebUtil.jsonToObj(Question.class, question);
            answer.setTitle(questionName.getTitle());
        }
        return rowBeginNumAndSizeByCondition;
    }
}
