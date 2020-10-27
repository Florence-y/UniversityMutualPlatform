package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

/**
 * @author Florence
 */
@WebFilter(value = {"/index.html", "/html/test1.html", "/page/index.html"}, dispatcherTypes = {DispatcherType.ASYNC, DispatcherType.REQUEST, DispatcherType.FORWARD})
public class LoginFilter implements Filter {
    @Override
    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        System.out.println("过滤器跳转页面");
//        ((HttpServletResponse) resp).sendRedirect("404.html");
        chain.doFilter(req, resp);

    }

    @Override
    public void init(FilterConfig config) throws ServletException {

    }

}
