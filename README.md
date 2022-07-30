# emberbot

Yet another completely useless but open source discord bot.

First created on 2nd of June 2021 in JavaScript,
then recoded in TypeScript in October 2021,
then recoded again but in Rust on 30th of July 2022.

## Clone & build

```bash
git clone https://github.com/NoNameLmao/emberbot
cd ./emberbot
cargo build --release
```

## Run

> Set a `DISCORD_TOKEN` enviroment variable containing your bot's token:

Windows CMD: `set DISCORD_TOKEN=token_here`

Windows PowerShell: `$Env:DISCORD_TOKEN=token_here`

Linux: `export DISCORD_TOKEN=token_here`

> After that's done, run the executable through your terminal/command prompt:

Windows: `.\target\release\emberbot.exe`

Linux: `./target/release/emberbot`
