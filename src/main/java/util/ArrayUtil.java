package util;

import java.util.LinkedList;
import java.util.List;

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
}
