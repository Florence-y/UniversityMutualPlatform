package pojo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_student")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Student {
  @DbPriKey
  @DbCol("student_id")
  private long id;
  @DbCol("student_markNumber")
  private String markNumber;
  @DbCol("student_email")
  private String email;
  @DbCol("student_password")
  private String password;
  @DbCol("student_level")
  private String level;
  @DbCol("student_face")
  private String face;
  @DbCol("student_college")
  private String college;
  @DbCol("student_major")
  private String major;
  @DbCol("student_sex")
  private String sex;
  @DbCol("student_userName")
  private String userName;
  @DbCol("student_area")
  private String area;

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


  public String getLevel() {
    return level;
  }

  public void setLevel(String level) {
    this.level = level;
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


  public String getMajor() {
    return major;
  }

  public void setMajor(String major) {
    this.major = major;
  }

  @Override
  public String toString() {
    return "Student{" +
            "id=" + id +
            ", markNumber='" + markNumber + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", level='" + level + '\'' +
            ", face='" + face + '\'' +
            ", college='" + college + '\'' +
            ", major='" + major + '\'' +
            '}';
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
}
