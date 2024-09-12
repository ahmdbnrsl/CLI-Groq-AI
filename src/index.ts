import Groq from 'groq-sdk';
import 'dotenv/config';
import * as readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question: string) {
    return new Promise(resolve => {
        rl.question(chalk.blue.bold(question), answer => {
            resolve(answer);
        });
    });
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '' });

async function main() {
    try {
        console.log(chalk.bgGray.white.bold('AI CLI'));
        console.log('=============================================');
        console.log('ENTER PROMPT AND PRESS ENTER TO SEE THE RESULT');
        console.log('CTRL + C TO EXIT');
        console.log('=============================================');
        let prev: string = '';
        for (let i = 0; i < Infinity; i++) {
            const content = await prompt('enter your prompt: ');
            const chatCompletion = await getGroqChatCompletion(
                `"${
                    prev || 'Hi'
                }" this is a chat or question or statement from someone and this "${content}" answer or question or statement from me to that person, and now simulate that you are that person who answers my answer or question or statement, please give only one answer without quotation marks, give a reasonable and coherent answer as if you were having a dialogue, and reply with Indonesian slang only!!`
            );
            prev = chatCompletion.choices[0]?.message?.content || '';
            console.log(
                chalk.gray.bgGreen.bold('AI ANSWER : '),
                chatCompletion.choices[0]?.message?.content || ''
            );
        }
    } finally {
        rl.close();
    }
}

async function getGroqChatCompletion(content: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content
            }
        ],
        model: 'llama3-70b-8192' //'llama-3.1-70b-versatile'
    });
}

main();
