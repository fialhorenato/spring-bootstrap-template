package com.mycompany.springbootstrap.security.repository

import com.mycompany.springbootstrap.security.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<UserEntity, Long> {
    fun findByUsername(username : String) : UserEntity?
    fun existsByUsernameOrEmail(username : String, email : String) : Boolean
}