package controller;

import commom.constantval.ServletConstantVal;
import dao.InfDao;
import dao.MarkNumberTypeDao;
import dao.StudentDao;
import dao.TeacherDao;
import dao.impl.InfDaoImpl;
import dao.impl.MarkNumberTypeDaoImpl;
import dao.impl.StudentDaoImpl;
import dao.impl.TeacherDaoImpl;
import pojo.Inf;
import pojo.Student;
import pojo.Teacher;
import util.TimeUtil;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author DELL
 */
@ServerEndpoint("/WebSocket/{markNumber}/{wantToSendMarkNumber}")
public class ChatServer {
    private static final Map<String, ChatServer> CLIENTS = new ConcurrentHashMap<>();
    private static InfDao infDao = new InfDaoImpl();
    MarkNumberTypeDao markNumberTypeDao = new MarkNumberTypeDaoImpl();
    StudentDao studentDao = new StudentDaoImpl();
    TeacherDao teacherDao = new TeacherDaoImpl();
    Student student;
    Teacher teacher;
    String userType;
    String name;
    /**
     * 与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    private Session session;

    public static synchronized int getOnlineCount() {
        return CLIENTS.size();
    }

    /**
     * 连接建立成功调用的方法
     *
     * @param session 可选的参数。session为与某个客户端的连接会话，需要通过它来给客户端发送数据
     */
    @OnOpen
    public void onOpen(@PathParam(value = "markNumber") String markNumber, Session session) {
        name = markNumber;
        System.out.println(markNumber);
        this.session = session;
        //加入map中
        CLIENTS.put(markNumber, this);
        System.out.println(markNumber + "连接加入！当前在线人数为" + getOnlineCount());
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose(@PathParam(value = "markNumber") String markNumber) {
        CLIENTS.remove(markNumber);
        System.out.println(markNumber + "关闭连接！当前在线人数为" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息
     * @param session 可选的参数
     */
    @OnMessage
    public void onMessage(@PathParam(value = "markNumber") String markNumber, @PathParam(value = "wantToSendMarkNumber") String wantToSendMarkNumber, String message, Session session) {
        System.out.println("来自客户端" + markNumber + "发送给" + wantToSendMarkNumber + "的消息:" + message);
        Map<String, Object> map = new HashMap<>(10);
        String name= getUserName(markNumber);
        String face=getUserFace(markNumber);
        map.put("senderFace",face);
        map.put("senderName",name);
        fillMapInf(map, markNumber, wantToSendMarkNumber, message);
        infDao.insertRowByKeyAndValue(new Inf(), map);
        for (Map.Entry<String, ChatServer> entry : CLIENTS.entrySet()) {
            //没找到合适的
            if (!entry.getKey().equals(wantToSendMarkNumber)) {
                continue;
            }
            ChatServer item = entry.getValue();
            try {
                item.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String getUserFace(String markNumber) {
        String type=markNumberTypeDao.getUserType(markNumber);
        Teacher teacher;
        Student student;
        if ("teacher".equals(type)){
            teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL,markNumber);
            return teacher.getFace();
        }
        else if ("student".equals(type)){
            student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL,markNumber);
            return student.getFace();
        }
        return "505.fail";
    }

    private String getUserName(String markNumber) {
        String type=markNumberTypeDao.getUserType(markNumber);
        Teacher teacher;
        Student student;
        if ("teacher".equals(type)){
             teacher = teacherDao.getTeacherByCondition(ServletConstantVal.TEACHER_MARK_NUMBER_COL,markNumber);
             return teacher.getUserName();
        }
        else if ("student".equals(type)){
            student = studentDao.getStudentByCondition(ServletConstantVal.STUDENT_MARK_NUMBER_COL,markNumber);
            return student.getUserName();
        }
        return "505.fail";
    }

    private void fillMapInf(Map<String, Object> map, String markNumber, String wantToSendMarkNumber, String message) {
        map.put("senderMarkNumber", markNumber);
        map.put("receiverMarkNumber", wantToSendMarkNumber);
        map.put("content", message);
        map.put("type", "chat");
        map.put("sendTime", TimeUtil.getSystemTimeStamp());
    }

    /**
     * 发生错误时调用
     *
     * @param session 会话信息用来跟客户端交互
     * @param error   错误异常
     */
    @OnError
    public void onError(@PathParam(value = "markNumber") String markNumber, Session session, Throwable error) {
        System.out.println(markNumber + "发生错误");
        error.printStackTrace();
    }

    /**
     * 这个方法与上面几个方法不一样。没有用注解，是根据自己需要添加的方法。
     *
     * @param message 我们要发送的信息
     * @throws IOException 发送异常
     */
    public void sendMessage(String message) throws IOException {

        //this.session.getBasicRemote().sendText(message);   //异步发送信息


        this.session.getAsyncRemote().sendText(message);
    }
}
