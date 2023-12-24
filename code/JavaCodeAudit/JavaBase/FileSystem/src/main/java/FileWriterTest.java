import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * @author : echo0d
 * @date : 2023/10/5 12:46
 * @Description :
 */
public class FileWriterTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\a.txt";
        File file = new File(dir);
//如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
//创建FileWriter对象
        FileWriter fileWriter = new FileWriter(file);
//向文件中写入内容
        fileWriter.write("the first way to write and read");
        fileWriter.flush();
        fileWriter.close();

//创建FileReader对象，读取文件中的内容
        FileReader fileReader = new FileReader(file);
        char[] ch = new char[(int) file.length()];
        fileReader.read(ch);
        for(char c:ch) {
            System.out.print(c);
        }
        System.out.println();
        fileReader.close();
    }
}
