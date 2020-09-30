package util;

import org.apache.http.HttpHost;
import org.elasticsearch.action.admin.indices.delete.DeleteIndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.PrefixQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.RangeQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;

import java.io.IOException;
import java.util.*;

public class ElasticUtil {
    public static RestHighLevelClient getRestHighLevelClient() {
        return new RestHighLevelClient(
                RestClient.builder(new HttpHost("127.0.0.1", 9200, "http")));
    }
    /**
     * 多条件查询
     * @param mustMap 要查询的键值对
     * @param length 长度
     * @return 得到的结果
     */
    public static List<String> multiSearch(Map<String,Object> mustMap, int length) {
        // 根据多个条件 生成 boolQueryBuilder
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();

        // 循环添加多个条件
        for (Map.Entry<String, Object> entry : mustMap.entrySet()) {
            boolQueryBuilder.must(QueryBuilders
                    .matchQuery(entry.getKey(), entry.getValue()));
        }

        // boolQueryBuilder生效
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(boolQueryBuilder);
        searchSourceBuilder.size(length);

        // 其中listSearchResult是自己编写的方法，以供多中查询方式使用。
        return listSearchResult(searchSourceBuilder);
    }
    /**
     * 用来处理搜索结果，转换成链表
     * @param builder 得到的处理结果
     * @return 得到的结果
     */
    public static List<String> listSearchResult(SearchSourceBuilder builder) {
        // 提交查询
        SearchRequest searchRequest = new SearchRequest();
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
            list.add(next.getSourceAsString());
        }
        return list;
    }
    public static List<String> simpleSearch(String key,Object value,int length) {
        // 使用上面已经编写好的方法
        Map<String,Object> map = new HashMap<>(6);
        map.put(key,value);
        return multiSearch(map,length);
    }
    /**
     * 根据时间段去查询
     * @param length 查询的数量
     * @return 返回得到的结果
     */
    public static List<String> searchByDate(Date from, Date to, int length) {
        // 生成builder
        RangeQueryBuilder rangeQueryBuilder =
                QueryBuilders.rangeQuery("date").from(from).to(to);

        /// boolQueryBuilder生效
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(rangeQueryBuilder);
        searchSourceBuilder.size(length);
        return listSearchResult(searchSourceBuilder);
    }
    /**
     * 删除es的整个数据库
     * @param indexName 索引名字
     * @return 返回删除的结果
     * @throws IOException io异常
     */
    public static boolean delete(String indexName) throws IOException {
        RestHighLevelClient client = getRestHighLevelClient();
        DeleteIndexRequest request =
                new DeleteIndexRequest(indexName);
        client.indices().delete(request, RequestOptions.DEFAULT);
        return true;
    }
    /**
     * 后文段模糊查找方法，可以理解为 like value?
     * @param key 键
     * @param prefix 要查询的
     * @param size 数量
     * @return 查询结果
     */
    public static List<String> fuzzy(String key, String prefix,int size) {
        PrefixQueryBuilder builder = QueryBuilders.prefixQuery(key, prefix);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.size(size);
        searchSourceBuilder.query(builder);
        return listSearchResult(searchSourceBuilder);
    }
}
