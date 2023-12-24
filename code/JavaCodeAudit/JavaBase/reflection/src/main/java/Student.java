/**
 * @author : xmsong
 * @date : 2023/8/1 21:30
 * @Description : 创建一个Student类，然后获取其成员变量
 */
public class Student {
    private String id;
    private String name;
    private int age;

    public String content;
    protected String address;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
