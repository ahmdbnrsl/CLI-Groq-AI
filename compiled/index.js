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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groq_sdk_1 = __importDefault(require("groq-sdk"));
require("dotenv/config");
const readline = __importStar(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function prompt(question) {
    return new Promise(resolve => {
        rl.question(chalk_1.default.blue.bold(question), answer => {
            resolve(answer);
        });
    });
}
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY || '' });
function main() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(chalk_1.default.bgGray.white.bold('AI CLI'));
            console.log('=============================================');
            console.log('ENTER PROMPT AND PRESS ENTER TO SEE THE RESULT');
            console.log('CTRL + C TO EXIT');
            console.log('=============================================');
            let prev = '';
            for (let i = 0; i < Infinity; i++) {
                const content = yield prompt('enter your prompt: ');
                const chatCompletion = yield getGroqChatCompletion(`"${prev || 'Hi'}" this is a chat or question or statement from someone and this "${content}" answer or question or statement from me to that person, and now simulate that you are that person who answers my answer or question or statement, please give only one answer without quotation marks, give a reasonable and coherent answer as if you were having a dialogue, and reply with Indonesian slang only!!`);
                prev = ((_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
                console.log(chalk_1.default.gray.bgGreen.bold('AI ANSWER : '), ((_d = (_c = chatCompletion.choices[0]) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.content) || '');
            }
        }
        finally {
            rl.close();
        }
    });
}
function getGroqChatCompletion(content) {
    return __awaiter(this, void 0, void 0, function* () {
        return groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content
                }
            ],
            model: 'llama3-70b-8192' //'llama-3.1-70b-versatile'
        });
    });
}
main();
