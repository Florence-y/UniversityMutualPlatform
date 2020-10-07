package pojo;

import java.util.List;

/**
 * @author Florence
 * 页面实体类
 */
public class Page<T> {
    public static final int PAGE_SIZE = 5;
    private boolean last;
    private boolean next;
    private int totalPage;
    private int nowPosition;
    private List<T> dataList;

    public int getPAGE_SIZE() {
        return PAGE_SIZE;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
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
}
