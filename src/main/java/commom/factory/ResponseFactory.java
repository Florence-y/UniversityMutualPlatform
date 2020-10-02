package commom.factory;

import pojo.Response;

/**
 * @author Florence
 */
public class ResponseFactory {
    public static <T> Response<T> getStatus(int code){
        Response<T> response = new Response<>();
        response.setStatusCode(code);
        return response;
    }
}
