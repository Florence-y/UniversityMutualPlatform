package pojo;

import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

/**
 * @author Florence
 */
@DbTable("t_student")
public class Student {
  @DbPriKey
  @DbCol("student_id")
  private long studentId;
  @DbCol("student_markNumber")
  private String studentMarkNumber;
  @DbCol("student_email")
  private String studentEmail;
  @DbCol("student_password")
  private String studentPassword;
  @DbCol("student_level")
  private String studentLevel;
  @DbCol("student_face")
  private String studentFace;
  @DbCol("student_college")
  private String studentCollege;
  @DbCol("student_major")
  private String studentMajor;


  public long getStudentId() {
    return studentId;
  }

  public void setStudentId(long studentId) {
    this.studentId = studentId;
  }


  public String getStudentMarkNumber() {
    return studentMarkNumber;
  }

  public void setStudentMarkNumber(String studentMarkNumber) {
    this.studentMarkNumber = studentMarkNumber;
  }


  public String getStudentEmail() {
    return studentEmail;
  }

  public void setStudentEmail(String studentEmail) {
    this.studentEmail = studentEmail;
  }


  public String getStudentPassword() {
    return studentPassword;
  }

  public void setStudentPassword(String studentPassword) {
    this.studentPassword = studentPassword;
  }


  public String getStudentLevel() {
    return studentLevel;
  }

  public void setStudentLevel(String studentLevel) {
    this.studentLevel = studentLevel;
  }


  public String getStudentFace() {
    return studentFace;
  }

  public void setStudentFace(String studentFace) {
    this.studentFace = studentFace;
  }


  public String getStudentCollege() {
    return studentCollege;
  }

  public void setStudentCollege(String studentCollege) {
    this.studentCollege = studentCollege;
  }


  public String getStudentMajor() {
    return studentMajor;
  }

  public void setStudentMajor(String studentMajor) {
    this.studentMajor = studentMajor;
  }

}
