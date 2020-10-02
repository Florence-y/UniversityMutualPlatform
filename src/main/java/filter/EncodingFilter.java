package filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author lyr
 * @create 2020/9/13 10:36
 */
@WebFilter(urlPatterns = {"/*"})
public class EncodingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        //全部用json来传输数据
        response.setContentType("application/json; charset=UTF-8");
        HttpServletResponse rep=(HttpServletResponse)response;
        //设置跨域问题
        rep.setHeader("Access-Control-Allow-Origin","*");
        chain.doFilter(request, rep);
    }


    @Override
    public void destroy() {

    }
}
