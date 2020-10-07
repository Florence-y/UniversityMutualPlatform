package pojo;

/**
 * @author Florence
 * 返回实体
 */
public class Response<T> {
    public static final int OK = 200;
    public static final int ERROR = 500;
    public static final int GET_LOST = 404;
    long id;
    String markNumber;
    int statusCode;
    String message;
    String userName;
    String userType;
    T messagePojo;

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

    Response(int status) {
        this.statusCode = status;
    }

    Response(long id, String markNumber) {
        this.id = id;
        this.markNumber = markNumber;
    }

    public Response() {
    }

    Response(long id, String markNumber, int status) {
        this(id, markNumber);
        this.id = id;
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

    public String getMarkNumber() {
        return markNumber;
    }

    public void setMarkNumber(String markNumber) {
        this.markNumber = markNumber;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public Response<T> setStatusCode(int statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public Response<T> setMessage(String message) {
        this.message = message;
        return this;
    }

    public T getMessagePojo() {
        return messagePojo;
    }

    public void setMessagePojo(T messagePojo) {
        this.messagePojo = messagePojo;
    }
}
