package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.sql.Timestamp;

/**
 * @author Florecne
 * 聊天实体
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Message {
    private String senderName;
    private String senderFace;
    private String senderMarkNumber;
    private String contentType;
    private String detailContent;
    private Timestamp senderTime;
    private String receiverName;
    private String receiverMarkNumber;
    private String content;

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderMarkNumber() {
        return senderMarkNumber;
    }

    public void setSenderMarkNumber(String senderMarkNumber) {
        this.senderMarkNumber = senderMarkNumber;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getDetailContent() {
        return detailContent;
    }

    public void setDetailContent(String detailContent) {
        this.detailContent = detailContent;
    }

    public Timestamp getSenderTime() {
        return senderTime;
    }

    public void setSenderTime(Timestamp senderTime) {
        this.senderTime = senderTime;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverMarkNumber() {
        return receiverMarkNumber;
    }

    public void setReceiverMarkNumber(String receiverMarkNumber) {
        this.receiverMarkNumber = receiverMarkNumber;
    }

    @Override
    public String toString() {
        return "Message{" +
                "senderName='" + senderName + '\'' +
                ", senderMarkNumber='" + senderMarkNumber + '\'' +
                ", contentType='" + contentType + '\'' +
                ", detailContent='" + detailContent + '\'' +
                ", senderTime=" + senderTime +
                ", receiverName='" + receiverName + '\'' +
                ", receiverMarkNumber='" + receiverMarkNumber + '\'' +
                '}';
    }

    public String getSenderFace() {
        return senderFace;
    }

    public void setSenderFace(String senderFace) {
        this.senderFace = senderFace;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
