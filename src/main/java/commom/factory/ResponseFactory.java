package commom.factory;

import pojo.Response;

/**
 * @author Florence
 */
public class ResponseFactory {
    public static <T> Response<T> getStatus(int code) {
        Response<T> response = new Response<>();
        response.setStatusCode(code);
        return response;
    }

    public static <T> Response<T> getMessage(String message) {
        Response<T> response = new Response<>();
        response.setMessage(message);
        return response;
    }

    public static <T> Response<T> getPureResponse() {
        return new Response<>();
    }

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

    public static <T> Response<T> getId(long id, int code) {
        Response<T> response = new Response<>();
        //设置数据库id
        response.setId(id);
        response.setStatusCode(code);
        return response;
    }
}
