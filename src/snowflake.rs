// code taken from https://github.com/Not-Nik/rustflakes (rust implementation of discord snowflakes)

pub struct Snowflake {
    /// Unix timestamp
    pub timestamp: u64,
    /// Worker that created this Snowflake, internal
    pub worker_id: u64,
    /// Process that created this Snowflake, internal
    pub process_id: u64,
    /// Increment of this Snowflake, internal
    pub increment: u64,
    /// Raw snowflake
    pub flake: u64,
}
impl Snowflake {
    pub fn from(snowflake: u64) -> Snowflake {
        Snowflake {
            timestamp: (snowflake >> 22) + 1420070400000,
            worker_id: (snowflake & 0x3E0000) >> 17,
            process_id: (snowflake & 0x1F000) >> 12,
            increment: snowflake & 0xFFF,
            flake: snowflake,
        }
    }
}