package com.mycompany.springboottemplate.security.repository

import com.mycompany.springboottemplate.security.entity.RoleEntity
import com.mycompany.springboottemplate.security.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository : JpaRepository<RoleEntity, Long> {
    fun deleteByUserAndRole(user: UserEntity, role : String)

    fun findAllByUser_Username(username : String) : List<RoleEntity>
}