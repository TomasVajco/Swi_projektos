package com.oldaaadam.todobackend.repository;

import com.oldaaadam.todobackend.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
