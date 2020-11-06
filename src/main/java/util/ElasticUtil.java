package util;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHost;
import org.apache.lucene.search.join.ScoreMode;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.search.SearchScrollRequest;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.*;
import org.elasticsearch.cluster.metadata.MappingMetadata;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.text.Text;
import org.elasticsearch.common.unit.Fuzziness;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.*;
import org.elasticsearch.index.reindex.BulkByScrollResponse;
import org.elasticsearch.index.reindex.UpdateByQueryRequest;
import org.elasticsearch.script.Script;
import org.elasticsearch.script.ScriptType;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightBuilder;
import org.elasticsearch.search.fetch.subphase.highlight.HighlightField;
import pojo.IndexObject;
import pojo.Page;
import pojo.Response;

import java.io.IOException;
import java.util.*;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;

/**
 * @author Florence
 */
@Slf4j
public class ElasticUtil {
    public static final String WRONG = "sbsbsbsbsbsbbsbsbsbsbsb";
    static RestHighLevelClient client = getRestHighLevelClient();

    public static RestHighLevelClient getRestHighLevelClient() {
        return new RestHighLevelClient(
                RestClient.builder(new HttpHost("127.0.0.1", 9200, "http")));
    }

    /**
     * 多条件查询（and查询，只获取两者同时有的东西）
     *
     * @param mustMap 要查询的键值对
     * @param length  长度
     * @return 得到的结果
     */
    public static List<String> multiAndSearch(String index, Map<String, Object> mustMap, int length, boolean isFuzzy) {
        // 根据多个条件 生成 boolQueryBuilder
        BoolQueryBuilder boolQueryBuilder = (BoolQueryBuilder) getMultiplyBoolBuilder("and", mustMap, isFuzzy);
        // boolQueryBuilder生效
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQueryBuilder);
        searchSourceBuilder.size(length);
        // 其中listSearchResult是自己编写的方法，以供多中查询方式使用。
        return listSearchResult(index, searchSourceBuilder);
    }

    /**
     * 多条件查询
     *
     * @param mustMap 要查询的键值对
     * @param length  长度
     * @param isFuzzy 是否模糊查询
     * @return 得到的结果
     */
    public static List<String> multiOrSearch(String index, Map<String, Object> mustMap, int length, boolean isFuzzy) {
        // 根据多个条件 生成 boolQueryBuilder
        BoolQueryBuilder boolQueryBuilder = (BoolQueryBuilder) getMultiplyBoolBuilder("or", mustMap, isFuzzy);
        // boolQueryBuilder生效
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQueryBuilder);
        searchSourceBuilder.size(length);
        // 其中listSearchResult是自己编写的方法，以供多中查询方式使用。
        return listSearchResult(index, searchSourceBuilder);
    }

    /**
     * 用来处理搜索结果，转换成链表
     *
     * @param builder 得到的处理结果
     * @return 得到的结果
     */
    public static List<String> listSearchResult(String index, SearchSourceBuilder builder) {
        // 提交查询
        SearchRequest searchRequest = new SearchRequest(index);
        searchRequest.source(builder);
        RestHighLevelClient client = getRestHighLevelClient();
        // 获得response
        SearchResponse searchResponse = null;
        try {
            searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                client.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // 从response中获得结果
        List<String> list = new LinkedList<>();
        assert searchResponse != null;
        SearchHits hits = searchResponse.getHits();
        for (SearchHit next : hits) {
            System.out.println(next.getScore());
            list.add(next.getSourceAsString());
        }
        return list;
    }

    private static <T extends IndexObject> List<T> getPojoFromHits(SearchHits hits, T clazz, boolean isHighlight) throws IOException {
        List<T> list = new LinkedList<>();
        T t;
        for (SearchHit hit : hits) {
            if (!isHighlight) {
                t = (T) WebUtil.jsonToObj(clazz.getClass(), hit.getSourceAsString());
            } else {
                Map<String, HighlightField> highlightFields = hit.getHighlightFields();
                Map<String, Object> sourceAsMap = hit.getSourceAsMap();
                if (highlightFields != null) {
                    for (Map.Entry<String, HighlightField> entry : highlightFields.entrySet()) {
                        String fieldName = entry.getKey();
                        HighlightField value = entry.getValue();
                        Text[] fragments = value.fragments();
                        String newFieldsValue = "";
                        for (Text text : fragments) {
                            newFieldsValue += text;
                        }
                        sourceAsMap.put(fieldName, newFieldsValue);
                    }
                }
                t = (T) WebUtil.mapToObj(sourceAsMap, clazz.getClass());
            }
            t.setId(hit.getId());
            list.add(t);
        }
        return list;
    }


    public static NestedQueryBuilder getNestedQuery(String path, String detailPro, String value) {
        NestedQueryBuilder nestedQueryBuilder = QueryBuilders.nestedQuery(path,
                getMatchBuilder(path + "." + detailPro, value),
                ScoreMode.Max);
        return nestedQueryBuilder;
    }

    /**
     * 单条件查询
     *
     * @param key     键
     * @param value   值
     * @param length  要的数量
     * @param isFuzzy 是否模糊查询
     * @return 查询到的列表
     */
    public static List<String> simpleSearch(String index, String key, Object value, int length, Boolean isFuzzy) {
        // 使用上面已经编写好的方法
        Map<String, Object> map = new HashMap<>(6);
        map.put(key, value);
        return multiAndSearch(index, map, length, isFuzzy);
    }

    public static <T extends IndexObject> Page<T> scrollSearch(String scrollId, T pojo) throws IOException {
        Page<T> page = new Page<>();
        SearchScrollRequest scrollRequest = new SearchScrollRequest(scrollId);
        scrollRequest.scroll(TimeValue.timeValueMinutes(60));
        SearchResponse searchScrollResponse = client.scroll(scrollRequest, RequestOptions.DEFAULT);
        setScrollPage(searchScrollResponse, page, pojo, true);
        return page;
    }

    public static <T extends IndexObject> Page<T> searchByQueryBuilder(String index,QueryBuilder queryBuilder,T pojo,boolean isHighlight,String... values) throws IOException {
        Page<T> page = new Page<>();
        SearchRequest searchRequest = new SearchRequest(index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(queryBuilder);
        searchSourceBuilder.size(Page.PAGE_SIZE);
        searchRequest.source(searchSourceBuilder);
        if (isHighlight) {
            HighlightBuilder highlightBuilder = new HighlightBuilder();
            for (String val : values) {
                HighlightBuilder.Field highlightTitle = new HighlightBuilder.Field(val);
                highlightBuilder.field(highlightTitle);
            }
            highlightBuilder.preTags("<em style='color:#000; font-size:23px'>");
            highlightBuilder.postTags("</em>");
            searchSourceBuilder.highlighter(highlightBuilder);
        }
        SearchResponse searchResponse =client.search(searchRequest,RequestOptions.DEFAULT);
        setCommonPage(searchResponse,page,pojo,isHighlight);
        return page;
    }

    private static <T extends IndexObject> void setCommonPage(SearchResponse searchResponse, Page<T> page, T pojo, boolean isHighlight) throws IOException {
        SearchHits hits = searchResponse.getHits();
        List<T> pojoFromHits = getPojoFromHits(hits, pojo, isHighlight);
        page.setDataList(pojoFromHits);
        page.setNext(hasNext(hits.getHits().length));
    }


    public static <T extends IndexObject> Page<T> scrollSearchFirst(String index, QueryBuilder queryBuilder, T pojo, boolean isHighlight, String... values) throws IOException {
        Page<T> page = new Page<>();
        SearchRequest searchRequest = new SearchRequest(index);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(queryBuilder);
        searchSourceBuilder.size(Page.PAGE_SIZE);
        searchRequest.source(searchSourceBuilder);
        searchRequest.scroll(TimeValue.timeValueMinutes(1));
        if (isHighlight) {
            HighlightBuilder highlightBuilder = new HighlightBuilder();
            for (String val : values) {
                HighlightBuilder.Field highlightTitle = new HighlightBuilder.Field(val);
                highlightBuilder.field(highlightTitle);
            }
            highlightBuilder.preTags("<em style='color:#000; font-size:23px'>");
            highlightBuilder.postTags("</em>");
            searchSourceBuilder.highlighter(highlightBuilder);
        }
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        //设置分页信息
        setScrollPage(searchResponse, page, pojo, isHighlight);
        return page;
    }

    private static boolean hasNext(int length) {
        return length >= Page.PAGE_SIZE;
    }

    private static <T extends IndexObject> List<String> setScrollPage(SearchResponse searchResponse, Page<T> page, T pojo, boolean isHighlight) throws IOException {
        SearchHits hits = searchResponse.getHits();
        List<T> pojoFromHits = getPojoFromHits(hits, pojo, isHighlight);
        List<String> idStrings = getIdFromHits(hits);
        page.setDataList(pojoFromHits);
        page.setNext(hasNext(hits.getHits().length));
        page.setScrollId(searchResponse.getScrollId());
        return idStrings;
    }

    private static List<String> getIdFromHits(SearchHits hits) {
        List<String> list = new LinkedList<>();
        for (SearchHit hit : hits) {
            list.add(hit.getId());
        }
        return list;
    }
//    public static QueryBuilder getQueryBuilder(String type,Map<String,Object> condition){
//
//    }

    /**
     * 根据时间段去查询
     *
     * @param length 查询的数量
     * @return 返回得到的结果
     */
    public static List<String> searchByDate(String index, String fieldName, Date from, Date to, int length) {
        // 生成builder
        RangeQueryBuilder rangeQueryBuilder =
                QueryBuilders.rangeQuery(fieldName).from(from).to(to);
        /// boolQueryBuilder生效
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(rangeQueryBuilder);
        searchSourceBuilder.size(length);
        return listSearchResult(index, searchSourceBuilder);
    }

    /**
     * 获取时间范围对象
     *
     * @param from
     * @param to
     * @return
     */
    public static QueryBuilder getDataRangeBuilder(String fieldName, Date from, Date to) {
        return QueryBuilders.rangeQuery(fieldName).from(from).to(to);
    }

    /**
     * 删除es的整个数据库
     *
     * @param indexName 索引名字
     * @return 返回删除的结果
     * @throws IOException io异常
     */
    public static boolean deleteIndex(String indexName) throws IOException {
        RestHighLevelClient client = getRestHighLevelClient();
        DeleteIndexRequest request =
                new DeleteIndexRequest(indexName);
        client.indices().delete(request, RequestOptions.DEFAULT);
        return true;
    }

    /**
     * 前缀查询 前面一定是固定的
     *
     * @param key    键
     * @param prefix 要查询的
     * @param size   数量
     * @return 查询结果
     */
    public static List<String> prefix(String index, String key, String prefix, int size) {
        PrefixQueryBuilder builder = QueryBuilders.prefixQuery(key, prefix);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.size(size);
        searchSourceBuilder.query(builder);
        return listSearchResult(index, searchSourceBuilder);
    }

    /**
     * 分词api
     *
     * @param keyWord 关键词
     * @return 分词列表
     * @throws IOException 在进行analyze的时候会出现异常
     */
    public static List<String> divideTheKeyWord(String keyWord) throws IOException {
        List<String> list = new LinkedList<>();
        client = getRestHighLevelClient();
        AnalyzeRequest request = AnalyzeRequest.withGlobalAnalyzer("ik_smart", keyWord);
        AnalyzeResponse response = client.indices().analyze(request, RequestOptions.DEFAULT);
        for (AnalyzeResponse.AnalyzeToken token : response.getTokens()) {
            String word = token.getTerm();
            if (word.length() < 2 || word.contains("的") || word.contains("了") || word.contains("你") || word.contains("我") || word.contains("是") || word.length() > 8) {
                continue;
            }
            list.add(token.getTerm());
        }
        return list;
    }

    /**
     * 批量更新，先搜索然后更新
     *
     * @param index        索引
     * @param queryBuilder 搜索builder
     * @param code         脚本代码
     * @return 目前这个值没有意义
     * @throws IOException 进行请求的时候会出现异常
     */
    public static String updateDoc(String index, QueryBuilder queryBuilder, String code) throws IOException {
        UpdateByQueryRequest request = new UpdateByQueryRequest(index);
        request.setQuery(queryBuilder);
        request.setConflicts("proceed");
        //设置更新逻辑 code example  = ”if (ctx._source.user == 'kimchy') {ctx._source.likes++;}“
        request.setScript(new Script(ScriptType.INLINE, "painless", code, Collections.<String, Object>emptyMap()));
        //更新
        BulkByScrollResponse bulkResponse = client.updateByQuery(request, RequestOptions.DEFAULT);
        //注意这里不是有效信息
        return bulkResponse.getReasonCancelled();
    }

    /**
     * 根据id更新数据
     *
     * @param index   索引
     * @param id      id
     * @param dataMap 数据键值对
     * @return 调用的索引
     */
    public static int updateDocById(String index, String id, Map<String, Object> dataMap) {
        try {
            //设置要更新的键值对
            UpdateRequest request = new UpdateRequest(index, id).doc(dataMap);
            //进行更新
            UpdateResponse updateResponse = client.update(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            log.error("索引更新异常 {}", e.getMessage());
            e.printStackTrace();
            return Response.ERROR;
        }
        return Response.OK;
    }

    /**
     * 删除文档
     *
     * @param index 索引
     * @param id    文档id
     * @return 状态码
     */
    public static int deleteDocById(String index, String id) {
        try {
            DeleteRequest request = new DeleteRequest(index, id);
            DeleteResponse deleteResponse = client.delete(request, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
            log.error("删除索引出现异常 {}", e.getMessage());
            return Response.ERROR;
        }
        return Response.OK;
    }

    /**
     * 添加文档
     *
     * @param docMap    文档map
     * @param indexName 索引的名字
     * @return 返回的字符串
     */
    public static String addDoc(Map<String, Object> docMap, String indexName) {
        IndexResponse indexResponse;
        try {
            //添加map数据
            IndexRequest indexRequest = new IndexRequest(indexName).source(docMap);
            //索引
            indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
            log.error("添加文档出现异常 {}", e.getMessage());
            return WRONG;
        }
        return indexResponse.getId();
    }

    public static String addDoc(String json, String indexName) {
        IndexResponse indexResponse;
        try {
            //添加map数据
            IndexRequest indexRequest = new IndexRequest(indexName).source(json, XContentType.JSON);
            //索引
            indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
            log.error("添加文档出现异常 {}", e.getMessage());
            return WRONG;
        }
        return indexResponse.getId();
    }

    /**
     * 根据id获取文档
     *
     * @param index 索引
     * @param id    id
     * @return 返回json数据
     * @throws IOException 读取异常
     */
    public static String getDocById(String index, String id) throws IOException {
        GetRequest getRequest = new GetRequest(index, id);
        GetResponse getResponse = client.get(getRequest, RequestOptions.DEFAULT);
        if (getResponse.isExists()) {
            return getResponse.getSourceAsString();
        }
        return "505:fail";
    }

    public static QueryBuilder getMatchBuilder(String wantToSearch, String value) {
        return QueryBuilders.matchQuery(wantToSearch, value);
    }

    public static QueryBuilder getTermBuilder(String wantToSearch, String value) {
        return QueryBuilders.termQuery(wantToSearch, value);
    }

    /**
     * 获取多重布尔值的builder
     *
     * @param type     and or
     * @param matchMap 条件map
     * @param isFuzzy  是否模糊查询
     * @return
     */
    public static QueryBuilder getMultiplyBoolBuilder(String type, Map<String, Object> matchMap, Boolean isFuzzy) {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        // 循环添加多个条件
        if ("or".equals(type)) {
            for (Map.Entry<String, Object> entry : matchMap.entrySet()) {
                MatchQueryBuilder matchQueryBuilder = matchQuery(entry.getKey(), entry.getValue());
                matchQueryBuilder = isFuzzy ? matchQueryBuilder.fuzziness(Fuzziness.AUTO).prefixLength(3).maxExpansions(10) : matchQueryBuilder;
                //or
                boolQueryBuilder.should(matchQueryBuilder);
            }
        } else if ("and".equals(type)) {
            // 循环添加多个条件
            for (Map.Entry<String, Object> entry : matchMap.entrySet()) {
                MatchQueryBuilder matchQueryBuilder = matchQuery(entry.getKey(), entry.getValue());
                matchQueryBuilder = isFuzzy ? matchQueryBuilder.fuzziness(Fuzziness.AUTO).prefixLength(3).maxExpansions(10) : matchQueryBuilder;
                //and
                boolQueryBuilder.must(matchQueryBuilder);
            }
        }
        return boolQueryBuilder;
    }

    /**
     * term多条件查询
     *
     * @param type
     * @param termMap
     * @return
     */
    public static QueryBuilder getMultiplyBoolBuilder(String type, Map<String, Object> termMap) {
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
        if ("or".equals(type)) {
            for (Map.Entry<String, Object> entry : termMap.entrySet()) {
                TermQueryBuilder termQueryBuilder = new TermQueryBuilder(entry.getKey(), entry.getValue());
                boolQueryBuilder.should(termQueryBuilder);
            }
        } else if ("and".equals(type)) {
            for (Map.Entry<String, Object> entry : termMap.entrySet()) {
                TermQueryBuilder termQueryBuilder = new TermQueryBuilder(entry.getKey(), entry.getValue());
                boolQueryBuilder.must(termQueryBuilder);
            }
        }
        return boolQueryBuilder;
    }

    /**********************************************************************************************************/

    public static void addIndex() throws IOException {
        client = getRestHighLevelClient();
        CreateIndexRequest request = new CreateIndexRequest("test");
        //建立setting
        request.settings(Settings.builder()
                .put("index.number_of_shards", 3)
                .put("index.number_of_replicas", 2)
        );
        //建立mapping
        XContentBuilder builder = XContentFactory.jsonBuilder();
        builder.startObject();
        {
            builder.startObject("properties");
            {
                builder.startObject("message");
                {
                    builder.field("type", "text");
                }
                builder.endObject();
                builder.startObject("userName");
                {
                    builder.field("type", "keyword");
                }
                builder.endObject();
                builder.startObject("sex");
                {
                    builder.field("type", "text");
                }
                builder.endObject();
                builder.startObject("content");
                {
                    builder.field("type", "text");
                }
                builder.endObject();
            }
            builder.endObject();
        }
        builder.endObject();
        //添加mapping
        request.mapping(builder);
        //生成反应
        CreateIndexResponse createIndexResponse = client.indices().create(request, RequestOptions.DEFAULT);
        System.out.println(createIndexResponse.isAcknowledged());
    }

    public static Map<String, Object> getMappings(String indexName) throws IOException {
        GetMappingsRequest request = new GetMappingsRequest();
        request.indices(indexName);
        GetMappingsResponse getMappingResponse = client.indices().getMapping(request, RequestOptions.DEFAULT);
        Map<String, MappingMetadata> mappings = getMappingResponse.mappings();
        MappingMetadata mappingMetadata = mappings.get(indexName);
        System.out.println(mappingMetadata.getSourceAsMap());
        return mappingMetadata.getSourceAsMap();
    }


}
