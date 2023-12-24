/**
 * @author : xmsong
 * @date : 2023/7/30 10:30
 * @Description :
 */

import org.junit.jupiter.api.Test;

import java.lang.reflect.Method;
public class TestReflect {
    @Test
    public void testGetMethods(){
        Class<Child> childClass = Child.class;
        Method[] methods = childClass.getMethods();
        System.out.println("测试getMethods()");
        for (Method m:methods) {
            System.out.println(m.getName());
        }
        System.out.println("-----------------------");
    }
    @Test
    public void testGetDeclaredMethods(){
        Class<Child> childClass = Child.class;
        Method[] methods = childClass.getDeclaredMethods();
        System.out.println("测试getDeclaredMethods()");
        for (Method m:methods) {
            System.out.println(m.getName());
        }
        System.out.println("-----------------------");
    }


}
