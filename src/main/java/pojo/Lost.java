package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.util.Arrays;
import java.util.Date;

/**
 * @author 丢失实体
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Lost {
    @IsValid(valid = true, fieldName = "contact")
    private String contact;
    @IsValid(valid = true, fieldName = "imgs")
    private String[] imgs;
    @IsValid(valid = true, fieldName = "lostDescribe")
    private String lostDescribe;
    @IsValid(valid = true, fieldName = "lostLocation")
    private String lostLocation;
    @IsValid(valid = true, fieldName = "lostObjectName")
    private String lostObjectName;
    @IsValid(valid = true, fieldName = "lostTime")
    private Date lostTime;
    @IsValid(valid = true, fieldName = "objectType")
    private String objectType;

    @Override
    public String toString() {
        return "Lost{" +
                "contact='" + contact + '\'' +
                ", imgs=" + Arrays.toString(imgs) +
                ", lostDescribe='" + lostDescribe + '\'' +
                ", lostLocation='" + lostLocation + '\'' +
                ", lostObjectName='" + lostObjectName + '\'' +
                ", lostTime=" + lostTime +
                ", objectType='" + objectType + '\'' +
                '}';
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String[] getImgs() {
        return imgs;
    }

    public void setImgs(String[] imgs) {
        this.imgs = imgs;
    }

    public String getLostDescribe() {
        return lostDescribe;
    }

    public void setLostDescribe(String lostDescribe) {
        this.lostDescribe = lostDescribe;
    }

    public String getLostLocation() {
        return lostLocation;
    }

    public void setLostLocation(String lostLocation) {
        this.lostLocation = lostLocation;
    }

    public String getLostObjectName() {
        return lostObjectName;
    }

    public void setLostObjectName(String lostObjectName) {
        this.lostObjectName = lostObjectName;
    }

    public Date getLostTime() {
        return lostTime;
    }

    public void setLostTime(Date lostTime) {
        this.lostTime = lostTime;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }
}