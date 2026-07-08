package com.mycompany.springboottemplate.security.exception

class UserAlreadyExistsException(override val message: String? = "User already exists") : RuntimeException()