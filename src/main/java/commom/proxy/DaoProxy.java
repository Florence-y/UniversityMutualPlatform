package commom.proxy;

import com.fasterxml.jackson.databind.ObjectMapper;
import javafx.beans.binding.ObjectExpression;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author Florence
 */
public class DaoProxy implements InvocationHandler {
    private DaoExceptionCatchDynamicProxy target;
    DaoProxy(DaoExceptionCatchDynamicProxy wantToProxy){
        target=wantToProxy;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("do something before");
        Object res =method.invoke(target,args);
        System.out.println("do something after");
        return res;
    }
}
