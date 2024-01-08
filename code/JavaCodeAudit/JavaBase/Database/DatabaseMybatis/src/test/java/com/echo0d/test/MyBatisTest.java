/**
 * @author : echo0d
 * @date : 2024/1/8 21:14
 * @Description :
 */
package com.echo0d.test;

import com.echo0d.dao.UserDao;
import com.echo0d.entity.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class MyBatisTest {

    private InputStream in = null;
    private SqlSession session = null;
    private UserDao mapper = null;

    @Before  //前置通知, 在方法执行之前执行
    public void init() throws IOException {
        //加载主配置文件，目的是为了构建SqlSessionFactory对象
        in = Resources.getResourceAsStream("mybatisConfig.xml");
        //创建SqlSessionFactory对象
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        //通过SqlSessionFactory工厂对象创建SqlSesssion对象
        session = factory.openSession();
        //通过Session创建UserDao接口代理对象
        mapper = session.getMapper(UserDao.class);
    }

    @After  //@After: 后置通知, 在方法执行之后执行 。
    public void destroy() throws IOException {
        //释放资源
        session.close();
        in.close();
    }

    @Test
    public void find(){
        User user = mapper.find();
        System.out.println(user);
    }
    @Test
    public void findAll(){
        List<User> users = mapper.findAll();
        for(User user:users){
            System.out.println(user.toString());
        }
    }

}