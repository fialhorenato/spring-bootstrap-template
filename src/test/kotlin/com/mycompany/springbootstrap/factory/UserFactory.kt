package com.mycompany.springboottemplate.factory

import com.mycompany.springboottemplate.security.entity.RoleEntity
import com.mycompany.springboottemplate.security.entity.UserEntity
import java.time.Instant
import java.util.UUID

object UserFactory {
    fun createUser(
        username: String = "username",
        email: String = "email",
        password: String = "password",
        salt: String = "salt",
        roles: List<RoleEntity> = emptyList(),
        createdAt: Instant = Instant.now(),
        updatedAt: Instant = Instant.now(),
        userId: UUID = UUID.randomUUID(),
    ): UserEntity {
        return UserEntity(
            userId = userId,
            username = username,
            email = email,
            password = password,
            salt = salt,
            roles = roles,
            createdAt = createdAt,
            updatedAt = updatedAt,
        )
    }
}
