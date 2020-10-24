package pojo;

/**
 * @author Florence
 */
public class QuestionContent {
    private long contentOrder;
    private String contentType;
    private String contentMain;

    public QuestionContent(long contentOrder, String contentType, String contentMain) {
        this.contentOrder = contentOrder;
        this.contentType = contentType;
        this.contentMain = contentMain;
    }

    public QuestionContent() {
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

    @Override
    public String toString() {
        return "QuestionContent{" +
                "contentOrder=" + contentOrder +
                ", contentType='" + contentType + '\'' +
                ", contentMain='" + contentMain + '\'' +
                '}';
    }
}
