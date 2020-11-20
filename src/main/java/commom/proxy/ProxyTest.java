package commom.proxy;

import java.lang.reflect.Proxy;

public class ProxyTest {
    public static void main(String[] args) {
        DaoExceptionCatchDynamicProxy daoExceptionCatchDynamicProxy = new DaoException();
        DaoExceptionCatchDynamicProxy proxyObject= (DaoExceptionCatchDynamicProxy) Proxy.newProxyInstance(
                DaoExceptionCatchDynamicProxy.class.getClassLoader(),
                DaoExceptionCatchDynamicProxy.class.getInterfaces(),
                new DaoProxy(daoExceptionCatchDynamicProxy));
    }
}
