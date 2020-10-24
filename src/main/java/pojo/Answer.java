package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

import java.util.List;

/**
 * @author Florecen
 */
@DbTable("t_answer")
public class Answer {
    List<AnswerContent> contents;
    @DbPriKey
    @DbCol("answer_Id")
    private long id;
    @DbCol("answer_questionId")
    private String questionId;
    @DbCol("answer_markNumber")
    private String markNumber;
    private int commentCount;
    private int agreeCount;
    private boolean isAgree;
    private Student student;
    private Teacher teacher;

    public int getCommentCount() {
        return commentCount;
    }

    public void setCommentCount(int commentCount) {
        this.commentCount = commentCount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<AnswerContent> getContents() {
        return contents;
    }

    public void setContents(List<AnswerContent> contents) {
        this.contents = contents;
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

    public int getAgreeCount() {
        return agreeCount;
    }

    public void setAgreeCount(int agreeCount) {
        this.agreeCount = agreeCount;
    }

    public boolean isAgree() {
        return isAgree;
    }

    public void setAgree(boolean agree) {
        isAgree = agree;
    }

    @Override
    public String toString() {
        return "Answer{" +
                "id=" + id +
                ", questionId='" + questionId + '\'' +
                ", markNumber='" + markNumber + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                ", agreeCount=" + agreeCount +
                ", isAgree=" + isAgree +
                '}';
    }
}
