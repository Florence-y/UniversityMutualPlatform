package filter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

/**
 * xss过滤
 * @author Florence
 */
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {
    HttpServletRequest orgRequest ;

    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
        orgRequest = request;
    }

    /**
     * 覆盖获取参数方法，把参数名和参数值进行过滤。
     */
    @Override
    public String getParameter(String name) {
        String value = super.getParameter(xssEncode(name));
        if (value != null) {
            value = xssEncode(value);
        }
        return value;
    }

    /**
     * 覆盖获取参数头方法，把参数名和参数值进行过滤。
     */
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(xssEncode(name));
        if (value != null) {
            value = xssEncode(value);
        }
        return value;
    }

    /**
     * 将引起xss漏洞的半角字符全部替换成全角字符（这个想法是因为一开始学编程的时候，就一直犯半角字符打成全角导致错误哈哈哈哈）
     * @param s 要转码的字符串
     * @return 转化后的字符串
     */
    public static String xssEncode(String s) {
        if (s == null || "".equals(s)) {
            return s;
        }
        StringBuilder sb = new StringBuilder(s.length() + 16);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                //单引号转换
                case '\'':
                    sb.append('‘');
                    break;
                //双引号转换
                case '\"':
                    sb.append('“');
                    break;
                //大于号转换
                case '>':
                    sb.append('＞');
                    break;
                //小于号转换
                case '<':
                    sb.append('＜');
                    break;
                //zda符号转换
                case '&':
                    sb.append('＆');
                    break;
                //井号转换
                case '#':
                    sb.append('＃');
                    break;
                //斜线转换
                case '\\':
                    sb.append('＼');
                    break;
                //正常字符
                default:
                    sb.append(c);
                    break;
            }
        }
        //返回转换后的字符串
        return sb.toString();
    }

}