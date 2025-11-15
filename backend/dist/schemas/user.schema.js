"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginSchema = exports.signupSchema = void 0;
const yup = __importStar(require("yup"));
const utils_1 = require("../utils");
/** SignUp */
exports.signupSchema = yup.object({
    body: yup.object({
        username: yup.string().required(),
        fullname: yup.string().required(),
        password: yup
            .string()
            .min(utils_1.MIN_PASSWORD_LENGTH)
            .max(utils_1.MAX_PASSWORD_LENGTH)
            .required(),
        email: yup.string().email().required(),
    }),
});
/** Login */
exports.loginSchema = yup.object({
    body: yup.object({
        username: yup.string().required(),
        password: yup
            .string()
            .min(utils_1.MIN_PASSWORD_LENGTH)
            .max(utils_1.MAX_PASSWORD_LENGTH)
            .required(),
    }),
});
/** Update User */
exports.updateUserSchema = yup.object({
    body: yup.object({
        username: yup.string(),
        photoURL: yup.string(),
        fullname: yup.string(),
    }),
});
