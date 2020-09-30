package util;

;

import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Florence
 */
public class ReflectUtil {

    public static <T> String getIdField(T pojo) {
        Class<?> clazz=pojo.getClass();
        for (Field field:clazz.getDeclaredFields()){
            field.setAccessible(true);
            if (field.isAnnotationPresent(DbPriKey.class)){
                DbCol dbCol=field.getAnnotation(DbCol.class);
                return dbCol.value();
            }
        }
        return "null";
    }

    public static <T> String getUpdateSql(T pojo, Object[] paraArr) {
        Class<?> clazz =pojo.getClass();
        Map<String,String> map = new HashMap<>(10);
        //将参数输入
        for (Field field:clazz.getDeclaredFields()){
            if (field.isAnnotationPresent(DbCol.class)){
                map.put(field.getName(),field.getAnnotation(DbCol.class).value());
            }
        }
        //获取表名
        DbTable table= clazz.getAnnotation(DbTable.class);
        String tableName="";
        StringBuilder sql;
        if (table!=null){
            tableName=table.value();
        }
        sql = new StringBuilder("UPDATE " + tableName + " SET " + map.get(paraArr[0]) + " = ?");
        for (int i=1;i<paraArr.length-1;i++){
            String dbCol=map.get(paraArr[i]);
            if (dbCol!=null){
                sql.append(",  ").append(dbCol).append(" = ?");
            }
        }
        sql.append(" WHERE ").append(map.get(paraArr[paraArr.length - 1])).append(" = ?");
        return sql.toString();
    }
}
