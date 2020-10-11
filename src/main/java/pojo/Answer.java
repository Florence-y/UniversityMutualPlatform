package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florecen
 */
@DbTable("t_answer")
public class Answer {
    @DbPriKey
    @DbCol("answer_Id")
    private long id;
    @DbCol("answer_QuestionId")
    private String questionId;
    @DbCol("answer_MarkNumber")
    private String markNumber;
    @DbCol("answer_Content")
    private String content;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }


    public String getMarkNumber() {
        return markNumber;
    }

    public void setMarkNumber(String markNumber) {
        this.markNumber = markNumber;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
