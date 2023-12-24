package org.example;

/**
 * @author : xmsong
 * @date : 2023/9/7 21:54
 * @Description :
 */
public class Dog {
    static {
        System.out.println("静态代码块执行");
    }

    {
        System.out.println("代码块执行");
    }

    public Dog() {
        System.out.println("构造方法执行");
    }
}
