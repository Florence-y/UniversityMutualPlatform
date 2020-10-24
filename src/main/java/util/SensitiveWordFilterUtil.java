package util;

import pojo.QuestionContent;
import pojo.Response;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class SensitiveWordFilterUtil {
    private static final List<String> yellowWord=new ArrayList<>();
    private static final List<String> commonWord=new ArrayList<>();
    static {
        try {
            String str;

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


    public static int filterMap(Map<String,Object> map){
        boolean flag=true;
        for (Map.Entry<String,Object> entry:map.entrySet()){
            Class<?> clazz = entry.getValue().getClass();
            System.out.println(clazz.getName());
            //首先判断是否是字符串
            if(clazz.isAssignableFrom(String.class)){
                boolean isIncludeForbid = filterForbiddenWord((String) entry.getValue());
                //如果包含严重敏感词汇
                if (isIncludeForbid){
                    return Response.ERROR;
                }
                //过滤包含普通敏感词汇
                else {
                    String newWord = filterCommonSensitiveWord((String) entry.getValue());
                    if (newWord.contains("*")){
                        flag=false;
                    }
                    entry.setValue(newWord);
                }
            }
            else if (clazz.isAssignableFrom(ArrayList.class)){

            }
            else if (clazz.isAssignableFrom(ArrayList.class)){

            }
        }
        return flag?Response.OK:Response.COMMON_SENSITIVE;
    }

    public static List<String> filterArr(ArrayList<String> textArr) {
        LinkedList<String> linkedList = new LinkedList<>();
        for (String str:textArr){
            boolean isForbid = filterForbiddenWord(str);
            if (isForbid){
                return null;
            }
            linkedList.add(filterCommonSensitiveWord(str));
        }
        return linkedList;
    }
}
