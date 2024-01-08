
/**
 * @author : echo0d
 * @date : 2024/1/8 21:10
 * @Description :
 */
package com.echo0d.dao;
import com.echo0d.entity.User;
import java.util.List;

public interface UserDao {
    public List<User> findAll();

    User find();
}
