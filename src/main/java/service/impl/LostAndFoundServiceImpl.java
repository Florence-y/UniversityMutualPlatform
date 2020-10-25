package service.impl;

import org.elasticsearch.index.query.QueryBuilders;
import pojo.Found;
import pojo.Lost;
import pojo.Page;
import pojo.Response;
import service.LostAndFoundService;
import util.ElasticUtil;
import util.ReflectUtil;
import util.WebUtil;

import java.io.IOException;
import java.util.Map;

/**
 * @author Florence
 * 失物招领服务类
 */
public class LostAndFoundServiceImpl implements LostAndFoundService {
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
        return WebUtil.jsonToObj(Lost.class, lost);
    }

    @Override
    public Found getFoundByTerm(String id) throws IOException {
        String found = ElasticUtil.getDocById("found", id);
        return WebUtil.jsonToObj(Found.class, found);
    }

    @Override
    public Page<Lost> getLostAll(String scrollId) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Lost());
        }
        return ElasticUtil.scrollSearchFirst("lost", QueryBuilders.matchAllQuery(), new Lost());
    }

    @Override
    public Page<Found> getFoundAll(String scrollId) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Found());
        }
        return ElasticUtil.scrollSearchFirst("found", QueryBuilders.matchAllQuery(), new Found());
    }

    @Override
    public Page<Lost> getLostByExplore(String scrollId, Map<String, Object> map) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Lost());
        }
        Map<String, Object> orMap = ReflectUtil.getFieldAndValueFromTheMixMap(map, new Lost());
        return ElasticUtil.scrollSearchFirst("lost", ElasticUtil.getMultiplyBoolBuilder("or", orMap, true), new Lost());
    }

    @Override
    public Page<Found> getFoundByExplore(String scrollId, Map<String, Object> map) throws IOException {
        if (scrollId != null) {
            return ElasticUtil.scrollSearch(scrollId, new Found());
        }
        Map<String, Object> andMap = ReflectUtil.getFieldAndValueFromTheMixMap(map, new Found());
        return ElasticUtil.scrollSearchFirst("found", ElasticUtil.getMultiplyBoolBuilder("or", andMap, true), new Found());
    }
}
