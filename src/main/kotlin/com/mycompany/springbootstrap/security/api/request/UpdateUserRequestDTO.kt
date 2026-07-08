package com.mycompany.springboottemplate.security.api.request

data class UpdateUserRequestDTO(
    val email: String,
    val password: String
)
