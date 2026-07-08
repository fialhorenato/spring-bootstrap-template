package com.mycompany.springbootstrap.api.response

import java.time.Instant

data class GeneralFailureResponse(
    val timestamp: Instant,
    val status: Int,
    val error: String,
    val code: String,
    val message: String,
    val path: String,
)
