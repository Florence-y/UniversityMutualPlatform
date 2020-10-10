package pojo;

import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 * 关注关系实体类
 */
@DbTable("t_attention")
public class Attention {
    @DbPriKey
    @DbCol("attention_id")
    private int id;
    @DbCol("attention_majorMarkNumber")
    private String majorMarkNumber;
    @DbCol("attention_passMarkNumber")
    private String passMarkNumber;
    @DbCol("attention_isMutual")
    private boolean isMutual;


    private String userFace;
    private String userName;
    private String userType;
    private String sex;
    private String collage;
    private String major;
    private int replyCount;
    private int attentionCount;
    /**
     * major或者pass
     */
    private String type;

    public String getUserFace() {
        return userFace;
    }

    public void setUserFace(String userFace) {
        this.userFace = userFace;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCollage() {
        return collage;
    }

    public void setCollage(String collage) {
        this.collage = collage;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public int getReplyCount() {
        return replyCount;
    }

    public void setReplyCount(int replyCount) {
        this.replyCount = replyCount;
    }

    public int getAttentionCount() {
        return attentionCount;
    }

    public void setAttentionCount(int attentionCount) {
        this.attentionCount = attentionCount;
    }


    public String getMajorMarkNumber() {
        return majorMarkNumber;
    }

    public void setMajorMarkNumber(String majorMarkNumber) {
        this.majorMarkNumber = majorMarkNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getPassMarkNumber() {
        return passMarkNumber;
    }

    public void setPassMarkNumber(String passMarkNumber) {
        this.passMarkNumber = passMarkNumber;
    }


    public boolean isMutual() {
        return isMutual;
    }

    public void setMutual(boolean mutual) {
        isMutual = mutual;
    }

    @Override
    public String toString() {
        return "Attention{" +
                "id=" + id +
                ", majorMarkNumber='" + majorMarkNumber + '\'' +
                ", passMarkNumber='" + passMarkNumber + '\'' +
                ", isMutual=" + isMutual +
                ", userFace='" + userFace + '\'' +
                ", userName='" + userName + '\'' +
                ", userType='" + userType + '\'' +
                ", sex='" + sex + '\'' +
                ", collage='" + collage + '\'' +
                ", major='" + major + '\'' +
                ", replyCount=" + replyCount +
                ", attentionCount=" + attentionCount +
                ", type='" + type + '\'' +
                '}';
    }
}
