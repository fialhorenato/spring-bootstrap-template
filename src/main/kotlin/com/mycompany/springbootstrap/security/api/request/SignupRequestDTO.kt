package com.mycompany.springboottemplate.security.api.request

data class SignupRequestDTO(
    val username: String,
    val email: String,
    val password: String
)
