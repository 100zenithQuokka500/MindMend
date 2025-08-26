import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        conversationId: {
            type: String,
            required: true,
        },
        messageType: {
            type: String,
            enum: ['user', 'assistant', 'system'],
            default: 'user',
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);
messageSchema.index({ user: 1, conversationId: 1, timestamp: 1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
