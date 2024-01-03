import lombok.Data;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.junit.jupiter.api.Test;

@Data
public class User {
    private Integer id;
    private String username;
    private String password;
    @Test
    public void testInsert() {
        // 创建hibernate核心配置文件对象
        Configuration cfg = new Configuration().configure();
        // 创建能够构建session的sessionfactory
        // 创建服务注册对象
        StandardServiceRegistry serviceRegistry = new StandardServiceRegistryBuilder().applySettings(cfg.getProperties()).build();
//            // 创建会话工厂对象SessionFactory
        SessionFactory sessionFactory = cfg.buildSessionFactory(serviceRegistry);
        // 一个session相当于一个连接, 通过session对象开启事务
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        // 创建映射对象模型
        User user = new User();
        user.setPassword("312");
        user.setUsername("aaa");
        // 保存对象
        session.save(user);
        // 提交事务
        transaction.commit();
        // 关闭会话
        session.close();
        // 关闭session工厂
        sessionFactory.close();
    }
}