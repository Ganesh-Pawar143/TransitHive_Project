package com.th.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Admin extends BaseEntity {
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String phone;
}
