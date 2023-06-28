
import { validationResult } from "express-validator"
import { CustomExpress } from 'types/custom_express';
import express from 'express';

class CustomError extends Error {
  mix_event: string;
  mix_details: object;
  statusCode: number;
}

class UnauthorizedOperation extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super("🖐️ " + message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "UnauthorizedOperation"
    this.statusCode = 403
  }
}

class NotFoundError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super("😞 " + message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "NotFoundError"
    this.statusCode = 404
  }
}

class NotAcceptableError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super(message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "NotAcceptableError"
    this.statusCode = 406
  }
}

class AuthError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super(message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "AuthError"
    this.statusCode = 401
  }
}

class BadRequestError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super(message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "BadRequestError"
    this.statusCode = 400
  }
}

class ConflitError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super(message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "ConflitError"
    this.statusCode = 409
  }
}

class CorsError extends CustomError {
  constructor(message, mix_event?: string, mix_details = {}) {
    super(message)
    this.mix_event = mix_event
    this.mix_details = mix_details
    this.name = "CorsError"
    this.statusCode = 403
  }
}

function errorHandler(err, req, res, next) {
  console.log('ERROR', err)
  if (err.statusCode) {
    res.status(err.statusCode).send({ error: true, message: err.message })
  } else {
    res.status(500).send({ error: true, message: `INTERNAL ERROR: ${err.message}` })
  }
}

function tryCatcher(handler: Function) {
  return async function (req: express.Request, res: express.Response, next: Function) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await handler(req, res)
      next()
    } catch (err) {
      next(err)
    }
  }
}


export {
  UnauthorizedOperation,
  NotFoundError,
  NotAcceptableError,
  AuthError,
  BadRequestError,
  ConflitError,
  tryCatcher,
  errorHandler,
  CorsError,
}
