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
    String type;
    @IsValid(valid = true, fieldName = "tag")
    String[] tag;
    @IsValid(valid = true, fieldName = "imgAddress")
    String imgAddress;
    List<Object> answer;
    String userType;
    int agreeCount;
    String articleId;
    Student student;
    Teacher teacher;

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getArticleId() {
        return articleId;
    }

    public void setArticleId(String articleId) {
        this.articleId = articleId;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAgreeCount() {
        return agreeCount;
    }

    public void setAgreeCount(int agreeCount) {
        this.agreeCount = agreeCount;
    }

    public List<Object> getAnswer() {
        return answer;
    }

    public void setAnswer(List<Object> answer) {
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
                ", type='" + type + '\'' +
                ", tag=" + Arrays.toString(tag) +
                ", imgAddress='" + imgAddress + '\'' +
                ", answer=" + answer +
                ", userType='" + userType + '\'' +
                ", agreeCount=" + agreeCount +
                ", articleId='" + articleId + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                '}';
    }
}
