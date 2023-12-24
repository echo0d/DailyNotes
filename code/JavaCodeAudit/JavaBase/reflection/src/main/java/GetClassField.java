import java.lang.reflect.Field;

/**
 * @author : xmsong
 * @date : 2023/8/1 21:30
 * @Description : 获取类成员变量
 */
public class GetClassField {
    public static void main(String[] args) throws NoSuchFieldException {
        Student student = new Student();
        Class name = student.getClass();

        // 实例化类对象后开始获取类成员变量
        Field[] declaredFields = name.getDeclaredFields();
        System.out.println("通过getDeclaredFields()获取成员变量");
        for(Field m:declaredFields)
            System.out.println(m);
        System.out.println("---------------");
        Field[] fields = name.getFields();
        System.out.println("通过getFields()获取成员变量");
        for(Field m:fields)
            System.out.println(m);
        System.out.println("---------------");
        Field declaredField = name.getDeclaredField("name");
        System.out.println("通过getFields()获取成员变量");
        System.out.println(declaredField);
    }
}
