package pojo;

import java.util.List;

/**
 * @author Florence
 * 页面实体类
 */
public class Page<T> {
    public static final int PAGE_SIZE = 5;
    private boolean next;
    private int totalPage;
    private int nowPosition;
    private String scrollId;
    private List<T> dataList;

    public int getPAGE_SIZE() {
        return PAGE_SIZE;
    }

    public boolean isNext() {
        return next;
    }

    public void setNext(boolean next) {
        this.next = next;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getNowPosition() {
        return nowPosition;
    }

    public void setNowPosition(int nowPosition) {
        this.nowPosition = nowPosition;
    }

    public List<T> getDataList() {
        return dataList;
    }

    public void setDataList(List<T> dataList) {
        this.dataList = dataList;
    }

    public String getScrollId() {
        return scrollId;
    }

    public void setScrollId(String scrollId) {
        this.scrollId = scrollId;
    }

    @Override
    public String toString() {
        return "Page{" +
                "next=" + next +
                ", totalPage=" + totalPage +
                ", nowPosition=" + nowPosition +
                ", scrollId='" + scrollId + '\'' +
                ", dataList=" + dataList +
                '}';
    }
}
