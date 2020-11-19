package service.impl;

import commom.constantval.ServletConstantVal;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import pojo.*;
import service.LostAndFoundService;
import util.ElasticUtil;
import util.ReflectUtil;
import util.TimeUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.Date;
import java.util.Map;

/**
 * @author Florence
 * 失物招领服务类
 */
public class LostAndFoundServiceImpl implements LostAndFoundService {
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();

    private static void setCommonBoolQuery(BoolQueryBuilder boolQueryBuilder, Map<String, Object> pureMap) {
        if (pureMap.get("objectType") != null) {
            boolQueryBuilder.must(ElasticUtil.getTermBuilder("objectType", (String) pureMap.get("objectType")));
        }
        if (pureMap.get("objectDetailType") != null) {
            boolQueryBuilder.must(ElasticUtil.getTermBuilder("objectDetailType", (String) pureMap.get("objectDetailType")));
        }
    }

    @Override
    public int addLost(Map<String, Object> map) {
        String lost = ElasticUtil.addDoc(map, "lost");
        return lost != null ? Response.OK : Response.ERROR;
    }

    @Override
    public int addFound(Map<String, Object> map) {
        String found = ElasticUtil.addDoc(map, "found");
        return found != null ? Response.OK : Response.ERROR;
    }

    @Override
    public Lost getLostByTerm(String id) throws IOException {
        String lost = ElasticUtil.getDocById("lost", id);
        Lost lostPojo = WebUtil.jsonToObj(Lost.class, lost);
        String authorMarkNumber = lostPojo.getAuthorMarkNumber();
        String userType = markNumberTypeDao.getUserType(authorMarkNumber);
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(userType)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, authorMarkNumber);
            lostPojo.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(userType)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, authorMarkNumber);
            lostPojo.setTeacher(teacher);
        }
        return lostPojo;
    }

    @Override
    public Found getFoundByTerm(String id) throws IOException {
        String found = ElasticUtil.getDocById("found", id);
        Found foundPojo = WebUtil.jsonToObj(Found.class, found);
        String authorMarkNumber = foundPojo.getAuthorMarkNumber();
        String userType = markNumberTypeDao.getUserType(authorMarkNumber);
        //设置用户信息
        if (ServletConstantVal.STUDENT.equals(userType)) {
            Student student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL, authorMarkNumber);
            foundPojo.setStudent(student);
        } else if (ServletConstantVal.TEACHER.equals(userType)) {
            Teacher teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL, authorMarkNumber);
            foundPojo.setTeacher(teacher);
        }
        return foundPojo;
    }

    @Override
    public Page<Lost> getLostAll(String scrollId) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Lost());
        }
        return ElasticUtil.scrollSearchFirst("lost",
                QueryBuilders.matchAllQuery(),
                new Lost(), false);
    }

    @Override
    public Page<Found> getFoundAll(String scrollId) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Found());
        }
        return ElasticUtil.scrollSearchFirst("found", QueryBuilders.matchAllQuery(),
                new Found(), false);
    }

    @Override
    public Page<Lost> getLostByExplore(String scrollId, Map<String, Object> map) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Lost());
        }
        Date lostTime = null;
        Map<String, Object> pureMap = ReflectUtil.getFieldAndValueFromTheMixMap(map, new Lost());
        String lostTimeString = (String) pureMap.get("lostTime");
        if (lostTimeString != null) {
            lostTime = TimeUtil.getNotDetailDateObj(lostTimeString);
        }
        String lostLocation = (String) pureMap.get("lostLocation");
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //首先添加个全部的
        boolQueryBuilder.must(QueryBuilders.matchAllQuery());
        //设置相同的部分
        setCommonBoolQuery(boolQueryBuilder, pureMap);
        //三天前，和三天后的
        if (lostTime != null) {
            boolQueryBuilder.must(ElasticUtil.getDataRangeBuilder("lostTime", TimeUtil.addOrSubDayOfDate(lostTime, -3)
                    , TimeUtil.addOrSubDayOfDate(lostTime, 3)));
        }
        if (lostLocation != null) {
            boolQueryBuilder.must(ElasticUtil.getMatchBuilder("lostLocation", lostLocation));
        }
        return ElasticUtil.scrollSearchFirst("lost",
                boolQueryBuilder,
                new Lost(), false);
    }

    @Override
    public Page<Found> getFoundByExplore(String scrollId, Map<String, Object> map) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Found());
        }
        Date foundTime = null;
        Map<String, Object> pureMap = ReflectUtil.getFieldAndValueFromTheMixMap(map, new Lost());
        String foundTimeString = (String) pureMap.get("foundTime");
        if (foundTimeString != null) {
            foundTime = TimeUtil.getNotDetailDateObj(foundTimeString);
        }
        String foundLocation = (String) pureMap.get("foundLocation");
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //首先添加个全部的
        boolQueryBuilder.must(QueryBuilders.matchAllQuery());
        setCommonBoolQuery(boolQueryBuilder, pureMap);
        //三天前，和三天后的
        if (foundTime != null) {
            boolQueryBuilder.must(ElasticUtil.getDataRangeBuilder("foundTime", TimeUtil.addOrSubDayOfDate(foundTime, -3)
                    , TimeUtil.addOrSubDayOfDate(foundTime, 3)));
        }
        if (foundLocation != null) {
            boolQueryBuilder.must(ElasticUtil.getMatchBuilder("foundLocation", foundLocation));
        }
        return ElasticUtil.scrollSearchFirst("found",
                boolQueryBuilder,
                new Found(), false);
    }
}
