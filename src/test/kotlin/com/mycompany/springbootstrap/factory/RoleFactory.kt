package com.mycompany.factory

import com.mycompany.springboottemplate.springboottemplate.security.entity.RoleEntity
import com.mycompany.springboottemplate.springboottemplate.security.entity.UserEntity
import java.util.UUID

object RoleFactory {
    fun createRole(
        user: UserEntity,
        role: String = "USER",
        roleId: UUID = UUID.randomUUID(),
    ): RoleEntity {
        return RoleEntity(roleId = roleId, user = user, role = role)
    }
}
