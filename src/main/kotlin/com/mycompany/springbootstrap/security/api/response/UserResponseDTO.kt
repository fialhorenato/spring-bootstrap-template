package com.mycompany.springboottemplate.security.api.response

import com.mycompany.springboottemplate.security.domain.UserSecurity
import com.mycompany.springboottemplate.security.entity.UserEntity
import java.util.UUID


data class UserResponseDTO(
        val username : String,
        val userId : UUID,
        val email : String,
        val roles : List<String>
) {

    constructor(user : UserEntity) : this(
        user.username,
        user.userId,
        user.email,
        user.roles.map { it.role }.toList()
    )

    constructor(userSecurity: UserSecurity) : this(
        userSecurity.username ,
        userSecurity.userId,
        userSecurity.email,
        userSecurity.roles
    )

}