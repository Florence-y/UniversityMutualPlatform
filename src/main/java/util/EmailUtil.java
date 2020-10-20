package util;

import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;
import java.util.Random;

/**
 * @author Florence
 */
public class EmailUtil {
    /**
     * 发件人账号
     * 3287245267@qq.com
     */
    private static final String EMAIL_ACCOUNT = "191541227@m.gduf.edu.cn";
    /**
     * 发件人密码
     * abc123456
     */
    private static final String EMAIL_PASS_WORD = "Qq123456YZ";
    /**
     * 发送邮箱服务器
     */
    private static final String MY_EMAILSMTP_HOST = "smtp.exmail.qq.com";
    /**
     * 协议
     */
    private static final String PROTOCOL = "smtp";
    /**
     * 服务器端口
     */
    private static final String SMTP_PORT = "465";
    /**
     * 用于创建会话对象
     */
    private static Session session;
    /**
     * 验证码
     */
    private String vCode;

    /**
     * 构造函数，配置属性
     */
    public EmailUtil() {
        Properties props = new Properties();
        // 使用的协议（JavaMail规范要求）
        props.setProperty("mail.transport.protocol", PROTOCOL);
        // 发件人的邮箱的 smtp 服务器地址
        props.setProperty("mail.smtp.host", MY_EMAILSMTP_HOST);
        // 需要请求认证
        props.setProperty("mail.smtp.auth", "true");
        //设置ssl加密
        props.setProperty("mail.smtp.port", SMTP_PORT);
        props.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        props.setProperty("mail.smtp.socketFactory.fallback", "false");
        props.setProperty("mail.smtp.socketFactory.port", SMTP_PORT);
        session = Session.getInstance(props);
        // session.setDebug(true);  // 设置为debug模式, 可以查看详细的发送 log
    }

    public static String verifyCode(int n) {
        StringBuilder strB = new StringBuilder();
        Random rand = new Random();
        for (int i = 0; i < n; i++) {
            int r1 = rand.nextInt(3);
            int r2 = 0;
            // r2为ascii码值
            switch (r1) {
                // 数字
                case 0:
                    r2 = rand.nextInt(10) + 48;
                    break;
                // 大写字母
                case 1:
                    r2 = rand.nextInt(26) + 65;
                    break;
                // 小写字母
                case 2:
                    r2 = rand.nextInt(26) + 97;
                    break;
                default:
                    break;
            }
            strB.append((char) r2);
        }
        return strB.toString();
    }

    /**
     * 构建邮件内容
     *
     * @param toEmail 要发送验证码的用户
     * @return 发送邮件内容
     */
    public MimeMessage createMailContent(String toEmail) throws Exception {
        MimeMessage message = new MimeMessage(session);
        // 发件人
        message.setFrom(new InternetAddress(EMAIL_ACCOUNT, "验证码发送系统", "UTF-8"));
        // 收件人
        message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(toEmail));
        // 邮件主题
        message.setSubject("验证码", "UTF-8");
        // 邮件正文
        vCode = verifyCode(6);
        message.setContent("您好，您的验证码是：" + vCode + "。", "text/html;charset=UTF-8");
        // 设置发件时间
        message.setSentDate(new Date());
        // 保存设置
        message.saveChanges();
        return message;
    }

    /**
     * 发送邮件
     *
     * @param toEmail 收件人
     */
    public String sendEmail(String toEmail) throws Exception {
        Transport transport = session.getTransport();
        transport.connect(EMAIL_ACCOUNT, EMAIL_PASS_WORD);
        // 邮件内容
        MimeMessage message = createMailContent(toEmail);
        transport.sendMessage(message, message.getAllRecipients());
        System.out.println("验证码发送成功！");
        // 关闭连接
        transport.close();
        return vCode;
    }
}
