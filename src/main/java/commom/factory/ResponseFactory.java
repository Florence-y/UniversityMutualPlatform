package commom.factory;

import pojo.Response;

/**
 * @author Florence
 */
public class ResponseFactory {
    /**
     * 获取包含状态码的相应实体
     * @param code
     * @param <T>
     * @return
     */
    public static <T> Response<T> getStatus(int code) {
        Response<T> response = new Response<>();
        response.setStatusCode(code);
        return response;
    }

    /**
     * 获取包含提示信息的相应实体
     * @param message
     * @param <T>
     * @return
     */
    public static <T> Response<T> getMessage(String message) {
        Response<T> response = new Response<>();
        response.setMessage(message);
        return response;
    }

    /**
     * 获取一个纯净的实体
     * @param <T>
     * @return
     */
    public static <T> Response<T> getPureResponse() {
        return new Response<>();
    }

    /**
     * 获取用户成功相应实体
     * @param id
     * @param markNumber
     * @param userName
     * @param userType
     * @param pojo
     * @param <T>
     * @return
     */
    public static <T> Response<T> getLoginSuccessResponse(long id, String markNumber, String userName, String userType, T pojo) {
        Response<T> response = new Response<>();
        //设置数据库id
        response.setId(id);
        //设置学号
        response.setMarkNumber(markNumber);
        //设置姓名
        response.setUserName(userName);
        //设置用户类别
        response.setUserType(userType);
        response.setStatusCode(Response.OK);
        //设置用户实体
        response.setMessagePojo(pojo);
        return response;
    }

    /**
     *获取一个包含一个数据ID（可以是数据库，或者是ELK的）
     * @param id 抽象ID
     * @param code
     * @param <T>
     * @return
     */
    public static <T> Response<T> getId(long id, int code) {
        Response<T> response = new Response<>();
        //设置id
        response.setId(id);
        response.setStatusCode(code);
        return response;
    }

    /**
     * 获取包含提示信息和状态的相应实体
     * @param statusCode
     * @param message
     * @param <T>
     * @return
     */
    public static <T> Response<T> getMessageAndStatusCode(int statusCode, String message) {
        Response<T> response = new Response<>();
        response.setStatusCode(statusCode);
        response.setMessage(message);
        return response;
    }
}
