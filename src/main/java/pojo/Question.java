package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.util.Arrays;
import java.util.List;

/**
 * @author Florence
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Question {

    @IsValid(valid = true, fieldName = "title")
    String title;
    @IsValid(valid = true, fieldName = "content")
    String content;
    @IsValid(valid = true, fieldName = "questionType")
    String questionType;
    @IsValid(valid = true, fieldName = "tag")
    String[] tag;
    @IsValid(valid = true, fieldName = "imgAddress")
    String imgAddress;
    @IsValid(valid = true,fieldName = "authorMarkNumber")
    String authorMarkNumber;
    Page<Answer> answer;
    String userType;
    int agreeCount;
    String questionId;
    Student student;
    Teacher teacher;

    
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getImgAddress() {
        return imgAddress;
    }

    public void setImgAddress(String imgAddress) {
        this.imgAddress = imgAddress;
    }

    @Override
    public String toString() {
        return "Question{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", type='" + questionType + '\'' +
                ", tag=" + Arrays.toString(tag) +
                ", imgAddress='" + imgAddress + '\'' +
                ", answer=" + answer +
                ", userType='" + userType + '\'' +
                ", agreeCount=" + agreeCount +
                ", articleId='" + questionId + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                '}';
    }
}
