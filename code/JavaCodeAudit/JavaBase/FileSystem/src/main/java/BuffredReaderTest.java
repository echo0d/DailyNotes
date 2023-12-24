import java.io.*;

/**
 * @author : echo0d
 * @date : 2023/10/5 13:30
 * @Description :
 */
public class BuffredReaderTest {
    public static void main(String[] args) throws IOException {
        String dir = "D:\\b.txt";
        File file = new File(dir);
//如果文件不存在，创建文件
        if (!file.exists())
            file.createNewFile();
//创建BufferedWriter对象并向文件写入内容
        BufferedWriter bw = new BufferedWriter(new FileWriter(file));
//向文件中写入内容
        bw.write("line1: the second way to write and read\n");
        bw.write("line2: the second way to write and read\n");
        bw.flush();
        bw.close();
//创建BufferedReader读取文件内容
        BufferedReader br = new BufferedReader(new FileReader(file));
        int i = 0;
        int readLine = 2;
        String line;
        while ((line=br.readLine())!=null) {
            i++;
            if(i <= readLine)
            {
                System.out.println(line);
            }
        }
        br.close();
    }
}
