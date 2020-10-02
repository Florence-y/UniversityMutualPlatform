package util;

import commom.annontation.DbCol;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class ArrayUtil {
    public static final int STEP=2;
    public static final boolean ODD=true;
    public static final boolean EVEN=false;
    public static <T> T[] getArrByOddOrEven(T[] sourceArr,boolean isOddOrEven){
        List<T> list =new LinkedList<>();
        //奇数位
        if (isOddOrEven){
            for (int i=0;i<sourceArr.length-1;i+=STEP){
                list.add(sourceArr[i]);
            }
            return (T[]) list.toArray();
        }
        for (int i=1;i<sourceArr.length;i+=STEP){
            list.add(sourceArr[i]);
        }
        return (T[]) list.toArray();
    }

    /**
     * 根据map获取键值对数组
     * @param map map的值
     * @return 返回值
     */
    public static <T> Object[] keyValueToArr(Map<String,Object> map,T pojo){
        Class<T> clazz= (Class<T>) pojo.getClass();
        Map<String,String> fieldMap = new HashMap<>(20);
        //将参数输入(以防输入一些错误参数被读进去了)
        for (Field field:clazz.getDeclaredFields()){
            if (field.isAnnotationPresent(DbCol.class)){
                fieldMap.put(field.getName(),field.getAnnotation(DbCol.class).value());
            }
        }
        List<Object> list=new LinkedList<>();
        for (Map.Entry<String,Object> entry:map.entrySet()){
            if (fieldMap.get(entry.getKey())!=null) {
                list.add(entry.getKey());
                list.add(entry.getValue());
            }
        }
        return list.toArray();
    }
}
