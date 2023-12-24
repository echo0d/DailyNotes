package com.sec.filter;

/**
 * @author : echo0d
 * @date : 2023/9/17 21:19
 * @Description :
 */

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*
        ;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import javax.servlet.Filter;

@WebServlet(name = "NewServlet1", value = "/NewServlet1")

public class NewServlet1 extends HttpServlet implements Filter{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("请求方式" + req.getMethod());
        System.out.println("访问路径" + req.getServletPath());
        System.out.println("协议类型" + req.getProtocol());
        //读取消息头，getHeaderNames()返回key的迭代器, 该迭代器是比Iterator更古老的迭代器.
        Enumeration e = req.getHeaderNames();
        while(e.hasMoreElements()){
            String key = (String) e.nextElement();
            String value = req.getHeader(key);
            System.out.println(key + ":" + value);
        }
        //写消息头告诉浏览器给它输出的是什么格式的内容
        resp.setContentType("text/html");

        //获取输出流，该流指向的目标就是浏览器
        PrintWriter out = resp.getWriter();
        //省略代码N行
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        String now = sdf.format(date);
        //写实体内容
        out.println("<!DOCTYPE HTML>");
        out.println("<html>");
        out.println("<head>");
        out.println("<title>TimeServlet</title>");
        out.println("<meta charset='utf-8'>");
        out.println("</head>");
        out.println("<body>");
        out.println("<p>"+now+"</p>");
        out.println("</body>");
        out.println("</html>");
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("NewServlet1 Filter");
    }

}
