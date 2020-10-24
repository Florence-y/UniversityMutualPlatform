package daoTest;

import dao.AttentionDao;
import dao.impl.AttentionDaoImpl;
import org.junit.Test;

public class attentionTest {
    @Test
    public void isAttention() {
        AttentionDao attentionDao = new AttentionDaoImpl();
        System.out.println(attentionDao.isAttention("191", "191541227"));
    }
}
