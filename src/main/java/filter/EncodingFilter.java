package filter;

import util.WebUtil;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author Florence
 */
@WebFilter(urlPatterns = {"/Servlet/*"})
public class EncodingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        //全部用json来传输数据
        request.setCharacterEncoding("utf-8");
        HttpServletResponse rep = (HttpServletResponse) response;
        WebUtil.setResponseType("json", rep);
        //设置跨域问题
        rep.setHeader("Access-Control-Allow-Origin", "*");
        rep.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        rep.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        System.out.println("过滤器被访问");
        chain.doFilter(request, rep);
    }


    @Override
    public void destroy() {

    }
}
