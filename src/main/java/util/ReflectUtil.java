package util;


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

    /**
     * 获取更新sql
     * @param pojo 实体对象
     * @param paraArr 数据参数
     * @param <T> 具体的实体类型
     * @return 拼接完成的sql
     */
    public static <T> String getUpdateSql(T pojo, Object[] paraArr) {
        Class<?> clazz =pojo.getClass();
        Map<String,String> map = getPojoField(pojo);
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

    public static <T> String getInsertSql(T pojo,Object[] wantToInsert){
        int count=1;
        Class<?> clazz =pojo.getClass();
        StringBuilder sql= new StringBuilder("INSERT INTO ");
        Map<String,String> map = new HashMap<>(20);
        //将参数输入
        for (Field field:clazz.getDeclaredFields()){
            if (field.isAnnotationPresent(DbCol.class)){
                map.put(field.getName(),field.getAnnotation(DbCol.class).value());
            }
        }
        //获取表名
        DbTable table= clazz.getAnnotation(DbTable.class);
        String tableName;
        if (table!=null){
            tableName=table.value();
            sql.append(tableName).append(" (");
        }
        sql.append(map.get(wantToInsert[0]));
        for (int i=1;i<wantToInsert.length;i++){
            String str=map.get(wantToInsert[i]);
            if (str!=null){
                count++;
                sql.append(" , ").append(str);
            }
        }
        sql.append(") VALUES ( ?");
        for (int i=1;i<count;i++){
            sql.append(", ?");
        }
        sql.append(")");
        return sql.toString();
    }

    /**
     * 获取一个实体类对象的 field名字和他的数据库列
     * @param pojo 实体对象
     * @param <T> 泛型
     * @return field colname键值对
     */
    public static  <T> Map<String,String> getPojoField(T pojo){
        Class<?> clazz =pojo.getClass();
        Map<String,String> map = new HashMap<>(10);
        //将参数输入
        for (Field field:clazz.getDeclaredFields()){
            if (field.isAnnotationPresent(DbCol.class)){
                map.put(field.getName(),field.getAnnotation(DbCol.class).value());
            }
        }
        return map;
    }

    /**
     * 获取实体类域的map
     * @param pojo 实体类
     * @param <T> 具体类型
     * @return 返回map
     */
    public static <T> Map<String,Object> getPojoFieldIsExist(T pojo){
        Class<?> clazz =pojo.getClass();
        Map<String,Object> map = new HashMap<>(10);
        for (Field field:clazz.getDeclaredFields()){
            map.put(field.getName(),true);
        }
        return map;
    }

    /**
     * 获取某个实体类的某一个列
     * @param pojo 实体类对象
     * @param proName 属性值
     * @param <T> 泛型
     * @return 实际的数据库列名
     */
    public static <T> String getColVal(T pojo,String proName) {
        Map<String,String> map=getPojoField(pojo);
        String col=map.get(proName);
        if (col!=null) {
            return col;
        }
        System.out.println("获取数据库列为空");
        return null;
    }
}
