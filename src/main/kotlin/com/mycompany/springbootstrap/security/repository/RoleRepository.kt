package com.mycompany.springbootstrap.security.repository

import com.mycompany.springbootstrap.security.entity.RoleEntity
import com.mycompany.springbootstrap.security.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RoleRepository : JpaRepository<RoleEntity, Long> {
    fun deleteByUserAndRole(user: UserEntity, role : String)

    fun findAllByUser_Username(username : String) : List<RoleEntity>
}