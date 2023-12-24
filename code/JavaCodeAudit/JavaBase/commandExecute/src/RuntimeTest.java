import java.io.IOException;
import java.io.InputStream;

/**
 * @author : echo0d
 * @date : 2023/10/17 21:43
 * @Description :
 */
public class RuntimeTest {

    public static void test1() throws IOException {
        Runtime runtime = Runtime.getRuntime();
        runtime.exec(new String[]{"cmd", "/c", "calc", "&", "notepad"});
    }

    public static void test2() throws IOException{
        Runtime runtime = Runtime.getRuntime();
        runtime.exec("cmd /c calc & notepad");
    }

    public static void test3() throws IOException{
        Runtime runtime = Runtime.getRuntime();
        runtime.exec("cmd.exe /k calc & notepad");
    }

    public static void test4() throws IOException{
        Runtime runtime = Runtime.getRuntime();
        runtime.exec(new String[]{"cmd.exe", "/k", "calc", "&", "notepad"});
    }

    public static void test5() throws IOException, InterruptedException {
        Runtime runtime = Runtime.getRuntime();
        Process start = runtime.exec("ping www.baidu.com");
        start.waitFor();
        InputStream inputStream = start.getInputStream();
        byte[] res = new byte[1024];
        inputStream.read(res);
        System.out.println(new String(res, "GBK"));
    }

    public static void main(String[] args) throws IOException, InterruptedException {
//        test1();
//        test2();
//        test3();
//        test4();
        test5();
    }
}
