package util;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class ArrayUtil {
    public static final int STEP = 2;
    public static final boolean ODD = true;
    public static final boolean EVEN = false;

    /**
     * 获取奇数或者偶数位的数组
     *
     * @param sourceArr   源数组
     * @param isOddOrEven true 位奇数 0 2 4 6 false 为偶数位 1 3 5 7
     * @param <T>         源数组装的类型
     * @return 返回获取到的数组
     */
    public static <T> T[] getArrByOddOrEven(T[] sourceArr, boolean isOddOrEven) {
        List<T> list = new LinkedList<>();
        //奇数位
        if (isOddOrEven) {
            for (int i = 0; i < sourceArr.length - 1; i += STEP) {
                list.add(sourceArr[i]);
            }
            return (T[]) list.toArray();
        }
        for (int i = 1; i < sourceArr.length; i += STEP) {
            list.add(sourceArr[i]);
        }
        return (T[]) list.toArray();
    }

    /**
     * 根据map与实体类相关的数组（一定是实体类里面的元素，但是还没有key还没有转化成具体的数据库列名）
     *
     * @param map map的值
     * @return 返回值
     */
    public static <T> Object[] keyValueMapToPojoArr(Map<String, Object> map, T pojo) {
        //将参数输入(以防输入一些错误参数被读进去了)
        Map<String, String> fieldMap = ReflectUtil.getPojoField(pojo);
        List<Object> list = new LinkedList<>();
        //遍历map
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            //如果列名存在（这里并不是数据库列名，还是前端发送的原来的参数名）
            if (fieldMap.get(entry.getKey()) != null) {
                list.add(entry.getKey());
                list.add(entry.getValue());
            }
        }
        return list.toArray();
    }

    /**
     * 根据map对象获取update语句
     *
     * @param pojoMap   实体map
     * @param map       参数map
     * @param condition 条件
     * @return 返回值
     */
    public static Object[] mapToUpdateArr(Map<String, Object> pojoMap, Map<String, Object> map, String condition) {
        List<Object> list = new LinkedList<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            String string = entry.getKey();
            //先判断是实体里面存在的属性，并且不是条件
            if (pojoMap.get(string) != null && !string.equals(condition)) {
                list.add(string);
                list.add(map.get(string));
            }
        }
        //最后添加条件并返回
        list.add(condition);
        list.add(map.get(condition));
        return list.toArray();
    }

    /**
     * 根据键值对来生成一个更新语句（这个跟实体类的转化数组相比只是简单的将全部值转化而已）
     *
     * @param map 键值对
     * @return 返回一个键值对象
     */
    public static Object[] keyAndValueMapToKeyAndValueArr(Map<String, Object> map) {
        List<Object> list = new LinkedList<>();
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            list.add(entry.getKey());
            list.add(entry.getValue());
        }
        return list.toArray();
    }
}
