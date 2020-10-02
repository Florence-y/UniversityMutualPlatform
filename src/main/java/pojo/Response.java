package pojo;

/**
 * @author Florence
 * 返回实体
 */
public class Response<T> {
    public static final int OK = 222;
    public static final int ERROR = 666;
    public static final int GET_LOST = 888;
    long id;
    int markNumber;
    int statusCode;
    String message;
    T messagePojo;
    Response(int status){
        this.statusCode =status;
    }
    Response(long id,int markNumber){
        this.id=id;
        this.markNumber=markNumber;
    }
    public Response(){}
    Response(long id,int markNumber,int status){
        this(id,markNumber);
        this.id=id;
    }

    public static int getOK() {
        return OK;
    }

    public static int getERROR() {
        return ERROR;
    }

    public static int getGetLost() {
        return GET_LOST;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMarkNumber() {
        return markNumber;
    }

    public void setMarkNumber(int markNumber) {
        this.markNumber = markNumber;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getMessagePojo() {
        return messagePojo;
    }

    public void setMessagePojo(T messagePojo) {
        this.messagePojo = messagePojo;
    }
}
