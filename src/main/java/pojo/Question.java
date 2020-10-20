package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.util.Arrays;

/**
 * @author Florence
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Question {

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
    boolean isAgree;
    String userType;
    int agreeCount;
    String questionId;
    Student student;
    Teacher teacher;
    Page<Answer> answer;


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

    public QuestionContent[] getContents() {
        return contents;
    }

    public void setContents(QuestionContent[] contents) {
        this.contents = contents;
    }

    @Override
    public String toString() {
        return "Question{" +
                "title='" + title + '\'' +
                ", questionType='" + questionType + '\'' +
                ", authorMarkNumber='" + authorMarkNumber + '\'' +
                ", tag=" + Arrays.toString(tag) +
                ", isAgree=" + isAgree +
                ", userType='" + userType + '\'' +
                ", agreeCount=" + agreeCount +
                ", questionId='" + questionId + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                ", questionContents=" + Arrays.toString(contents) +
                ", answer=" + answer +
                '}';
    }
}
