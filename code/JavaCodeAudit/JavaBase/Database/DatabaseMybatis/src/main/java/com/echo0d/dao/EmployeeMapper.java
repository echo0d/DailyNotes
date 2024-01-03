package com.echo0d.dao;

/**
 * @author : echo0d
 * @date : 2023/12/31 15:56
 * @Description :
 */
import com.echo0d.model.Employee;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface EmployeeMapper {
    Employee getElementById(int id);
}
