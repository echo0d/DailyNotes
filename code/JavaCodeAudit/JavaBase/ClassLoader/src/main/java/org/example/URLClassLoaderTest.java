package org.example;

/**
 * @author : xmsong
 * @date : 2023/9/7 22:39
 * @Description :
 */
import java.io.File;
import java.net.URI;
import java.net.URL;
import java.net.URLClassLoader;



public class URLClassLoaderTest {
    public static void main(String[] args) throws Exception {
//        案例1：加载磁盘上的类
        File file = new File("d:/");
        URI uri = file.toURI();
        URL url1 = uri.toURL();
        URLClassLoader urlClassLoader1 = new URLClassLoader(new URL[]{url1});
        System.out.println(urlClassLoader1.getParent());
        Class loadClassDog1 = urlClassLoader1.loadClass("org.example.Dog");
        loadClassDog1.newInstance();

//        案例2：加载网络上的类
        URL url2 = new URL("http://localhost:8080/examples/");
        URLClassLoader urlClassLoader2 = new URLClassLoader(new URL[]{url2});
        System.out.println(urlClassLoader2.getParent());
        Class loadClassDog2 = urlClassLoader2.loadClass("org.example.Dog");
        loadClassDog2.newInstance();
    }
}