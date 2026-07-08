package com.mycompany.springboottemplate.security.service

import com.mycompany.springboottemplate.security.domain.UserSecurity
import com.mycompany.springboottemplate.security.entity.RoleEntity
import com.mycompany.springboottemplate.security.entity.UserEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface UserService {
    fun addRole(username: String, role: String)

    fun removeRole(username: String, role: String)

    fun getUserByUserId(userId: Long): UserEntity

    fun getUserByUsername(username: String): UserEntity

    fun getUsers(pageable : Pageable): Page<UserEntity>

    fun authenticate(username : String, password : String): String

    fun me(): UserSecurity

    fun createUser(username: String, password: String, email: String): UserEntity

    fun updateUser(email: String, password: String) : UserEntity

    fun findAllRolesByUsername(username: String) : List<RoleEntity>
}