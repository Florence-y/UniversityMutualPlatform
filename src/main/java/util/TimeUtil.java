package util;

import lombok.extern.slf4j.Slf4j;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Florence
 * 时间工具类
 */
@Slf4j
public class TimeUtil {
    public static final String MINUTE = "m";
    public static final String DAY = "d";
    public static final String HOUR = "H";
    public static final int WRONG = -5555555;
    public static final int ZERO = 0;
    public static final int SIXTY = 60;
    public static final int TWENTY_FOUR = 24;

    /**
     * date转String
     *
     * @param date 日期对象
     * @return String日期
     */
    public static String getNotDetailDateString(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(date);
    }

    /**
     * String转date
     *
     * @param date 日期对象
     * @return date日期
     */
    public static Date getNotDetailDateObj(String date) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd ");
            return formatter.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 将date转换成String
     * 得到像 2018-11-26 11:04:34 这种格式的时间字符串
     */
    public static String getDetailDateString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }

    /**
     * 获取像 2018-11-26 11:04:34  的date对象
     *
     * @param dateString 日期字符串
     * @return 日期对象
     * @throws ParseException 转换错误
     */
    public static Date getDetailDateObj(String dateString) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.parse(dateString);
    }


    /**
     * 获取系统当前日期，返回Date类型
     * 返回格式是这样的：Mon Nov 26 00:00:00 CST 2018
     */
    public static Date getNotDetailSystemDate() {
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = new Date();
            return simpleDateFormat.parse(simpleDateFormat.format(date));
        } catch (ParseException e) {
            log.error("时间转换出错{}", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }


    /**
     * 获取系统当前时间，返回Date类型
     * 返回格式是这样的：Mon Nov 26 11:14:26 CST 2018
     */
    public static Date getDetailSystemTime() {
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = new Date();
            return simpleDateFormat.parse(simpleDateFormat.format(date));
        } catch (ParseException e) {
            log.error("时间转换出错{}", e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 获取系统时间（毫秒类型）
     *
     * @return 返回系统的现在的时间毫秒
     */
    public static long getSystemTimeMillis() {
        return System.currentTimeMillis();
    }

    /**
     * 获取当前系统的时间戳对象
     *
     * @return 返回时间戳对象
     */
    public static Timestamp getSystemTimeStamp() {
        return new Timestamp(getSystemTimeMillis());
    }


    /**
     * 获取时间间隔
     *
     * @param dateBefore 前面的时间
     * @param dateAfter  后面的时间（一般是当前的时间）
     * @param type       类型（h,m,d）
     * @return 返回一个long值表示差距
     */
    public static long getTimeGap(Date dateBefore, Date dateAfter, String type) {
        //这样得到的差值是毫秒级别
        long diff = dateAfter.getTime() - dateBefore.getTime();
        //上面这段代码是计算时间间隔是 以三个单位来划分的 比如两者相差一天5个小时5分
//        long days = diff / (1000 * 60 * 60 * 24);
//        long hours = (diff - days * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
//        long minutes = (diff - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60)) / (1000 * 60);
        long days = diff / (1000 * 60 * 60 * 24);
        long hours = diff / (1000 * 60 * 60);
        long minutes = diff / (1000 * 60);
        System.out.println("" + days + "天" + hours + "小时" + minutes + "分");
        if (MINUTE.equals(type)) {
            return minutes;
        } else if (HOUR.equals(type)) {
            return hours;
        } else if (DAY.equals(type)) {
            return days;
        } else {
            return WRONG;
        }
    }

    public static String getTimeGapToSpecialStr(Timestamp sendTime) {
        long day = getTimeGap(sendTime, new Timestamp(getSystemTimeMillis()), DAY);
        long hour = getTimeGap(sendTime, new Timestamp(getSystemTimeMillis()), HOUR);
        long minute = getTimeGap(sendTime, new Timestamp(getSystemTimeMillis()), MINUTE);
        if (hour == ZERO && day == ZERO) {
            return minute + "分钟前";
        } else if (minute >= SIXTY && hour > ZERO && day == ZERO) {
            return hour + "小时前";
        } else {
            return day + "天前";
        }
    }
}