package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_answer_multiply_content")
public class AnswerContent {
    @DbCol("content_id")
    private long contentId;
    @DbCol("answer_id")
    private long answerId;
    @DbCol("content_order")
    private long contentOrder;
    @DbCol("content_type")
    private String contentType;
    @DbCol("content_main")
    private String contentMain;


    public long getContentId() {
        return contentId;
    }

    public void setContentId(long contentId) {
        this.contentId = contentId;
    }

    public long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(long answerId) {
        this.answerId = answerId;
    }


    public long getContentOrder() {
        return contentOrder;
    }

    public void setContentOrder(long contentOrder) {
        this.contentOrder = contentOrder;
    }


    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }


    public String getContentMain() {
        return contentMain;
    }

    public void setContentMain(String contentMain) {
        this.contentMain = contentMain;
    }

}
