package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 防止xss注入的过滤器
 * @author Florence
 */

@WebFilter(value = "/*", dispatcherTypes = {DispatcherType.ASYNC, DispatcherType.REQUEST, DispatcherType.FORWARD})
public class XssDefenderFilter implements Filter {
    @Override
    public void destroy() {
        System.out.println("xss转换过滤器摧毁");
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        //自定义过滤器将字符串中字符进行过滤
        XssHttpServletRequestWrapper xssReq=new XssHttpServletRequestWrapper((HttpServletRequest)req);
        chain.doFilter(xssReq, resp);
    }

    @Override
    public void init(FilterConfig config) {
        System.out.println("xss转换过滤器启动");
    }

}
