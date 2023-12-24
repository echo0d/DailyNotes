import java.io.*;

/**
 * @author : echo0d
 * @date : 2023/10/5 13:52
 * @Description :
 */
public class FileInputStreamTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\c.txt";
        File file = new File(dir);
        //如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
        //创建FileOutputStream对象，写入内容
        FileOutputStream fos = new FileOutputStream(file);
        //向文件中写入内容
        fos.write("the third way to write and read".getBytes());
        fos.close();

        //创建FileInputStream对象，读取文件内容
        FileInputStream fis = new FileInputStream(file);
        // 定义每次输入流读取到的字节数对象
        int a = 0;
        // 定义缓冲区大小
        byte[] bytes = new byte[1024];
        // 创建二进制输出流对象
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        // 循环读取文件内容
        while ((a = fis.read(bytes)) != -1) {
            // 截取缓冲区数组中的内容，(bytes, 0, a)其中的0表示从bytes数组的
            // 下标0开始截取，a表示输入流read到的字节数。
            out.write(bytes, 0, a);
        }
        System.out.println(out.toString());
        fis.close();
    }
}
