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
    @DbCol("comment_Id")
    private long id;
    @DbCol("comment_AnswerId")
    private long answerId;
    @DbCol("comment_Content")
    private String content;
    @DbCol("comment_MarkNumber")
    private String markNumber;


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

}
