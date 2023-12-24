import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : echo0d
 * @date : 2023/10/17 22:12
 * @Description :
 */
public class ProcessBuilderTest {
    public static void main(String[] args) throws IOException {
        List<String> cmd = new ArrayList<>();
        cmd.add("python");
        cmd.add("D:/test.py");
        ProcessBuilder pb = new ProcessBuilder(cmd);
        // 合并 错误流和标准流
        pb.redirectErrorStream(true);
        Process process = pb.start();
        printResults(process);
    }
    public static void printResults(Process process) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(),"GBK"));
        String line = "";
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
}


