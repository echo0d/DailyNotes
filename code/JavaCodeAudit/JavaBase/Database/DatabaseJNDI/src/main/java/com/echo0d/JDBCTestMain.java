/**
 * @author : echo0d
 * @date : 2023/12/31 11:41
 * @Description :
 */
import java.sql.*;

public class JDBCTestMain {
    public static void main(String[] args) {

        final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
        final String DB_URL = "jdbc:mysql://localhost/CodeAudit";
        final String USER = "root";
        final String PASS = "123456";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try {
            Class.forName(JDBC_DRIVER); //注册驱动，Class.forName("数据库驱动的类名")。
//            Driver driver = new com.mysql.jdbc.Driver(); //实例化com.mysql.jdbc.Driver，类加载即会执行静态代码块
//            DriverManager.registerDriver(new com.mysql.jdbc.Driver()); //使用 `DriverManager` 类的 `registerDriver` 方法来实例化驱动程序：
            System.out.println("Connecting to database...");
            connection = DriverManager.getConnection(DB_URL, USER, PASS); //获取连接，DriverManager.getConnection(xxx)。
            System.out.println("Creating statement...");
            statement = connection.createStatement(); //操作Connection，打开Statement对象。
            String sql;
            sql = "SELECT * from users";
            resultSet = statement.executeQuery(sql); //通过Statement执行SQL语句，返回结果放到ResultSet对象。
            while (resultSet.next()) {
                // 下面使用ResultSet读取数据。
                int PKey = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String phone = resultSet.getString("phone");
                System.out.print("PKey: " + PKey);
                System.out.print(", name: " + name);
                System.out.print(", phone: " + phone);
                System.out.println("\n");
            }
        } catch (SQLException se) {
            se.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭数据库相关的资源
            close(resultSet);
            close(statement);
            close(connection);
        }
    }

    public static void close(AutoCloseable autoCloseable) {
        if (autoCloseable != null) {
            try {
                autoCloseable.close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}