package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_teacher")
public class Teacher {
  @DbCol("teacher_id")
  @DbPriKey
  private long teacherId;
  @DbCol("teacher_markNumber")
  private String teacherMarkNumber;
  @DbCol("teacher_email")
  private String teacherEmail;
  @DbCol("teacher_password")
  private String teacherPassword;
  @DbCol("teacher_level")
  private String teacherLevel;
  @DbCol("teacher_face")
  private String teacherFace;
  @DbCol("teacher_college")
  private String teacherCollege;
  @DbCol("teacher_major")
  private String teacherMajor;


  public long getTeacherId() {
    return teacherId;
  }

  public void setTeacherId(long teacherId) {
    this.teacherId = teacherId;
  }


  public String getTeacherMarkNumber() {
    return teacherMarkNumber;
  }

  public void setTeacherMarkNumber(String teacherMarkNumber) {
    this.teacherMarkNumber = teacherMarkNumber;
  }


  public String getTeacherEmail() {
    return teacherEmail;
  }

  public void setTeacherEmail(String teacherEmail) {
    this.teacherEmail = teacherEmail;
  }


  public String getTeacherPassword() {
    return teacherPassword;
  }

  public void setTeacherPassword(String teacherPassword) {
    this.teacherPassword = teacherPassword;
  }


  public String getTeacherLevel() {
    return teacherLevel;
  }

  public void setTeacherLevel(String teacherLevel) {
    this.teacherLevel = teacherLevel;
  }


  public String getTeacherFace() {
    return teacherFace;
  }

  public void setTeacherFace(String teacherFace) {
    this.teacherFace = teacherFace;
  }


  public String getTeacherCollege() {
    return teacherCollege;
  }

  public void setTeacherCollege(String teacherCollege) {
    this.teacherCollege = teacherCollege;
  }


  public String getTeacherMajor() {
    return teacherMajor;
  }

  public void setTeacherMajor(String teacherMajor) {
    this.teacherMajor = teacherMajor;
  }

}
