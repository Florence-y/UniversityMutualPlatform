package commom.annontation;

import java.lang.annotation.*;

/**
 * @author Florence 标记是否有效的注解
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface IsValid {
    boolean valid();
    String fieldName();
}
