package service.impl;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.MatchQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import pojo.*;
import service.ExploreService;
import util.ElasticUtil;
import util.TimeUtil;

import java.io.IOException;
import java.sql.SQLException;

/**
 * @author Florence
 */
public class ExploreServiceImpl implements ExploreService {

    @Override
    public Page<Question> initPage() throws IOException, SQLException {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        boolQueryBuilder.must(QueryBuilders.matchAllQuery());
        boolQueryBuilder.mustNot(ElasticUtil.getTermBuilder("questionType","Dynamic"));
        Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question",
               boolQueryBuilder,
                new Question(), false);
        return questionPage;
    }

    @Override
    public Page<Question> getSpecialType(String authorMarkNumber) throws IOException {
        Page<Question> questionPage = ElasticUtil.scrollSearchFirst("question", ElasticUtil.getTermBuilder("authorMarkNumber",
                authorMarkNumber),
                new Question(), false);
        for (Question question : questionPage.getDataList()) {
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
        return ElasticUtil.searchByQueryBuilder("question", boolQueryBuilder,
                new Question(), true, "title");
    }

    @Override
    public <T extends IndexObject> Page<T> getPageByScrollId(String scrollId, T pojo) throws IOException {
        return ElasticUtil.scrollSearch(scrollId, pojo);
    }

    @Override
    public Page<Found> exploreFound(String exploreContent) throws IOException {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        setCommonFieldExplore(boolQueryBuilder, exploreContent);
        //地点
        QueryBuilder foundLocation = ElasticUtil.getMatchBuilder("foundLocation", exploreContent);
        //物品名称
        QueryBuilder foundObjectName = ElasticUtil.getMatchBuilder("foundObjectName", exploreContent);
        //物品描述
        QueryBuilder foundDescribe = ElasticUtil.getMatchBuilder("foundDescribe", exploreContent);
        boolQueryBuilder.should(foundDescribe);
        boolQueryBuilder.should(foundLocation);
        boolQueryBuilder.should(foundObjectName);
        return ElasticUtil.searchByQueryBuilder("found", boolQueryBuilder, new Found(), true,
                "foundLocation",
                "foundObjectName",
                "foundDescribe",
                "objectType",
                "objectDetailType");
    }


    @Override
    public Page<Lost> exploreLost(String exploreContent) throws IOException {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        setCommonFieldExplore(boolQueryBuilder, exploreContent);
        //地点
        QueryBuilder lostLocation = ElasticUtil.getMatchBuilder("lostLocation", exploreContent);
        //物品名称
        QueryBuilder lostObjectName = ElasticUtil.getMatchBuilder("lostObjectName", exploreContent);
        //物品描述
        QueryBuilder lostDescribe = ElasticUtil.getMatchBuilder("lostDescribe", exploreContent);
        boolQueryBuilder.should(lostLocation);
        boolQueryBuilder.should(lostObjectName);
        boolQueryBuilder.should(lostDescribe);
        return ElasticUtil.searchByQueryBuilder("lost", boolQueryBuilder, new Lost(), true,
                "lostLocation",
                "lostObjectName",
                "objectType",
                "objectDetailType",
                "lostDescribe");
    }


    private void setCommonFieldExplore(BoolQueryBuilder boolQueryBuilder, String exploreContent) {
        boolQueryBuilder.should(ElasticUtil.getTermBuilder("objectType", exploreContent));
        boolQueryBuilder.should(ElasticUtil.getTermBuilder("objectDetailType", exploreContent));
    }
}
