/**
 * @author : xmsong
 * @date : 2023/7/29 18:55
 * @Description : 获取类方法
 */

import java.lang.reflect.Method;

public class GetClassMethod {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {
        Class name = Class.forName("java.lang.Runtime");
//        1. getDeclaredMethods()
        Method[] declaredMethods = name.getDeclaredMethods();
        System.out.println("getDeclaredMethods()方法获取类方法：");
        for (Method m:declaredMethods)
            System.out.println(m);
//        2. getMethods()
        Method[] methods = name.getMethods();
        System.out.println("getMethods()获取类方法：");
        for (Method m:methods)
            System.out.println(m);
//        3. getMethod()
        Method method = name.getMethod("exec", String.class);
        System.out.println("getMethod()获取exec方法");
        System.out.println(method);
//        4. getDeclaredMethod
        Method declaredMethod = name.getDeclaredMethod("exec",String.class);
        System.out.println("getDeclaredMethod()获取exec方法");
        System.out.println(declaredMethod);
    }

}
