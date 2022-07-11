import { Document, model, Schema } from "mongoose";

export interface RaffleInt extends Document {
    cardName: string;
    cardQuality: number;
    cardQuantity: number;
    messageId: number;
    channelName: string;
    dateEnd: number;
}

export const Raffle = new Schema({
    cardName: String,
    cardQuality: Number,
    cardQuantity: Number,
    messageId: Number,
    channelName: String,
    dateEnd: String,
});

export default model<RaffleInt>('Raffle', Raffle);