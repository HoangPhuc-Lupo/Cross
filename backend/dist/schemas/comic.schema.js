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
exports.getComicsSchema = exports.getComicsChartSchema = exports.deleteComicSchema = exports.updateComicSchema = exports.createComicSchema = exports.searchComicSchema = void 0;
const yup = __importStar(require("yup"));
/** search comics */
exports.searchComicSchema = yup.object({
    params: yup.object({
        query: yup.string().required(),
    }),
});
/** create comic */
exports.createComicSchema = yup.object({
    body: yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        poster: yup.string().required(),
        status: yup.mixed().oneOf(["process", "end"]).required(),
        genre: yup.number().required(),
    }),
});
/** update comic */
exports.updateComicSchema = yup.object().shape({
    params: yup.object({
        id: yup.string().required(),
    }),
    body: yup.object().shape({
        title: yup.string().notRequired(),
        description: yup.string().notRequired(),
        poster: yup.string().notRequired(),
        status: yup.mixed().oneOf(["process", "end"]).notRequired(),
        genre: yup.number().notRequired(),
    }),
});
/** delete comic */
exports.deleteComicSchema = yup.object().shape({
    params: yup.object({
        id: yup.string().required(),
    }),
});
exports.getComicsChartSchema = yup.object({
    query: yup.object({
        filter: yup.mixed().oneOf(["day", "month", "week"]).required(),
    }),
});
exports.getComicsSchema = yup.object({
    query: yup.object({
        sort: yup.mixed().oneOf(["desc", "asc"]).notRequired(),
        search: yup.string().notRequired(),
    }),
});
