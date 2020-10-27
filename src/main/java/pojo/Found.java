package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.util.Arrays;
import java.util.Date;

/**
 * @author Florence
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Found  extends IndexObject{
    @IsValid(valid = true, fieldName = "contact")
    private String contact;
    @IsValid(valid = true, fieldName = "imgs")
    private String[] imgs;
    @IsValid(valid = true, fieldName = "foundDescribe")
    private String foundDescribe;
    @IsValid(valid = true, fieldName = "foundLocation")
    private String foundLocation;
    @IsValid(valid = true, fieldName = "foundObjectName")
    private String foundObjectName;
    @IsValid(valid = true, fieldName = "foundTime")
    private Date foundTime;
    @IsValid(valid = true, fieldName = "objectType")
    private String objectType;

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

    public String getFoundDescribe() {
        return foundDescribe;
    }

    public void setFoundDescribe(String foundDescribe) {
        this.foundDescribe = foundDescribe;
    }

    public String getFoundLocation() {
        return foundLocation;
    }

    public void setFoundLocation(String foundLocation) {
        this.foundLocation = foundLocation;
    }

    public String getFoundObjectName() {
        return foundObjectName;
    }

    public void setFoundObjectName(String foundObjectName) {
        this.foundObjectName = foundObjectName;
    }

    public Date getFoundTime() {
        return foundTime;
    }

    public void setFoundTime(Date foundTime) {
        this.foundTime = foundTime;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    @Override
    public String toString() {
        return "Found{" +
                "contact='" + contact + '\'' +
                ", imgs=" + Arrays.toString(imgs) +
                ", foundDescribe='" + foundDescribe + '\'' +
                ", foundLocation='" + foundLocation + '\'' +
                ", foundObjectName='" + foundObjectName + '\'' +
                ", foundTime=" + foundTime +
                ", objectType='" + objectType + '\'' +
                '}';
    }
}
