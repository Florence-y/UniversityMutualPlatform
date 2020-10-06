package util;

import lombok.extern.slf4j.Slf4j;

import java.text.DateFormat;
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

    /**
     * date转String
     *
     * @param date 日期对象
     * @return String日期
     */
    public static String getStringTime(Date date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return formatter.format(date);
    }

    /**
     * String转date
     *
     * @param date 日期对象
     * @return date日期
     */
    public static Date getDateTime(String date) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            return formatter.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 将date转换成String
     * 得到像 2018-11-26 这种格式的日期字符串
     */
    public static String gainDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }


    /**
     * 将date转换成String
     * 得到像 2018-11-26 11:04:34 这种格式的时间字符串
     */
    public static String gainTime(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }


    /**
     * 获取系统当前日期，返回Date类型
     * 返回格式是这样的：Mon Nov 26 00:00:00 CST 2018
     */
    public static Date getSystemDate() {
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
    public static Date getSystemTime() {
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
     * @return
     */
    public static long getSystemTimeMillis(){
        return System.currentTimeMillis();
    }
    public static long getTimeGap(Date dateBefore,Date dateAfter,String type) {
        //这样得到的差值是毫秒级别
        long diff = dateAfter.getTime() - dateBefore.getTime();
        long days = diff / (1000 * 60 * 60 * 24);
        long hours = (diff - days * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
        long minutes = (diff - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60)) / (1000 * 60);
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
}