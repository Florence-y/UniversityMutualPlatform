package service.impl;

import dao.TagDao;
import dao.impl.TagDaoImpl;
import org.elasticsearch.index.query.*;
import pojo.*;
import service.ExploreService;
import util.ElasticUtil;
import util.TimeUtil;

import java.io.IOException;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

/**
 * @author Florence
 */
public class ExploreServiceImpl implements ExploreService {
    TagDao tagDao = new TagDaoImpl();

    @Override
    public List<Page> initPage() throws IOException, SQLException {
        List<Page> list = new LinkedList<>();
        List<String> questionTypes = tagDao.getAllQuestionType();
        for (String tag : questionTypes) {
            Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question",
                    ElasticUtil.getTermBuilder("questionType", tag),
                    new Question(), false);
            questionPage.setAdditionContent(tag);
            list.add(questionPage);
        }
        return list;
    }

    @Override
    public Page<Question> getSpecialType(String authorMarkNumber) throws IOException {
        Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question", ElasticUtil.getTermBuilder("authorMarkNumber",
                authorMarkNumber),
                new Question(), false);
        for (Question question:questionPage.getDataList()){
            question.setTimeUpToNow(TimeUtil.getTimeGapToSpecialStr(question.getTime()));
        }
        return questionPage;
    }


    @Override
    public Page<Question> exploreQuestion(String fieldAndValueFromTheMixMap) throws IOException {
        //获取内容搜索（包含对象的搜索）
//        NestedQueryBuilder queryBuilderContents = ElasticUtil.getNestedQuery("contents", "contentMain", fieldAndValueFromTheMixMap);
        //匹配标题
        MatchQueryBuilder queryBuilderTitle = QueryBuilders.matchQuery("title", fieldAndValueFromTheMixMap);
        //建立bool查询
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        //两个or起来
//        boolQueryBuilder.should(queryBuilderContents);
        boolQueryBuilder.should(queryBuilderTitle);
        //查询
        return ElasticUtil.scrollSearchFirst("question", boolQueryBuilder,
                new Question(), true, "title");
    }

    @Override
    public <T extends IndexObject> Page<T> getPageByScrollId(String scrollId, T pojo) throws IOException {
        return ElasticUtil.scrollSearch(scrollId, pojo);
    }

    @Override
    public Page<Found> exploreFound(String exploreContent) throws IOException {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        setCommonFieldExplore(boolQueryBuilder,exploreContent);
        QueryBuilder foundLocation = ElasticUtil.getMatchBuilder("foundLocation", exploreContent);
        QueryBuilder foundObjectName = ElasticUtil.getMatchBuilder("foundObjectName", exploreContent);
        boolQueryBuilder.should(foundLocation);
        boolQueryBuilder.should(foundObjectName);
        return ElasticUtil.scrollSearchFirst("found",boolQueryBuilder,new Found(),true,"foundLocation","foundObjectName");
    }



    @Override
    public Page<Lost> exploreLost(String exploreContent) throws IOException {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        setCommonFieldExplore(boolQueryBuilder,exploreContent);
        QueryBuilder lostLocation = ElasticUtil.getMatchBuilder("lostLocation", exploreContent);
        QueryBuilder lostObjectName = ElasticUtil.getMatchBuilder("lostObjectName", exploreContent);
        boolQueryBuilder.should(lostLocation);
        boolQueryBuilder.should(lostObjectName);
        return ElasticUtil.scrollSearchFirst("lost",boolQueryBuilder,new Lost(),true,"lostLocation","lostObjectName");
    }


    private void setCommonFieldExplore(BoolQueryBuilder boolQueryBuilder, String exploreContent) {
        boolQueryBuilder.should(ElasticUtil.getTermBuilder("objectType",exploreContent));
    }
}
