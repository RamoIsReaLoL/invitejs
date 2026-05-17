## Davet Modülü

Discord.JS v14 Davet Sayma Modülü

## İndirme

    $ npm install invite.js

## Örnek

## Parametreler

`member` -> davet edilen kullanıcı ve sunucu üyesi olarak geri döner

`invite` -> davet kodu

`inviter` -> davet eden ve kullanıcı olarak geri dön

`guild` -> kullanıcı içindeki sunucu

## Client ve Intent:
<pre><code>const { Discord, Client, Collection, Intents, Guild } = require('discord.js');
const client = new Client({ intents: 851 });
// Modül Tanımı
const invite = require('invite.js');
invite.inviteModule(client);</pre></code>

`guildMemberAdd` eventi, `KullaniciKatilma` olarak değiştirildi
`guildMemberRemove` eventi , `KullaniciAyrilma` olarak değiştirildi

## Kullanımı
<pre><code>client.on("KullaniciKatilma", async(member, invite, inviter, guild) => {
    console.log(`${member} sunucuya katıldı, onu davet eden: **${inviter.username}**.`);
})

client.on("KullaniciAyrilma", async(member, invite, inviter, guild) => {
    console.log(`${member.user.tag} sunucudan ayrıldı, onu davet eden: **${inviter}**.`);  
})</pre></code>
## Eğer isterseniz
<pre><code>client.on("KullaniciKatilma", async(member, invite, inviter, guild) => {
    guild.channels.cache.get('kanal-id').send(`${member} sunucuya katıldı, onu davet eden: **${inviter.username}**.`);
})

client.on("KullaniciAyrilma", async(member, invite, inviter, guild) => {
    guild.channels.cache.get('kanal-id').send(`${member.user.tag} sunucudan ayrıldı, onu davet eden: **${inviter}**.`);
})</pre></code>
## Davet kodu ve sunucu kullanımı:
<pre><code>client.on("KullaniciKatilma", async(member, invite, inviter, guild) => {
    console.log(`${member} katıldı, "${guild}" adlı sunucuya, kullandığı davet kodu: ${invite}. davet eden: **${inviter.username}**`);
 })</pre></code>
    
<p>Eğer İsterseniz</p>
    
<pre><code>client.on("KullaniciKatilma", async(member, invite, inviter, guild) => {
    guild.channels.cache.get('kanal-id').send(`${member} katıldı, "${guild}" adlı sunucuya, kullandığı davet kodu: ${invite}. onu davet eden: **${inviter.username}**`);
})</pre></code>
