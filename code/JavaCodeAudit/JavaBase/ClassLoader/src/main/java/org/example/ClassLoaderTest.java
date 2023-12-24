package org.example;
import org.example.Dog;
/**
 * @author : xmsong
 * @date : 2023/9/7 21:54
 * @Description :
 */

public class ClassLoaderTest {
    public static void main(String[] args) throws ClassNotFoundException {
        System.out.println("Class.forName:");
        Class.forName("org.example.Dog");
        System.out.println("\nloadClass:");
        ClassLoader.getSystemClassLoader().loadClass("org.example.Dog");
    }
}
