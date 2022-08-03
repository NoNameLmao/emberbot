use serenity::model::user::User;

pub fn get_avatar(user: User, extension: String, size: String) -> String {
    let avatar_hash: String = unsafe {
        user.avatar_url().unwrap().get_unchecked(54..86).to_string()
    };
    return format!(
        "https://cdn.discordapp.com/avatars/{}/{}.{}?size={}",
        user.id,
        avatar_hash,
        if extension == "none" {
            "webp".to_string()
        } else {
            extension
        },
        if size == "none" {
            "1024".to_string()
        } else {
            size
        }
    )
}