package pojo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * @author Florence
 * 消息通知类
 */
@DbTable("t_inf")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Inf {

    @DbPriKey
    @DbCol("inf_id")
    private long id;
    @DbCol("inf_senderMarkNumber")
    private String senderMarkNumber;
    @DbCol("inf_receiverMarkNumber")
    private String receiverMarkNumber;
    @DbCol("inf_content")
    private String content;
    @DbCol("inf_sendTime")
    private Timestamp sendTime;
    @DbCol("inf_additionContent")
    private String additionContent;
    @DbCol("inf_type")
    private String type;
    @DbCol("inf_senderName")
    private String senderName;
    @DbCol("inf_isRead")
    private long isRead;
    @DbCol("inf_senderFace")
    private String senderFace;
    /**
     * 计算发表的时间长久
     */
    private String timeUpToNow;

    public long getIsRead() {
        return isRead;
    }

    public void setIsRead(long isRead) {
        this.isRead = isRead;
    }

    public String getTimeUpToNow() {
        return timeUpToNow;
    }

    public void setTimeUpToNow(String timeUpToNow) {
        this.timeUpToNow = timeUpToNow;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getSenderMarkNumber() {
        return senderMarkNumber;
    }

    public void setSenderMarkNumber(String senderMarkNumber) {
        this.senderMarkNumber = senderMarkNumber;
    }


    public String getReceiverMarkNumber() {
        return receiverMarkNumber;
    }

    public void setReceiverMarkNumber(String receiverMarkNumber) {
        this.receiverMarkNumber = receiverMarkNumber;
    }


    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }


    public Timestamp getSendTime() {
        return sendTime;
    }

    public void setSendTime(Timestamp sendTime) {
        this.sendTime = sendTime;
    }


    public String getAdditionContent() {
        return additionContent;
    }

    public void setAdditionContent(String additionContent) {
        this.additionContent = additionContent;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }


    public long getInfIsRead() {
        return isRead;
    }

    public void setInfIsRead(long infIsRead) {
        this.isRead = infIsRead;
    }


    public String getSenderFace() {
        return senderFace;
    }

    public void setSenderFace(String senderFace) {
        this.senderFace = senderFace;
    }

    @Override
    public String toString() {
        return "Inf{" +
                "id=" + id +
                ", senderMarkNumber='" + senderMarkNumber + '\'' +
                ", receiverMarkNumber='" + receiverMarkNumber + '\'' +
                ", content='" + content + '\'' +
                ", sendTime=" + sendTime +
                ", additionContent='" + additionContent + '\'' +
                ", type='" + type + '\'' +
                ", senderName='" + senderName + '\'' +
                ", isRead=" + isRead +
                ", senderFace='" + senderFace + '\'' +
                ", timeUpToNow='" + timeUpToNow + '\'' +
                '}';
    }
}
