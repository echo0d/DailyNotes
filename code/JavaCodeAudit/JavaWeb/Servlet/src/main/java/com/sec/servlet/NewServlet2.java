package com.sec.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author : echo0d
 * @date : 2023/9/19 21:42
 * @Description :
 */
@WebServlet(name = "NewServlet2", value = "/NewServlet2")
public class NewServlet2 extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {

    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        // 根据请求方式的不同，进行分别的处理

        HttpServletRequest request = (HttpServletRequest) req;

        //1. 获取请求方式
        String method = request.getMethod();
        //2. 判断
        if ("GET".equals(method)) {
            // get方式的处理逻辑
            NewServlet1 httpServletTest = new NewServlet1();
            httpServletTest.doGet((HttpServletRequest) req, (HttpServletResponse) res);
        } else if ("POST".equals(method)) {
            // post方式的处理逻辑
            doPost(req, res);

        }
    }

    protected void doPost(ServletRequest req, ServletResponse res) {

    }

    protected void doGet(ServletRequest req, ServletResponse res) {
    }
}
