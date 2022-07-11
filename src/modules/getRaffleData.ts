import RaffleModel, {RaffleInt} from "../database/models/RaffleModel";

export const getRaffleData = async (dateEnd: string
): Promise<RaffleInt[]> => {
    return RaffleModel.find({dateEnd: dateEnd});
}