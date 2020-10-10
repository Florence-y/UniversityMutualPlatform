package util;


import commom.annontation.DbCol;
import commom.annontation.DbPriKey;
import commom.annontation.DbTable;
import commom.annontation.IsValid;
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Florence
 */
@Slf4j
public class ReflectUtil {
    /**
     * 获取id的数据库列值
     *
     * @param pojo 实体类
     * @param <T>  实体的具体类型
     * @return id的列名
     */
    public static <T> String getIdField(T pojo) {
        Class<?> clazz = pojo.getClass();
        for (Field field : clazz.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.isAnnotationPresent(DbPriKey.class)) {
                DbCol dbCol = field.getAnnotation(DbCol.class);
                return dbCol.value();
            }
        }
        return "null";
    }

    /**
     * 获取更新sql
     *
     * @param pojo    实体对象
     * @param paraArr 数据参数 [key,key,key,key,key]
     * @param <T>     具体的实体类型
     * @return 拼接完成的sql 如： UPDATE TABLE_NAME SET =?,SET=?,SET=? WHERE CONDITION =?
     */
    public static <T> String getUpdateSql(T pojo, Object[] paraArr) {
        Class<?> clazz = pojo.getClass();
        Map<String, String> map = getPojoField(pojo);
        //获取表名
        DbTable table = clazz.getAnnotation(DbTable.class);
        String tableName = "";
        StringBuilder sql;
        if (table != null) {
            tableName = table.value();
        }
        //插入set=？
        sql = new StringBuilder("UPDATE " + tableName + " SET " + map.get(paraArr[0]) + " = ?");
        for (int i = 1; i < paraArr.length - 1; i++) {
            String dbCol = map.get(paraArr[i]);
            if (dbCol != null) {
                sql.append(",  ").append(dbCol).append(" = ?");
            }
        }
        //加入条件
        sql.append(" WHERE ").append(map.get(paraArr[paraArr.length - 1])).append(" = ?");
        return sql.toString();
    }

    /**
     * 获取插入的sql语句 是预备语句 带有？的
     *
     * @param pojo         实体对象
     * @param wantToInsert 想要插入的列（具体赋值JDBC工具类里面）[key,key,key,key]
     * @param <T>          实体的具体类型
     * @return 凭借完成的语句  INSERT INTO TABLENAME (KEY,KEY,KEY,KEY) VALUES (?,?,?,?)
     */
    public static <T> String getInsertSql(T pojo, Object[] wantToInsert) {
        int count = 1;
        Class<?> clazz = pojo.getClass();
        StringBuilder sql = new StringBuilder("INSERT INTO ");
        //获取一个实体的field和他相对应的数据库列名的map
        Map<String, String> map = getPojoField(pojo);
        //获取表名
        DbTable table = clazz.getAnnotation(DbTable.class);
        String tableName;
        if (table != null) {
            tableName = table.value();
            sql.append(tableName).append(" (");
        }
        //先添加首位处理逗号
        sql.append(map.get(wantToInsert[0]));
        //再添加其他的位置
        for (int i = 1; i < wantToInsert.length; i++) {
            String str = map.get(wantToInsert[i]);
            if (str != null) {
                count++;
                sql.append(" , ").append(str);
            }
        }
        //插入问号
        sql.append(") VALUES ( ?");
        for (int i = 1; i < count; i++) {
            sql.append(", ?");
        }
        sql.append(")");
        return sql.toString();
    }

    /**
     * 获取一个实体类对象的 field名字和他的数据库列（一定要有自定义注解才行）
     *
     * @param pojo 实体对象
     * @param <T>  泛型
     * @return field colname键值对
     */
    public static <T> Map<String, String> getPojoField(T pojo) {
        Class<?> clazz = pojo.getClass();
        Map<String, String> map = new HashMap<>(10);
        //将参数输入
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(DbCol.class)) {
                map.put(field.getName(), field.getAnnotation(DbCol.class).value());
            }
        }
        return map;
    }

    /**
     * 获取某个实体类的某一个列
     *
     * @param pojo    实体类对象
     * @param proName 属性值
     * @param <T>     泛型
     * @return 实际的数据库列名
     */
    public static <T> String getColVal(T pojo, String proName) {
        Map<String, String> map = getPojoField(pojo);
        String col = map.get(proName);
        if (col != null) {
            return col;
        }
        System.out.println("获取数据库列为空");
        return null;
    }

    /**
     * 获取一个(任意对象的)对象域map
     * 只是来判断有没有这个域
     *
     * @param pojo 实体对象
     * @param <T>  具体对象类型
     * @return 域map
     */
    public static <T> Map<String, Object> getObjectFieldMap(T pojo) {
        if (pojo == null) {
            log.error("空指针异常");
        }
        assert pojo != null;
        Class<?> clazz = pojo.getClass();
        Map<String, Object> map = new HashMap<>(10);
        for (Field field : clazz.getDeclaredFields()) {
            map.put(field.getName(), true);
        }
        return map;
    }

    /**
     * 将一个参数（数据库的列对应的实体属性），转换成 1=1 AND key=? AND key=?
     *
     * @param pojo 实体对象，用来排除无关信息
     * @param col  列名
     * @param <T>  泛型
     * @return 拼接完成的语句 1=1 AND key=? AND key=?
     */
    public static <T> String getConditionAnd(T pojo, Object[] col) {
        StringBuilder res = new StringBuilder("1=1 ");
        //获取具体的数据库 实体属性名：数据库列
        Map<String, String> map = getPojoField(pojo);
        for (Object str : col) {
            String temp = map.get(str);
            if (temp != null) {
                res.append(" AND ").append(temp).append(" =?");
            }
        }
        return res.toString();
    }

    /**
     * 将一个参数（数据库的列对应的实体属性），转换成 1=1 OR key=? OR key=?
     *
     * @param pojo 实体对象，用来排除无关信息
     * @param col  列名
     * @param <T>  泛型
     * @return 拼接完成的语句 1=0 OR key=? OR key=?
     */
    public static <T> String getConditionOr(T pojo, String[] col) {
        StringBuilder res = new StringBuilder("1=0 ");
        Map<String, String> map = getPojoField(pojo);
        for (String str : col) {
            String temp = map.get(str);
            if (temp != null) {
                res.append(" OR").append(temp).append(" =?");
            }
        }
        return res.toString();

    }

    /**
     * 根据map获取排序方式（只能根据一个列进行正序或者倒叙）
     * 注意！！！！！！参数名只能是order和direction，前端一定要按照这个名字来
     *
     * @param condition 排序的列
     * @param pojo      具体的实体对象，比如inf
     * @param <T>       实体对象的类型
     * @return 拼接的结果 如 ORDER BY field1 desc,id desc
     */
    public static <T> String getOrder(Map<String, Object> condition, T pojo) {
        //获取具体的数据库列名
        String direction = (String) condition.get("direction");
        return "ORDER BY " +
                //获取数据库列名
                ReflectUtil.getColVal(pojo, (String) condition.get("order"))
                //正序或者逆序
                + " " + direction + " ," + getIdField(pojo) + " " + direction;
    }

    /**
     * 获取一个对象有效值的map（可能一些map参杂着不少有效的参数）
     * @param object 实体对象
     * @param <T> 实体类型
     * @return 包含着 field名：具体的值的map
     */
    public static <T> Map<String,Object> getValidFieldMap(T object) {
        Class<?> clazz =object.getClass();
        Field[] declaredFields = clazz.getDeclaredFields();
        Map<String,Object> map = new HashMap<>(declaredFields.length);
        for (Field field:declaredFields){
            if (field.isAnnotationPresent(IsValid.class)){
                map.put(field.getName(),field.getAnnotation(IsValid.class).fieldName());
            }
        }
        return map;
    }

    public static <T> Map<String, Object> getFieldAndValueFromTheMixMap(Map<String, Object> map, T question) {
        //获取有效值的键值对
        Map<String,Object> validMap=getValidFieldMap(question);
        Map<String,Object> newMap= new HashMap<>(validMap.size());
        for (Map.Entry<String,Object> entry:map.entrySet()){
            //获取真正有效的域
            String realFieldValue= (String) validMap.get(entry.getKey());
            String value= (String) entry.getValue();
            //如果域不为空
            if (realFieldValue!=null&&value!=null&& !"".equals(value)){
                newMap.put(realFieldValue,value);
            }
        }
        return newMap;
    }
}
