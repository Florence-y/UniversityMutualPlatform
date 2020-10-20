package pojo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_teacher")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Teacher {
    private final String type = "teacher";
    @DbPriKey
    @DbCol("teacher_id")
    private long id;
    @DbCol("teacher_markNumber")
    private String markNumber;
    @DbCol("teacher_email")
    private String email;
    @DbCol("teacher_password")
    private String password;
    @DbCol("teacher_face")
    private String face;
    @DbCol("teacher_college")
    private String college;
    @DbCol("teacher_sex")
    private String sex;
    @DbCol("teacher_userName")
    private String userName;
    @DbCol("teacher_area")
    private String area;
    @DbCol("teacher_graduateUniversity")
    private String graduatedUniversity;
    @DbCol("teacher_degree")
    private String degree;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getMarkNumber() {
        return markNumber;
    }

    public void setMarkNumber(String markNumber) {
        this.markNumber = markNumber;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getFace() {
        return face;
    }

    public void setFace(String face) {
        this.face = face;
    }


    public String getCollege() {
        return college;
    }

    public void setCollege(String college) {
        this.college = college;
    }


    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getGraduatedUniversity() {
        return graduatedUniversity;
    }

    public void setGraduatedUniversity(String graduatedUniversity) {
        this.graduatedUniversity = graduatedUniversity;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", markNumber='" + markNumber + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", face='" + face + '\'' +
                ", college='" + college + '\'' +
                ", sex='" + sex + '\'' +
                ", userName='" + userName + '\'' +
                ", area='" + area + '\'' +
                ", graduatedUniversity='" + graduatedUniversity + '\'' +
                ", degree='" + degree + '\'' +
                '}';
    }
}
