package org.example;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author : xmsong
 * @date : 2023/8/31 22:20
 * @Description :
 */
public class DemoClassLoader extends ClassLoader {
    private byte[] bytes ;
    private String name = "";
    public static void main(String[] args) throws Exception {
        String clzzName = "org.example.Hello";
        byte[] testBytes = new byte[]{
                -54, -2, -70, -66, 0, 0, 0, 52, 0, 28, 10, 0, 6, 0, 14, 9, 0, 15, 0, 16, 8, 0, 17, 10, 0, 18, 0, 19, 7,
                0, 20, 7, 0, 21, 1, 0, 6, 60, 105, 110, 105, 116, 62, 1, 0,3, 40,
                //省略
        };
        DemoClassLoader demo =  new DemoClassLoader(clzzName,testBytes);
        Class clazz = demo.loadClass(clzzName);
        Constructor constructor = clazz.getConstructor();
        Object obj = constructor.newInstance();
        Method method = clazz.getMethod("sayHello");
        method.invoke(obj);
    }
    public DemoClassLoader(String name, byte[] bytes){
        this.name = name;
        this.bytes = bytes;
    }
    @Override
    protected Class<?> findClass(String name) throws ClassNotFoundException {
        if(name.equals(this.name)) {
            defineClass(name, bytes, 0, bytes.length);
        }
        return super.findClass(name);
    }
}
