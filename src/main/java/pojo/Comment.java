package pojo;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;

/**
 * @author Florence
 */
public class Comment {


  @DbPriKey
  @DbCol("comment_Id")
  private long commentId;
  @DbCol("comment_AnswerId")
  private long commentAnswerId;
  @DbCol("comment_Content")
  private String commentContent;
  @DbCol("comment_MarkNumber")
  private String commentMarkNumber;


  public long getCommentId() {
    return commentId;
  }

  public void setCommentId(long commentId) {
    this.commentId = commentId;
  }


  public long getCommentAnswerId() {
    return commentAnswerId;
  }

  public void setCommentAnswerId(long commentAnswerId) {
    this.commentAnswerId = commentAnswerId;
  }


  public String getCommentContent() {
    return commentContent;
  }

  public void setCommentContent(String commentContent) {
    this.commentContent = commentContent;
  }


  public String getCommentMarkNumber() {
    return commentMarkNumber;
  }

  public void setCommentMarkNumber(String commentMarkNumber) {
    this.commentMarkNumber = commentMarkNumber;
  }

}
