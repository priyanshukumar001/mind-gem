"use client"
import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect, useRef } from "react";
import '@/../public/static/css/chatbot.css';
// import { Navigate } from 'react-router-dom';
import StartChat from "../../utils/startchat.js";
// import { chatHistory } from '../../config/globalVariables.js';
import formatText, { parseBasics } from '@/utils/formatText.js';
// import { useVerify } from '../../config/globalVariables.js';

interface ChatMessage { text: string; }
type ChatEntry = ['user' | 'model', ChatMessage[]];
const chatHistory: ChatEntry[] = [];

const Chatbot = () => {
    // const [isVerified, setIsVerified] = useVerify();
    const [message, setMessage] = useState('');
    // const [botResponse, setBotResponse] = useState('Loading.....');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // const [chatHistory, setChatHistory] = useState<string[]>([]);
    const [openChat, setOpenChat] = useState<boolean>(false);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);



    const handleClick = async () => {
        // e.preventDefault();
        const chat_box = document.getElementById('chat-box');
        try {
            if (message.trim() != '') {
                // setChatHistory((prev) => [...prev, message]);

                const msgDiv1 = document.createElement('div');
                msgDiv1.className = 'bot-message';
                const msgDiv2 = document.createElement('div');
                msgDiv2.className = 'message-sent';
                const msgPara = document.createElement('pre');
                msgPara.className = 'chat-message';
                // msgPara.innerHTML = `${formatText(message)}`;
                msgPara.innerHTML = parseBasics(message.trim());
                msgDiv2.appendChild(msgPara);
                msgDiv1.appendChild(msgDiv2);
                chat_box?.appendChild(msgDiv1);
                if (chat_box) chat_box.scrollTop = chat_box?.scrollHeight;
                //settin input null
                setMessage('');

                //creating and sending default message from server
                const resDiv1 = document.createElement('div');
                resDiv1.className = 'bot-message';
                const resDiv2 = document.createElement('div');
                resDiv2.className = 'message-recieved';
                const resPara = document.createElement('pre');
                resPara.className = 'chat-message';
                resPara.innerHTML = `Loading.....`;
                // resPara.innerHTML = (botResponse);
                resDiv2.appendChild(resPara);
                resDiv1.appendChild(resDiv2);
                chat_box?.appendChild(resDiv1);
                if (chat_box) chat_box.scrollTop = chat_box.scrollHeight;
                const response = await StartChat(message, chatHistory);
                // console.log(chatHistory);
                try {
                    if (response) {
                        resPara.innerHTML = `${formatText(response)}`;
                        // para.innerHTML = `${botResponse}`;

                    }
                    else {
                        resPara.innerHTML = `AI Server not responding! Please try again.....`;
                        // console.error("server not responding!");
                    }
                } catch (error) {
                    resPara.innerHTML = `Following error Occurred:-<br/> <span style="color:red">${error}</span>`;
                }

            } else {
                console.error("message is missing!");
            }

        } catch (error) {
            console.error(error);
        }



    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Check if Shift+Enter is pressed
        if (e.shiftKey && e.key === "Enter") {
            // Insert a new line into the text
            setMessage((prevText) => prevText + "\n");
            e.preventDefault(); // Prevent the default behavior of Enter key
        } else if (e.key === "Enter") {
            handleClick();
            // console.log('fns called');
            e.preventDefault(); // Prevent the default behavior of Enter key
        }
    };

    return (
        <>
            {
                !openChat && (
                    <div id="chatIcon" className='fixed right-2 bottom-2 p-2 cursor-pointer bg-white rounded-full hover:bg-blue-100 ' onClick={() => setOpenChat(true)} >
                        {/* <p>&lt;&#9432;&gt;</p> */}
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="24" viewBox="0 0 24 24"
                                width="24"><path d="M0 0h24v24H0z"
                                    fill="none" />
                                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" stroke='var(--chat-icon-color)' fill='var(--chat-icon-color)' />
                            </svg>
                        </p>
                    </div>

                )
            }
            {
                openChat &&
                (
                    <div className='fixed bottom-2 right-2 mx-auto w-fit min-w-[400] max-w-[600px] bg-blue-100 p-2 rounded-lg'>
                        <div className='absolute right-2 top-2 rounded-full bg-blue-800 text-white font-bold p-1 px-3 cursor-pointer hover:bg-blue-400' onClick={() => setOpenChat(false)}>X</div>
                        <div className="chat-container" >
                            <div id="chat-box">
                                <div className="bot-message ">
                                    <div className='message-recieved'>
                                        <p className="chat-message" >Hello! How can I assist you today? </p>
                                    </div>
                                </div>
                            </div>
                            <div id="messages" className="input-container" >
                                <form >
                                    <div className='user-input-area'>
                                        <textarea id='user-input'
                                            ref={textareaRef}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            autoFocus
                                        ></textarea>
                                        <button id="send-button"
                                            className='bg-blue-600'
                                            type="button" value='submit' onClick={handleClick}>Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    );
}

export default Chatbot;
