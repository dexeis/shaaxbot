import { CommandInt } from "../interfaces/CommandInt";
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getRaffleData } from "../modules/getRaffleData"
import { createRaffleData } from "../modules/createRaffleData"
import RaffleModel, { RaffleInt } from "../database/models/RaffleModel";
import dayjs from "dayjs";

export const raffle: CommandInt = {
    data: new SlashCommandBuilder()
        .setName('raffle')
        .setDescription('Add a single raffle.')
        .addStringOption((option) =>
        option
            .setName('card')
            .setDescription('Must be the EXACT card name')
            .setRequired(true)
        )
        .addIntegerOption((option) =>
        option
            .setName('quality')
            .setDescription('Choose card quality')
            .addChoices(
                { name: process.env['QUALITY_1'] as string, value: 1},
                { name: process.env['QUALITY_2'] as string, value: 2},
                { name: process.env['QUALITY_3'] as string, value: 3},
                { name: process.env['QUALITY_4'] as string, value: 4},
            )
            .setRequired(true)
        )
        .addIntegerOption((option) =>
        option
            .setName('duration')
            .setDescription('Raffle duration (in days)')
            .setRequired(true)
        )
        .addStringOption((option) =>
        option
            .setName('channel')
            .setDescription('Name of the channel')
            .setRequired(true)
        ),

    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const raffleEmbed = new MessageEmbed();
        raffleEmbed.setTitle("DEBUG MODE");
        raffleEmbed.setDescription("Raffle enregistrée.\n" +
            "Carte: " + interaction.options.getString('card', true) + "\n" +
            "Qualité: " + process.env['QUALITY_'+interaction.options.getInteger('quality', true)]
        );
        // raffleEmbed.setAuthor({
        //     name: user.tag,
        //     iconURL: user.displayAvatarURL(),
        // });
        const message = await interaction.editReply({embeds: [raffleEmbed]});

        const newRaffle = await RaffleModel.create({
            cardName: interaction.options.getString('card', true),
            cardQuality: interaction.options.getInteger('quality', true),
            messageId: message.id,
            channelName: interaction.options.getString('channel', true),
            dateEnd: dayjs().add(interaction.options.getInteger('duration', true), 'day').format('DD/MM/YYYY HH'),
        })
    }

};