package dao.impl;

import commom.strategy.JdbcGetPojoStrategy;
import commom.strategy.impl.InfJdbcStrategy;
import dao.InfDao;
import pojo.Inf;
import util.ReflectUtil;

/**
 * @author Florence
 * 信息文章实体类
 */
public class InfDaoImpl extends BaseDaoImpl<Inf> implements InfDao {
    @Override
    public String getTableName() {
        return "t_inf";
    }

    @Override
    public String getTableIdField() {
        return ReflectUtil.getIdField(new Inf());
    }

    @Override
    public JdbcGetPojoStrategy<Inf> getPackageStrategy() {
        return new InfJdbcStrategy();
    }


}
