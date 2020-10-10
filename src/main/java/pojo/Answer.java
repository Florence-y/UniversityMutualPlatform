package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;

/**
 * @author Florecen
 */
public class Answer {
  @DbPriKey
  @DbCol("answer_Id")
  private long answerId;
  @DbCol("answer_QuestionId")
  private String answerQuestionId;
  @DbCol("answer_MarkNumber")
  private String answerMarkNumber;
  @DbCol("answer_Content")
  private String answerContent;

  public long getAnswerId() {
    return answerId;
  }

  public void setAnswerId(long answerId) {
    this.answerId = answerId;
  }


  public String getAnswerQuestionId() {
    return answerQuestionId;
  }

  public void setAnswerQuestionId(String answerQuestionId) {
    this.answerQuestionId = answerQuestionId;
  }


  public String getAnswerMarkNumber() {
    return answerMarkNumber;
  }

  public void setAnswerMarkNumber(String answerMarkNumber) {
    this.answerMarkNumber = answerMarkNumber;
  }


  public String getAnswerContent() {
    return answerContent;
  }

  public void setAnswerContent(String answerContent) {
    this.answerContent = answerContent;
  }

}
