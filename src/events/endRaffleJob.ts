import { CronJob } from "cron";
import { getRaffleData } from "../modules/getRaffleData";
import { endRaffle } from "../modules/endRaffle";
import dayjs from "dayjs";

export const endRaffleJob = async () => {
    new CronJob('0 * * * *', async () => {
        try {
            await getEndableRaffles()
        } catch (e) {
            console.error(e);
        }
    })
}

export const getEndableRaffles = async(): Promise<void> => {
    const now = dayjs().format('DD/MM/YYYY HH');
    const nowDay = now.split(' ')[0]
    const nowH = now.split(' ')[1]
    const endableRaffles = await getRaffleData(now);

    for (const endableRaffle of endableRaffles ) {
        if (dayjs(endableRaffle.dateEnd).format('DD/MM/YYYY') === nowDay && dayjs(endableRaffle.dateEnd).format('DD/MM/YYYY') <= nowH) {
            await endRaffle(endableRaffle);
        }
    }
}
// class endRaffleJob {
//     cronJob: CronJob;
//
//     constructor() {
//         this.cronJob = new CronJob('0 * * * *', async () => {
//             try {
//                 await this.endRaffle();
//             } catch (e) {
//                 console.error(e)
//             }
//         });
//
//         if (!this.cronJob.running) {
//             this.cronJob.start();
//         }
//     }
//
//     async function endRaffle(): Promise<void> {
//
//     }
// }