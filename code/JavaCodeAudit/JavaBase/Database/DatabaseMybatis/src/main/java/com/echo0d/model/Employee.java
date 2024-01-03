package com.echo0d.model;

/**
 * @author : echo0d
 * @date : 2023/12/31 15:44
 * @Description :
 */
public class Employee {
    private int id;
    private String lastName;
    private String gender;
    private String email;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id + "," +
                "lastName=" + lastName + "," +
                "gender=" + gender + "," +
                "email=" + email + '}';
    }
}