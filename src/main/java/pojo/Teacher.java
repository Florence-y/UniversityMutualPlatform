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
  @DbCol("teacher_id")
  @DbPriKey
  private long id;
  @DbCol("teacher_markNumber")
  private String markNumber;
  @DbCol("teacher_email")
  private String email;
  @DbCol("teacher_password")
  private String password;
  @DbCol("teacher_level")
  private String level;
  @DbCol("teacher_face")
  private String face;
  @DbCol("teacher_college")
  private String college;
  @DbCol("teacher_major")
  private String major;


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
    return "Teacher{" +
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
}
