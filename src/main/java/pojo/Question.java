package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.sql.Timestamp;
import java.util.Arrays;

/**
 * @author Florence
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Question extends IndexObject {

    @IsValid(valid = true, fieldName = "title")
    String title;
    @IsValid(valid = true, fieldName = "questionType")
    String questionType;
    @IsValid(valid = true, fieldName = "authorMarkNumber")
    String authorMarkNumber;
    @IsValid(valid = true, fieldName = "tag")
    String[] tag;
    @IsValid(valid = true, fieldName = "contents")
    QuestionContent[] contents;
    @IsValid(valid = true, fieldName = "anonymity")
    boolean anonymity;
    @IsValid(valid = true, fieldName = "time")
    Timestamp time;
    boolean isAgree;
    boolean isAttentionAuthor;
    String userType;
    int agreeCount;
    String questionId;
    Student student;
    Teacher teacher;
    Page<Answer> answer;


    int answerCount;
    /**
     * 计算发表的时间长久
     */
    private String timeUpToNow;

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getTimeUpToNow() {
        return timeUpToNow;
    }

    public void setTimeUpToNow(String timeUpToNow) {
        this.timeUpToNow = timeUpToNow;
    }

    public String getAuthorMarkNumber() {
        return authorMarkNumber;
    }

    public void setAuthorMarkNumber(String authorMarkNumber) {
        this.authorMarkNumber = authorMarkNumber;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getTag() {
        return tag;
    }

    public void setTag(String[] tag) {
        this.tag = tag;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public int getAgreeCount() {
        return agreeCount;
    }

    public void setAgreeCount(int agreeCount) {
        this.agreeCount = agreeCount;
    }

    public Page<Answer> getAnswer() {
        return answer;
    }

    public void setAnswer(Page<Answer> answer) {
        this.answer = answer;
    }


    public boolean isAgree() {
        return isAgree;
    }


    public void setAgree(boolean agree) {
        isAgree = agree;
    }

    public boolean isAttentionAuthor() {
        return isAttentionAuthor;
    }

    public void setAttentionAuthor(boolean attentionAuthor) {
        isAttentionAuthor = attentionAuthor;
    }

    public QuestionContent[] getContents() {
        return contents;
    }

    public void setContents(QuestionContent[] contents) {
        this.contents = contents;
    }

    public boolean isAnonymity() {
        return anonymity;
    }

    public void setAnonymity(boolean anonymity) {
        this.anonymity = anonymity;
    }

    public int getAnswerCount() {
        return answerCount;
    }

    public void setAnswerCount(int answerCount) {
        this.answerCount = answerCount;
    }

    @Override
    public String toString() {
        return "Question{" +
                "title='" + title + '\'' +
                ", questionType='" + questionType + '\'' +
                ", authorMarkNumber='" + authorMarkNumber + '\'' +
                ", tag=" + Arrays.toString(tag) +
                ", contents=" + Arrays.toString(contents) +
                ", isAgree=" + isAgree +
                ", isAttentionAuthor=" + isAttentionAuthor +
                ", userType='" + userType + '\'' +
                ", agreeCount=" + agreeCount +
                ", questionId='" + questionId + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                ", answer=" + answer +
                '}';
    }
}
