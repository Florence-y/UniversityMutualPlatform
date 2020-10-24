package util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class SensitiveWordFilterUtil {
    private static List<String> yellowWord=new ArrayList<>();
    private static List<String> commonWord=new ArrayList<>();
    static {
        try {
            String str=null;

            BufferedReader bufferedReaderYellow = new BufferedReader(new InputStreamReader(SensitiveWordFilterUtil.class.getClassLoader().getResourceAsStream("sensitive-word-lib-yellow.txt")));
            while ((str=bufferedReaderYellow.readLine())!=null){
                yellowWord.add(str);
            }
            bufferedReaderYellow.close();
            BufferedReader bufferedReaderCommom=new BufferedReader(new InputStreamReader(SensitiveWordFilterUtil.class.getClassLoader().getResourceAsStream("sensitive-word-lib-commom.txt")));
            while (((str=bufferedReaderCommom.readLine())!=null)){
                commonWord.add(str);
            }
            bufferedReaderCommom.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 过滤禁止词汇
     * @param word 要过滤的字符串
     * @return 是否包含 true就是没问题 false 就是有问题
     */
    public static boolean filterForbiddenWord(String word){
        for (String str:yellowWord){
            if (word.contains(str)){ return true; }
        }
        return false;
    }

    /**
     * 替换普通敏感词汇为**
     * @param word 要替换的字符串
     * @return 过滤完的字符串
     */
    public static String filterCommonSensitiveWord(String word){
        for (String str:commonWord){
            if (word.contains(str)){
                 word = word.replace(str, "***");
            }
        }
        return word;
    }


    public static boolean filterMap(Map<String,Object> map){
        for (Map.Entry<String,Object> entry:map.entrySet()){
            Class<?> clazz = entry.getValue().getClass();
            //首先判断是否是字符串
            if(clazz.isAssignableFrom(String.class)){
                boolean isIncludeForbid = filterForbiddenWord((String) entry.getValue());
                //如果包含严重敏感词汇
                if (isIncludeForbid){
                    return false;
                }
                //过滤包含普通敏感词汇
                else {
                    String newWord = filterCommonSensitiveWord((String) entry.getValue());
                    entry.setValue(newWord);
                }
            }
        }
        return true;
    }
}
