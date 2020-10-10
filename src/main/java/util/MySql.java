package util;

/**
 * @author Florence
 * Mysql通用建库建表类
 */

public enum MySql {
    //学生表
    CREATE_TABLE_STUDENT("CREATE TABLE IF NOT EXISTS t_student (" +
            "student_id INT PRIMARY KEY AUTO_INCREMENT," +
            "student_markNumber VARCHAR(20) NOT NULL UNIQUE," +
            "student_email VARCHAR(30) NOT NULL ," +
            "student_password VARCHAR(50) NOT NULL," +
            "student_level VARCHAR(10) NOT NULL," +
            "student_face VARCHAR(50) NOT NULL DEFAULT '../img/defaultStudentFace.jpg'," +
            "student_college VARCHAR(20) NOT NULL," +
            "student_sex VARCHAR(6) DEFAULT '男'," +
            "student_major VARCHAR(20) NOT NULL," +
            "student_userName VARCHAR(20) NOT NULL UNIQUE," +
            "student_area VARCHAR(20) NOT NULL" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //老师表
    CREATE_TABLE_TEACHER("CREATE TABLE IF NOT EXISTS t_teacher (" +
            "teacher_id INT PRIMARY KEY AUTO_INCREMENT," +
            "teacher_markNumber VARCHAR(20) NOT NULL UNIQUE," +
            "teacher_email VARCHAR(30) NOT NULL ," +
            "teacher_password VARCHAR(50) NOT NULL," +
            "teacher_graduateUniversity VARCHAR(10)," +
            "teacher_degree VARCHAR(10)," +
            "teacher_face VARCHAR(50) NOT NULL DEFAULT '../img/defaultTeacherFace.jpg'," +
            "teacher_college VARCHAR(20) NOT NULL," +
            "teacher_sex VARCHAR(6) DEFAULT '男'," +
            "teacher_area VARCHAR(10) NOT NULL," +
            "teacher_userName VARCHAR(20) NOT NULL UNIQUE" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立通知表
    CREATE_TABLE_INF("CREATE TABLE IF NOT EXISTS t_inf (" +
            "inf_id INT PRIMARY KEY AUTO_INCREMENT," +
            "inf_senderMarkNumber VARCHAR(20) NOT NULL," +
            "inf_receiverMarkNumber VARCHAR(20) NOT NULL," +
            "inf_content VARCHAR(50) NOT NULL ," +
            "inf_sendTime DATETIME NOT NULL," +
            "inf_senderFace VARCHAR(30) NOT NULL," +
            "inf_additionContent VARCHAR(50)," +
            "inf_type VARCHAR(15) NOT NULL," +
            "inf_senderName VARCHAR(20)," +
            "inf_isRead boolean NOT NULL DEFAULT 0" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立关注表
    CREATE_TABLE_ATTENTION("CREATE TABLE IF NOT EXISTS t_attention (" +
            "attention_id INT PRIMARY KEY AUTO_INCREMENT," +
            "attention_majorMarkNumber VARCHAR(20) NOT NULL  , " +
            "attention_passMarkNumber VARCHAR(20) NOT NULL," +
            "attention_isMutual boolean NOT NULL DEFAULT 0" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立学号用户类型联系表
    CREATE_TABLE_MARK_NUMBER_TYPE("CREATE TABLE IF NOT EXISTS t_markNumberType (" +
            "markNumberType_id INT PRIMARY KEY AUTO_INCREMENT," +
            "markNumberType_markNumber VARCHAR(20) NOT NULL UNIQUE," +
            "markNumber_userType VARCHAR(10) NOT NULL" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立回答表
    CREATE_TABLE_ANSWER("CREATE TABLE IF NOT EXISTS t_answer ("+
            "answer_id INT PRIMARY KEY AUTO_INCREMENT,"+
            "answer_questionId VARCHAR(50) NOT NULL,"+
            "answer_markNumber VARCHAR(20) NOT NULL,"+
            "answer_content VARCHAR(500) NOT NULL"+
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立评论表
    CREATE_TABLE_COMMENT("CREATE TABLE IF NOT EXISTS t_comment (" +
            "comment_id INT PRIMARY KEY AUTO_INCREMENT,"+
            "comment_answerId INT NOT NULL,"+
            "comment_content VARCHAR(500) NOT NULL ,"+
            "comment_markNumber VARCHAR(20) NOT NULL"+
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立问题点赞表
    CREATE_TABLE_QUESTION_AGREE("CREATE TABLE IF NOT EXISTS t_question_agree (" +
            "question_id VARCHAR(50) NOT NULL, "+
            "agreeMarkNumber VARCHAR(20) NOT NULL UNIQUE"+
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建立评论点赞表
    CREATE_TABLE_ANSWER_AGREE("CREATE TABLE IF NOT EXISTS t_answer_agree (" +
            "comment_id INT NOT NULL, "+
            "agreeMarkNumber VARCHAR(20) NOT NULL UNIQUE"+
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //文章表
    CREATE_TABLE_ARTICLE("CREATE TABLE IF NOT EXISTS articles  (" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(20) NOT NULL," +
            "content VARCHAR(1000) NOT NULL," +
            "author VARCHAR(50) NOT NULL" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //文章和分类的连接表
    CREATE_TABLE_SORT_LINK_ARTICLE("CREATE TABLE IF NOT EXISTS sortLinkArticle  (" +
            "articleId INT NOT NULL," +
            "sortId INT NOT NULL" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //分类表
    CREATE_TABLE_SORT("CREATE TABLE IF NOT EXISTS sort  (" +
            "id INT PRIMARY KEY AUTO_INCREMENT," +
            "name VARCHAR(50) NOT NULL" +
            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
//    //博客评论表
//    CREATE_TABLE_COMMENT("CREATE TABLE IF NOT EXISTS comment (" +
//            "id INT PRIMARY KEY AUTO_INCREMENT," +
//            "userName VARCHAR(20) NOT NULL," +
//            "content VARCHAR(100) NOT NULL," +
//            "commentDate DATE NOT NULL," +
//            "agreeCount INT DEFAULT 0," +
//            "articleId INT NOT NULL" +
//            ") CHARACTER SET utf8 COLLATE utf8_general_ci"),
    //建库语句
    CREATE_DATABASE("CREATE DATABASE IF NOT EXISTS University_Mutual_Platform DEFAULT CHARSET utf8 COLLATE utf8_general_ci"),
    //根据条件查询(模板)1:表名 2、3条件
    QUERY_ACTION("SELECT * FROM ? WHERE ? = ?"),
    //根据条件删除(模板) 1:表名 2、3条件
    DELETE_ACTION("DELETE FROM ? WHERE ? = ?"),
    //添加用户
    INSERT_USER("INSERT INTO users VALUES (?,?,?,?,?,?)"),
    //添加文章
    INSERT_ARTICLE("INSERT INTO articles VALUES(?,?,?,?)"),
    //添加关联关系
    INSERT_SORT_LINK_ARTICLE("INSERT INTO sortLinkArticle VALUES(?,?)"),
    //添加分类
    INSERT_SORT("INSERT INTO sort VALUES(?,?)"),
    //插入评论
    INSERT_COMMENT("INSERT INTO comment VALUES(?,?,?,?,?,?)"),
    //更新用户
    UPDATE_USER("UPDATE users SET password = ? , sex = ?, face=? WHERE account = ?"),
    //更新用户头像
    UPDATE_USER_FACE("UPDATE users SET face = ? WHERE account = ?"),
    //更新博客信息
    UPDATE_ARTICLE("UPDATE articles SET name = ?,content = ? WHERE id = ?"),
    //更新评论点赞
    UPDATE_COMMENT_AGREEMENT("UPDATE comment SET agreeCount = ? WHERE id = ?"),
    //查找分类id
    QUERY_TAG_ID("SELECT * FROM sort WHERE name = ?"),
    //根据id查询分类的值
    QUERY_TAG_VALUE("SELECT * FROM SORT WHERE id = ?"),
    //根据文章id查看他有什么分类(查出来的是id，得在根据id去分类表中查询具体的值)
    QUERY_TAG_BY_ARTICLE_ID("SELECT * FROM sortLinkArticle WHERE articleId =?"),
    //根据分类查找现在有多少篇该分类文章
    QUERY_ARTICLE_COUNT_BY_TAG("SELECT count(*) FROM sortLinkArticle WHERE sortId =?"),
    //查询当前总共有多少篇文章
    QUERY_ALL_ARTICLES_COUNT("SELECT count(*) FROM articles"),
    //根据用户名查找属于该用户的总文章数目
    QUERY_ARTICLE_COUNT_BY_USERNAME("SELECT count(*) FROM articles WHERE author=?"),
    //根据条件查询符合条件的总共有多少文章
    QUERY_SOME_ARTICLES_COUNT_BY_CONDITION("SELECT count(*) FROM articles WHERE name LIKE ? OR author LIKE ?"),
    //根据id查找文章信息
    QUERY_SOMETHING_BY_ID("SELECT * FROM articles WHERE id = ?"),
    //分页查询文章信息
    QUERY_ARTICLE_BY_PAGE("SELECT * FROM articles LIMIT ?,?"),
    //根据搜索条件查询具体文章信息并分页
    QUERY_ARTICLES_BY_PAGE_AND_CONDITION("SELECT * FROM articles WHERE name like ? OR author like ? LIMIT ?, ?"),
    //根据用户名查找属于该用户的文章并分页
    QUERY_ARTICLE_BY_PAGE_USERNAME("SELECT * FROM articles WHERE author = ? LIMIT ?,?"),
    //根据文章分类名查询属于该分类的文章id
    QUERY_ARTICLE_ID_BY_TAG("SELECT * FROM sortLinkArticle WHERE sortId = ?"),
    //查找用户信息(根据账号)
    QUERY_USER_INF_BY_ACCOUNT("SELECT * FROM users WHERE account = ?"),
    //查找用户信息(根据用户名)
    QUERY_USER_INF_BY_NAME("SELECT * FROM users WHERE name = ?"),
    //根据文章id查询评论
    QUERY_COMMENT_BY_ARTICLE_ID("SELECT * FROM comment WHERE articleId = ?"),
    //删除用户信息
    DELETE_USER("DELETE FROM users WHERE account = ?"),
    //删除文章
    DELETE_ARTICLE("DELETE FROM articles WHERE id= ?"),
    //删除文章分类
    DELETE_ARTICLE_SORT("DELETE FROM sortLinkArticle WHERE articleId = ?"),
    //根据文章id删除评论
    DELETE_COMMENTS_BY_ARTICLE_ID("DELETE FROM comment WHERE articleId= ?");

    /**
     *
     */
    private final String SQL;

    MySql(String SQL) {
        this.SQL = SQL;
    }

    @Override
    public String toString() {
        return SQL;
    }
}
