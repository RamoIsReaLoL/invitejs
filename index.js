let invites = {};

async function inviteModule(client) {

//bot açılınca bütün davetleri oku
client.on('ready', async () => {
    console.log("[invite.js] - davetler sayılmaya başladı!")
    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            if(!g.members.me.permissions.has('CreateInstantInvite')) return new TypeError(`Botun Davetleri Saymaya Gerekli Yetkisi Yok! \n Sunucu Adı: ${g.name}`);
            g.invites.fetch().then(guildInvites => {
                invites[g.id] = guildInvites;
            });
        });
    }, 2000)
});

//yeni davet oluşturunca bütün davetleri oku
client.on("inviteCreate", (invite) => {
    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            if(!g.members.me.permissions.has('CreateInstantInvite')) return new TypeError(`Botun Davetleri Saymaya Gerekli Yetkisi Yok! \n Sunucu Adı: ${g.name}`)
            g.invites.fetch().then(guildInvites => {
                invites[g.id] = guildInvites;
            });
        });
    }, 2000)
});

//davet silinince bütün davetleri oku
client.on("inviteDelete", (invite) => {
    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            if(!g.members.me.permissions.has('CreateInstantInvite')) return new TypeError(`Botun Davetleri Saymaya Gerekli Yetkisi Yok! \n Sunucu Adı: ${g.name}`)
            g.invites.fetch().then(guildInvites => {
                invites[g.id] = guildInvites;
            });
        });
    }, 2000)
});

//bot yeni sunucuya alındığında bütün davetleri oku
client.on("guildCreate", (guild) => {
    setTimeout(() => {
        client.guilds.cache.forEach(g => {
            if(!g.members.me.permissions.has('CreateInstantInvite')) return new TypeError(`Botun Davetleri Saymaya Gerekli Yetkisi Yok! \n Sunucu Adı: ${g.name}`)
            g.invites.fetch().then(guildInvites => {
                invites[g.id] = guildInvites;
            });
        });
    }, 2000)
});

//sunucuya üye gelince tetiklen
client.on('guildMemberAdd', member => {
    try {
        member.guild.invites.fetch().then(async guildInvites => {
            const inv = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;
            if (!inv) return;
            await member.guild.invites.fetch().catch(() => undefined);
            const invite = guildInvites.find(i => {
                const a = inv.get(i.code);
                if (!a) return;
                return a
            });
            if (!invite) return;
            const inviter = client.users.cache.get(invite.inviter.id);
            const guild = member.guild;
            client.emit("KullaniciKatilma", member, invite, inviter, guild)
        });
    } catch (e) {}
});
//sunucudan üye gidince tetiklen
client.on('guildMemberRemove', member => {
    try {
        member.guild.invites.fetch().then(async guildInvites => {
            const inv = invites[member.guild.id];
            invites[member.guild.id] = guildInvites;
            if (!inv) return;
            await member.guild.invites.fetch().catch(() => undefined);
            const invite = guildInvites.find(i => {
                const a = inv.get(i.code);
                if (!a) return;
                return a
            });
            if (!invite) return;
            const inviter = client.users.cache.get(invite.inviter.id);
            const guild = member.guild;
            client.emit("KullaniciAyrilma", member, invite, inviter, guild)
        });
    } catch (e) {}
});
};

exports.inviteModule = inviteModule;
