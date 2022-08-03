use std::env;
use std::time::{SystemTime, UNIX_EPOCH, Instant};

use serenity::async_trait;
use serenity::model::application::command::{Command, CommandOptionType};
use serenity::model::application::interaction::application_command::CommandDataOptionValue;
use serenity::model::application::interaction::{Interaction, InteractionResponseType};
use serenity::model::gateway::Ready;
use serenity::prelude::*;

mod snowflake;
mod avatar;
struct Handler;
use snowflake::Snowflake;

#[tokio::main]
async fn main() {
    #[async_trait]
    impl EventHandler for Handler {
        async fn interaction_create(&self, ctx: Context, interaction: Interaction) {
            if let Interaction::ApplicationCommand(command) = interaction {
                println!("📘 Received command interaction: {:#?}", command);
                let content: String = match command.data.name.as_str() {
                    "dn" => "deez nuts".to_string(),
                    "hi" => "hi im online what do you want".to_string(),
                    "ping" => {
                        let command_id: u64 = command.data.id.as_u64().to_owned();
                        let command_snowflake: Snowflake = Snowflake::from(command_id);
                        let time_since_command: u128 = (
                            SystemTime::now()
                                .duration_since(UNIX_EPOCH)
                                .expect("time went backwards, thats crazy")
                                .as_millis()
                        ) - command_snowflake.timestamp as u128;
                        format!("Time since command: {}ms", time_since_command)
                    },
                    "pfp" => {
                        let to_string = |opt| match opt {
                            CommandDataOptionValue::String(s) => s,
                            CommandDataOptionValue::Integer(i) => i.to_string(),
                            _ => unreachable!(), 
                        };
                          
                        let user = match &command.data.options[0].resolved.as_ref().unwrap() {
                            CommandDataOptionValue::User(u, _) => u.clone(),
                            _ => unreachable!(),
                        };
                        let extension: String = to_string(
                            command
                                .data
                                .options[1]
                                .resolved
                                .as_ref()
                                .unwrap()
                                .clone()
                        );
                        let size: String = to_string(
                            command
                                .data
                                .options[2]
                                .resolved
                                .as_ref()
                                .unwrap()
                                .clone()
                        );
                        avatar::get_avatar(user, extension, size)
                    },
                    "id" => {
                        let options: &CommandDataOptionValue = command
                            .data
                            .options
                            .get(0)
                            .expect("Expected user option")
                            .resolved
                            .as_ref()
                            .expect("Expected user object");
                        if let CommandDataOptionValue::User(user, _member) = options {
                            format!("{}'s id is {}", user.tag(), user.id)
                        } else {
                            format!("Your id: {}", command.user.id)
                        }
                    },
                    "attachmentinput" => {
                        let options = command
                            .data
                            .options
                            .get(0)
                            .expect("Expected attachment option")
                            .resolved
                            .as_ref()
                            .expect("Expected attachment object");

                        if let CommandDataOptionValue::Attachment(attachment) = options {
                            format!(
                                "Attachment name: {}, attachment size: {}",
                                attachment.filename, attachment.size
                            )
                        } else {
                            "Please provide a valid attachment".to_string()
                        }
                    },
                    _ => "the what? (command doesnt exist)".to_string(),
                };

                if let Err(why) = command
                    .create_interaction_response(&ctx.http, |response| {
                        response
                            .kind(InteractionResponseType::ChannelMessageWithSource)
                            .interaction_response_data(|message| message.content(content))
                    })
                    .await
                {
                    println!("📙 Cannot respond to slash command: {}", why);
                }
            }
        }

        async fn ready(&self, ctx: Context, ready: Ready) {
            println!("📗 Logged in as {}!", ready.user.tag());

            let global_commands = Command::set_global_application_commands(&ctx.http, |commands| {
                commands
                .create_application_command(|command| {
                    command
                        .name("wonderful_command")
                        .description("An amazing command")
                })
                .create_application_command(|command| {
                    command.name("hi").description("Usually used to check if the bot is responding or not, but other than that - useless")
                })
                .create_application_command(|command| {
                    command.name("ping").description("Get discord latency (compares current time to the time when the command was sent)")
                })
                .create_application_command(|command| {
                    command.name("id").description("Get a user id").create_option(|option| {
                        option
                            .name("id")
                            .description("The user to lookup")
                            .kind(CommandOptionType::User)
                            .required(true)
                    })
                })
                .create_application_command(|command| {
                    command
                        .name("pfp")
                        .description("Display someone's (or your own) profile picture")
                        .create_option(|option| {
                            option
                                .name("user")
                                .description("The guild member you want to display the profile picture of.")
                                .kind(CommandOptionType::User)
                        })
                        .create_option(|option| {
                            option
                                .name("extension")
                                .description("The extension to use for the image URL")
                                .kind(CommandOptionType::String)
                                .add_string_choice(".webp", "webp")
                                .add_string_choice(".jpeg", "jpeg")
                                .add_string_choice(".png", "png")
                                .add_string_choice(".gif", "gif")
                        })
                        .create_option(|option| {
                            option
                                .name("size")
                                .description("The size of the image, width and height in pixels. Minimum = 16, maximum = 4096")
                                .kind(CommandOptionType::Integer)
                                .add_int_choice("16 (Smallest possible)", 16)
                                .add_int_choice("32 (Very small)", 32)
                                .add_int_choice("64 (Small)", 64)
                                .add_int_choice("128 (Medium)", 128)
                                .add_int_choice("256 (Large)", 256)
                                .add_int_choice("512 (Medium Large)", 512)
                                .add_int_choice("1024 (Discord's default)", 1024)
                                .add_int_choice("2048 (Very large)", 2048)
                                .add_int_choice("4096 (Largest possible)", 4096)
                        })
                })
                .create_application_command(|command| {
                    command
                        .name("welcome")
                        .description("Welcome a user")
                        .create_option(|option| {
                            option
                                .name("user")
                                .description("The user to welcome")
                                .kind(CommandOptionType::User)
                                .required(true)
                        })
                        .create_option(|option| {
                            option
                                .name("message")
                                .description("The message to send")
                                .kind(CommandOptionType::String)
                                .required(true)
                                .add_string_choice_localized(
                                    "Welcome to our cool server! Ask me if you need help",
                                    "pizza",
                                    [("de", "Willkommen auf unserem coolen Server! Frag mich, falls du Hilfe brauchst")]
                                )
                                .add_string_choice_localized(
                                    "Hey, do you want a coffee?",
                                    "coffee",
                                    [("de", "Hey, willst du einen Kaffee?")],
                                )
                                .add_string_choice_localized(
                                    "Welcome to the club, you're now a good person. Well, I hope.",
                                    "club",
                                    [("de", "Willkommen im Club, du bist jetzt ein guter Mensch. Naja, hoffentlich.")],
                                )
                                .add_string_choice_localized(
                                    "I hope that you brought a controller to play together!",
                                    "game",
                                    [("de", "Ich hoffe du hast einen Controller zum Spielen mitgebracht!")],
                                )
                        })
                })
                .create_application_command(|command| {
                    command
                        .name("numberinput")
                        .description("Test command for number input")
                        .create_option(|option| {
                            option
                                .name("int")
                                .description("An integer from 5 to 10")
                                .kind(CommandOptionType::Integer)
                                .min_int_value(5)
                                .max_int_value(10)
                                .required(true)
                        })
                        .create_option(|option| {
                            option
                                .name("number")
                                .description("A float from -3.3 to 234.5")
                                .kind(CommandOptionType::Number)
                                .min_number_value(-3.3)
                                .max_number_value(234.5)
                                .required(true)
                        })
                })
                .create_application_command(|command| {
                    command
                        .name("attachmentinput")
                        .description("Test command for attachment input")
                        .create_option(|option| {
                            option
                                .name("attachment")
                                .description("A file")
                                .kind(CommandOptionType::Attachment)
                                .required(true)
                        })
                })
            })
                .await
                .expect("Error with global commands");
            println!("📗 {} global commands have been registered", global_commands.len())
        }
    }
    let start: Instant = Instant::now();
    let token: String = env::var("DISCORD_TOKEN").expect("Expected bot token in `DISCORD_TOKEN` enviroment variable");
    let mut client = Client::builder(token, GatewayIntents::empty())
        .event_handler(Handler)
        .await
        .expect("📕 Error creating client");
    println!("📗 Client started in {:?}", start.elapsed());
    if let Err(why) = client.start().await {
        println!("📕 Client error: {:?}", why);
    }
}
