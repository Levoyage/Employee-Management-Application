package net.javaguides.emsbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//lombok reduce boilerplate
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employees")

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="email_id",nullable = false,unique = true)
    private String email;

    //fetch = FetchType.LAZY表示使用延迟加载策略。
    //它意味着在查询主实体（当前实体）的时候，关联的实体（Department实体）不会立即被加载到内存中。
    // 相反，它们只会在需要的时候才会被加载，以减少性能开销。
    @ManyToOne(fetch = FetchType.LAZY)
    //这个注释是用来引入外键的
    @JoinColumn(name="department_id")
    private Department department;
}
