package serviceTest;

import org.junit.Test;
import service.AnswerService;
import service.impl.AnswerServiceImpl;

public class AnswerServiceTest {
    @Test
    public void getAnswerCount(){
        AnswerService answerService = new AnswerServiceImpl();
        int muT6gXUBmkU2kBkBB8Vv = answerService.getQuestionAnswerCount("muT6gXUBmkU2kBkBB8Vv");
        System.out.println(muT6gXUBmkU2kBkBB8Vv);
    }
}
