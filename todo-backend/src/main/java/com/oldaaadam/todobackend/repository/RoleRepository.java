package com.oldaaadam.todobackend.repository;

import com.oldaaadam.todobackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

}
