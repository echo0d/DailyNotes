/**
 * @author : xmsong
 * @date : 2023/7/29 17:50
 * @Description: 获取类对象
 */


public class GetClassName extends ClassLoader{

    public static void main(String[] args)  throws ClassNotFoundException {
//        1: forname()
        Class name1 = Class.forName("java.lang.Runtime");
        System.out.println(name1);
//        2: .class
        Class name2 = Runtime.class;
        System.out.println(name2);
//        3: getClass()
        Runtime rt = Runtime.getRuntime();
        Class name3 = rt.getClass();
        System.out.println(name3);
//        4: loadClass()
        Class name4 = ClassLoader.getSystemClassLoader().loadClass("java.lang.Runtime");
        System.out.println(name4);
        GetClassName TestClassLoader = new GetClassName();
        Class name5 = TestClassLoader.loadClass("java.lang.Runtime");
        System.out.println(name5);
        
    }
}
