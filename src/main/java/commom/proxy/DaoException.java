package commom.proxy;

public class DaoException implements DaoExceptionCatchDynamicProxy {

    @Override
    public void markException() throws Exception {
        System.out.println("抛出异常咯");
        throw new Exception();
    }
}
