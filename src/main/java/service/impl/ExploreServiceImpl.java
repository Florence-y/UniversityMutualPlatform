package service.impl;

import dao.TagDao;
import dao.impl.TagDaoImpl;
import org.apache.lucene.search.join.ScoreMode;
import org.elasticsearch.index.query.*;
import pojo.Page;
import pojo.Question;
import service.ExploreService;
import util.ElasticUtil;

import java.io.IOException;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * @author Florence
 */
public class ExploreServiceImpl implements ExploreService {
    TagDao tagDao = new TagDaoImpl();
    @Override
    public List<Page> initPage() throws IOException, SQLException {
        List<Page> list = new LinkedList<>();
        List<String> questionTypes=tagDao.getAllQuestionType();
        for (String tag:questionTypes){
            Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question", ElasticUtil.getTermBuilder("questionType", tag), new Question());
            list.add(questionPage);
        }
        return list;
    }

    @Override
    public Page<Question> getSpecialType(String questionType) throws IOException {
        return ElasticUtil.scrollSearchFirst("question",ElasticUtil.getTermBuilder("questionType",questionType),new Question());
    }


    @Override
    public Page<Question> exploreQuestion(String fieldAndValueFromTheMixMap) throws IOException {
        //获取内容搜索（包含对象的搜索）
        NestedQueryBuilder queryBuilderContents = ElasticUtil.getNestedQuery("contents","contentMain",fieldAndValueFromTheMixMap);
        //匹配标题
        MatchQueryBuilder queryBuilderTitle=QueryBuilders.matchQuery("title",fieldAndValueFromTheMixMap);
        //建立bool查询
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //两个or起来
        boolQueryBuilder.should(queryBuilderContents);
        boolQueryBuilder.should(queryBuilderTitle);
        //查询
        return ElasticUtil.scrollSearchFirst("question",boolQueryBuilder,new Question());
    }
}
