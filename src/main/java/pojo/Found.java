package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.IsValid;

import java.util.Arrays;
import java.util.Date;

/**
 * @author Florence
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Found extends IndexObject {
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
    @IsValid(valid = true, fieldName = "authorMarkNumber")
    private String authorMarkNumber;
    private Student student;
    private Teacher teacher;
    private String userType;

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

    public String getAuthorMarkNumber() {
        return authorMarkNumber;
    }

    public void setAuthorMarkNumber(String authorMarkNumber) {
        this.authorMarkNumber = authorMarkNumber;
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

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
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
                ", authorMarkNumber='" + authorMarkNumber + '\'' +
                ", student=" + student +
                ", teacher=" + teacher +
                ", userType='" + userType + '\'' +
                '}';
    }
}
