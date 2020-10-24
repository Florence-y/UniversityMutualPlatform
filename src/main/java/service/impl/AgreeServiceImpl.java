package service.impl;

import pojo.Response;
import service.AgreeService;
import util.JdbcUtil;

import java.text.MessageFormat;
import java.util.Map;

/**
 * @author Florence
 */
public class AgreeServiceImpl implements AgreeService {
    private static final String ANSWER = "answer";
    private static final String QUESTION = "question";
    private static final String TABLE_ANSWER = "t_answer_agree";
    private static final String TABLE_QUESTION = "t_question_agree";

    @Override
    public int agree(String agreeType, Map<String, Object> map) {
        String sql = "INSERT INTO {0} ({1},agreeMarkNumber) VALUES (?,?)";
        int code = Response.ERROR;
        if (ANSWER.equals(agreeType)) {
            sql = MessageFormat.format(sql, TABLE_ANSWER, "answer_id");
            code = JdbcUtil.update(sql, map.get("answerId"), map.get("markNumber")) > 0 ? Response.OK : Response.ERROR;
        } else if (QUESTION.equals(agreeType)) {
            sql = MessageFormat.format(sql, TABLE_QUESTION, "question_id");
            code = JdbcUtil.update(sql, map.get("questionId"), map.get("markNumber")) > 0 ? Response.OK : Response.ERROR;
        }
        return code;
    }

    @Override
    public int unAgree(String agreeType, Map<String, Object> map) {
        String sql = "DELETE FROM {0} WHERE {1} =? AND agreeMarkNumber =?";
        int code = Response.ERROR;
        if (ANSWER.equals(agreeType)) {
            sql = MessageFormat.format(sql, TABLE_ANSWER, "answer_id");
            code = JdbcUtil.update(sql, map.get("answerId"), map.get("markNumber")) > 0 ? Response.OK : Response.ERROR;
        } else if (QUESTION.equals(agreeType)) {
            sql = MessageFormat.format(sql, TABLE_QUESTION, "question_id");
            code = JdbcUtil.update(sql, map.get("questionId"), map.get("markNumber")) > 0 ? Response.OK : Response.ERROR;
        }
        return code;
    }

    @Override
    public int getAgreeCountQuestionOrAnswer(String type, Object id) {
        String sql = "SELECT COUNT(*) FROM {0} WHERE {1}=?";
        int count = -1;
        if (ANSWER.equals(type)) {
            sql = MessageFormat.format(sql, TABLE_ANSWER, "answer_id");
            count = JdbcUtil.getCount(sql, id);
        } else if (QUESTION.equals(type)) {
            sql = MessageFormat.format(sql, TABLE_QUESTION, "question_id");
            count = JdbcUtil.getCount(sql, id);
        }
        return count;
    }

    @Override
    public boolean isAgree(String type, Object id, String markNumber) {
        String sql = "SELECT * FROM {0} WHERE {1}=? AND agreeMarkNumber=?";
        if (ANSWER.equals(type)) {
            sql = MessageFormat.format(sql, TABLE_ANSWER, "answer_id");
        } else if (QUESTION.equals(type)) {
            sql = MessageFormat.format(sql, TABLE_QUESTION, "question_id");
        }
        return JdbcUtil.isExistByOneCondition(sql, id, markNumber);
    }


}
