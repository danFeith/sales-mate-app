import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message_id: { type: Number, required: true },
    role: { type: String, enum: ["system", "assistant", "user"], required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
    conv_id: { type: mongoose.Schema.Types.Mixed, required: true }, // Handling both Long Number and ObjectId
    conversation_messages: { type: [messageSchema], required: true },
    shop_domain: { type: String, required: true },
    synced: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// Create the Conversation model
const Conversation = mongoose.model("conversations", conversationSchema);

export default Conversation;
