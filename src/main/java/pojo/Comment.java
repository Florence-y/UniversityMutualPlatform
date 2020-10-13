package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_comment")
public class Comment {


    @DbPriKey
    @DbCol("comment_id")
    private long id;
    @DbCol("comment_answerId")
    private long answerId;
    @DbCol("comment_content")
    private String content;
    @DbCol("comment_markNumber")
    private String markNumber;
    Student student;
    Teacher teacher;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", answerId=" + answerId +
                ", content='" + content + '\'' +
                ", markNumber='" + markNumber + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                '}';
    }
}
