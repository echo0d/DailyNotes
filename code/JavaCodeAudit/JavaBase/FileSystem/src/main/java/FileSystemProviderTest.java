import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author : echo0d
 * @date : 2023/10/5 14:29
 * @Description :
 */
public class FileSystemProviderTest {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("D:\\e.txt");
        // 定义待写入文件内容
        String content = "the fifth way to write and read";
        // 写入内容二进制到文件
        Files.write(path, content.getBytes());
        // 开始读文件
        byte[] bytes = Files.readAllBytes(path);
        System.out.println(new String(bytes));
    }
}
