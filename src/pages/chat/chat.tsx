import React, { useState } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: string;
}

interface Dialog {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    unread: number;
}

const Chat: React.FC = () => {
    const [activeDialog, setActiveDialog] = useState(1);
    const [inputMessage, setInputMessage] = useState('');

    const dialogs: Dialog[] = [
        { id: 1, name: 'Иван Иванов', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male', lastMessage: 'Привет, как дела?', unread: 2 },
        { id: 2, name: 'Мария Петрова', avatar: 'https://xsgames.co/randomusers/avatar.php?g=female', lastMessage: 'Увидимся завтра', unread: 0 },
        { id: 3, name: 'Алексей Сидоров', avatar: 'https://xsgames.co/randomusers/avatar.php?g=male', lastMessage: 'Спасибо за информацию', unread: 1 },
    ];

    const messages: Message[] = [
        { id: 1, text: 'Привет!', sender: 'user', timestamp: '10:00' },
        { id: 2, text: 'Привет! Как дела?', sender: 'other', timestamp: '10:01' },
        { id: 3, text: 'Отлично, спасибо! А у тебя?', sender: 'user', timestamp: '10:02' },
        { id: 4, text: 'Тоже хорошо. Что планируешь на выходные?', sender: 'other', timestamp: '10:03' },
    ];

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            console.log('Отправка сообщения:', inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="flex w-full max-w-[1440px] px-[70px] pt-[20px] my-[20px] h-screen overflow-hidden">
                <div className='bg-white rounded-[7px] w-full p-[20px] flex'>
                    <div className="w-80 border-r border-gray-200 overflow-y-auto ">
                        <List
                            dataSource={dialogs}
                            renderItem={dialog => (
                                <List.Item
                                    onClick={() => setActiveDialog(dialog.id)}
                                    className={`cursor-pointer flex pl-[10px] hover:bg-gray-100 ${activeDialog === dialog.id ? 'bg-gray-100' : ''}`}
                                >
                                    <List.Item.Meta
                                        className="ml-[10px]"
                                        avatar={<Avatar src={dialog.avatar} />}
                                        title={dialog.name}
                                        description={dialog.lastMessage}
                                    />
                                    {dialog.unread > 0 && (
                                        <div className="bg-[#2A5AB8] mr-[10px] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                            {dialog.unread}
                                        </div>
                                    )}
                                </List.Item>
                            )}
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4">
                            {messages.map(message => (
                                <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                    <div
                                        className={`inline-block max-w-[70%] p-3 rounded-lg ${
                                            message.sender === 'user' ? 'bg-[#2A5AB8] text-white' : 'bg-[#ECECEC]'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <Input
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onPressEnter={handleSendMessage}
                                placeholder="Введите сообщение..."
                                suffix={
                                    <Button
                                        type="primary"
                                        icon={<SendOutlined />}
                                        onClick={handleSendMessage}
                                        className="bg-blue-500"
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;