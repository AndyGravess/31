const Discord = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Discord.Client();
const Jimp = require('jimp');
const prefix = 's!';
const db = require('croxydb');
const CroxyDB = require('croxydb');
const defaultPrefix = 's!';
const { Command } = require('discord.js-commando');
const path = require('path');
const ytdl = require('ytdl-core');
let saAsEnabled = false;
const snakeGames = new Map();
const afkData = new Map();
client.setMaxListeners(600000);

const specialServerId = '1195937731671494716';
const allowedRoleId = '1195937774151413771';



client.on('guildMemberAdd', member => {
  if (member.guild.id === specialServerId) {
    // Özel sunucuya yeni bir üye katıldığında
    const allowedRole = member.guild.roles.cache.get(allowedRoleId);

    if (allowedRole) {
      // Özel rolü ver
      member.roles.add(allowedRole);
    }
  }
});



// Botunuzun geri kalan kodu...

let küfürEngel = true;
const linkEngelMap = new Map();
const saAsEnabledMap = new Map();
const queue = new Map();
const cooldowns = new Map();
client.points = new Map();

let küfürEngelMap = new Map();
const ticketChannels = new Map();
let küfürEngelMapp = new Map();
let isSpamProtectionEnabled = true;
let spamMessages = new Map();
const xpPerMessage = 10;
const serverSettings = {};
const userData = {};
const userRoles = {};
const userRecords = {};
let levelLogChannel = null;
// Örnek ekonomi verileri

// Ekonomi verilerini saklamak için JSON dosyasının yolu

// Ekonomi verilerini yükleyin veya başlatın
const economy = {};

// Ekonomi verilerini dosyadan yükle






client.once('ready', () => {
    console.log('Bot hazır!');
     client.user.setActivity('Prefix: s!yardım', { type: 'PLAYING' });
       });

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});


    // Diğer kodlar...

client.on('message', async message => {
if (message.author.bot || !message.guild) return;
    
    // Kullanıcının XP'sini kontrol et ve güncelle
    
    const userId = message.author.id;
    userData[userId] = {
        xp: (userData[userId] ? userData[userId].xp : 0) + xpPerMessage
    };

    // Özel komutları işle
    if (message.content.toLowerCase() === 's!level') {
        // Kullanıcının seviyesini gönder
        const level = Math.floor(userData[userId].xp / 100); // Her 100 XP'de bir seviye atla
        message.channel.send(`${message.author}, seviyen: ${level}`);
    }
         if (message.content.toLowerCase() === 's!xp') {
        // Kullanıcının toplam XP'sini gönder
        const totalXP = userData[userId].xp;
        message.channel.send(`${message.author}, toplam XP'n: ${totalXP}`);
         }
       
    
// s!spamkoruma komutunu işlemek için
if (message.content.toLowerCase() === 's!spamkoruma') {
    
if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

    // Sunucunun ayarlarını kontrol et
    if (!serverSettings[message.guild.id]) {
        serverSettings[message.guild.id] = {
            isSpamProtectionEnabled: false,
            isCapsProtectionEnabled: false
        };
    }
    // Spam koruma durumunu tersine çevir
    const currentStatus = serverSettings[message.guild.id].isSpamProtectionEnabled;
    serverSettings[message.guild.id].isSpamProtectionEnabled = !currentStatus;
    const statusMessage = await message.channel.send(`Spam koruma ${serverSettings[message.guild.id].isSpamProtectionEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`);
    // Mesajı 3 saniye sonra sil
    setTimeout(() => {
        statusMessage.delete().catch(error => {
            console.error('Message deletion error:', error);
        });
    }, 3000);
} else if (serverSettings[message.guild.id]?.isSpamProtectionEnabled) {
    // Spam koruma etkinse
    
    if (!spamMessages.has(message.author.id)) {
        spamMessages.set(message.author.id, []);
    }
    const userSpamMessages = spamMessages.get(message.author.id);

    // Kullanıcının son 3 mesajını kontrol et
    userSpamMessages.push(message.content);
    if (userSpamMessages.length > 3) {
        userSpamMessages.shift(); // En eski mesajı kaldır
    }

    // Eğer son 3 mesaj aynı ise, spam olarak kabul et ve mesajı sil
    if (userSpamMessages.every(msg => msg === message.content)) {
        message.channel.send(`${message.author}, lütfen spam yapmayın.`)
            .then(sentMessage => {
                // Mesajı gönderdikten sonra 3 saniye sonra sil
                setTimeout(() => {
                    sentMessage.delete().catch(error => {
                        console.error('Message deletion error:', error);
                    });
                }, 3000);
            })
            .catch(error => {
                console.error('Message sending error:', error);
            });
        message.delete().catch(error => {
            console.error('Message deletion error:', error);
        });
    }
}
    
    const giveaways = new Map();

    
    
   
    
    
    
    
    
// Çekiliş komutunu işlemek için

// s!capskoruma komutunu işlemek için
if (message.content.toLowerCase() === 's!capskoruma') {
    
    if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
    
    // Sunucunun ayarlarını kontrol et
    if (!serverSettings[message.guild.id]) {
        serverSettings[message.guild.id] = {
            isSpamProtectionEnabled: false,
            isCapsProtectionEnabled: false
        };
    }
    // Caps koruma durumunu tersine çevir
    const currentStatus = serverSettings[message.guild.id].isCapsProtectionEnabled;
    serverSettings[message.guild.id].isCapsProtectionEnabled = !currentStatus;
    const statusMessage = await message.channel.send(`Caps koruma ${serverSettings[message.guild.id].isCapsProtectionEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`);
    // Mesajı 3 saniye sonra sil
    setTimeout(() => {
        statusMessage.delete().catch(error => {
            console.error('Message deletion error:', error);
        });
    }, 3000);
} else if (serverSettings[message.guild.id]?.isCapsProtectionEnabled && message.content === message.content.toUpperCase() && !message.content.includes('#') && !message.content.includes('@')) {
    // Caps koruma etkinse ve mesaj büyük harfle yazılmışsa, uyarı gönder ve mesajı sil
    message.channel.send(`${message.author}, lütfen büyük harflerle yazmayın.`)
        .then(sentMessage => {
            // Mesajı gönderdikten sonra 3 saniye sonra sil
            setTimeout(() => {
                sentMessage.delete().catch(error => {
                    console.error('Message deletion error:', error);
                });
            }, 3000);
        })
        .catch(error => {
            console.error('Message sending error:', error);
        });
    message.delete().catch(error => {
        console.error('Message deletion error:', error);
    });
}
    
      if (message.content.toLowerCase() === 's!yazitura') {
        const result = Math.random() < 0.5 ? 'yazi' : 'tura';
        message.channel.send(`Sonuç: ${result}`);
    }
    
    
     if (message.content.toLowerCase().startsWith('s!emoji-yazı')) {
        // Kullanım: s!emoji-yazı Merhaba
        const args = message.content.slice('s!emoji-yazı'.length).trim().split(/ +/);
        const yazı = args.join(' ');

        const emojiYazı = convertToEmoji(yazı);
        message.channel.send(emojiYazı);
    }


function convertToEmoji(text) {
    const emojiMap = {
     'a': '🅰️', 'b': '🅱️', 'c': '🇨', 'd': '🇩', 'e': '🇪',
        'f': '🇫', 'g': '🇬', 'h': '🇭', 'i': '🇮', 'j': '🇯',
        'k': '🇰', 'l': '🇱', 'm': '🇲', 'n': '🇳', 'o': '🅾️',
        'p': '🇵', 'q': '🇶', 'r': '🇷', 's': '🇸', 't': '🇹',
        'u': '🇺', 'v': '🇻', 'w': '🇼', 'x': '🇽', 'y': '🇾',
        'z': '🇿', '0': '0️⃣', '1': '1️⃣', '2': '2️⃣', '3': '3️⃣',
        '4': '4️⃣', '5': '5️⃣', '6': '6️⃣', '7': '7️⃣', '8': '8️⃣',
        '9': '9️⃣'
    };

    const convertedText = text.toLowerCase().split('').map(char => {
        return emojiMap[char] || char;
    }).join('');

    return convertedText;
}
    
    
    if (message.content.toLowerCase() === `${prefix}sa-as`) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Komutun çalışma durumunu tersine çevir
        saAsEnabled = !saAsEnabled;

        if (saAsEnabled) {
            return message.channel.send('Sa-As sistemi başarıyla açıldı.');
        } else {
            return message.channel.send('Sa-As sistemi başarıyla kapatıldı.');
        }
    }
    
    

    // Sa-As sistemi açıksa ve mesaj "sa" veya "selam" ise karşılık ver
    if (saAsEnabled && (message.content.toLowerCase() === 'sa' || message.content.toLowerCase() === 'selam')) {
        message.channel.send('Aleyküm Selam!');
    }

    
    
    
    const engelliKarakterler = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '{', '}', '[', ']', '|', ';', ':', '"', '\'', '<', '>', ',', '.', '/', '?', '`', '~', '\\'];
    
     if (linkEngelMap.get(message.guild.id) && message.content.match(/(https?:\/\/[^\s]+)/g)) {
        const link = message.content.match(/(https?:\/\/[^\s]+)/g)[0];

        // Engellenmiş karakterleri içeren linkleri kontrol et
        if (engelliKarakterler.some(char => link.includes(char))) {
            // Link bulundu, mesajı sil ve uyarı gönder
            message.delete();
             const silmeUyari = 'Belirli karakter(ler) içeren link paylaşmak yasaktır.';
            message.reply(silmeUyari).then(botMessage => {
                const silmeSuresi = 3000;
                setTimeout(() => {
                    botMessage.delete();
                }, silmeSuresi);
            });
        }
    }
    
      if (message.author.bot) return;
    if (!message.guild) return;
    
if (message.author.id === client.user.id) {
        return;
    }
    
const content = message.content.toLowerCase();
    
     if (message.content.toLowerCase() === 's!link-engel') {
        // İzin kontrolü, sadece belirli roller veya izinlere sahip kullanıcılar bu komutu kullanabilir
        if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.some(role => role.name === 'Link Yetkilisi')) {
            return message.reply('Bu komutu kullanma yetkiniz yok.');
        }

        // Link engelini açma veya kapatma
        if (!linkEngelMap.has(message.guild.id)) {
            linkEngelMap.set(message.guild.id, true);
            message.channel.send('Link engelleme aktif edildi.');
        } else {
            linkEngelMap.delete(message.guild.id);
            message.channel.send('Link engelleme deaktif edildi.');
        }
    }

if (message.content.toLowerCase() === 's!premium-küfür-engelle') {
    
    
    const specialServer = client.guilds.cache.get(specialServerId);
    const member = specialServer.members.cache.get(message.author.id);
    const allowedRole = specialServer.roles.cache.get(allowedRoleId);

    if (member && member.roles.cache.has(allowedRoleId)) {
         if (!küfürEngelMap.has(message.guild.id)) {
            küfürEngelMap.set(message.guild.id, false); // Varsayılan değer true olarak ayarlanır
        }
    

        // Komutu kullanan kişi yönetici izinlerine sahipse veya belirli bir role sahipse
        if (message.member.hasPermission('ADMINISTRATOR') || member.roles.cache.has(allowedRoleId)) {
            const mevcutAyar = küfürEngelMap.get(message.guild.id);
            küfürEngelMap.set(message.guild.id, !mevcutAyar);

            const durum = !mevcutAyar ? 'açık' : 'kapalı';
            message.channel.send(`Küfür engelleme durumu: ${durum}`);
        } else {
            message.reply('Bu komutu kullanma yetkiniz yok.');
            return;
        }
    } else {
        message.reply('Bu komutu kullanma yetkiniz yok.');
        return;
    }
} else if (küfürEngelMap.get(message.guild.id)) {
    // Küfür engel açıksa küfürleri kontrol et
    const content = message.content.toLowerCase();

    const prekufurListesi = ["sik", "am", "meme", 'piç', 'çük', 'piç kurusu', 'orospu', 'orospu çocuğu', 'amk', 'aq', 'awk', 'ak', 'yarrak', 'penis', 'göt', 'göt veren', 'salak', 'aptal', 'özürlü', 'gerizekalı', 'amcık', 'amık', 'amcıg', 'yarag' ,'31' ,'zik' ,'a.k', 'daşşak', 'taşşak', 'ananısikerim', 'ananı sikerim', 'ananı sikim', 'orospu çocukları', 'oç', 'amınakoyarım', 'amına koyarım', 'amına koyim', 'amına koyabilirmiyim', 'sex', 'porno', 'sikiş', 'brazzers', '7dak', 'doeda', 'pornhub', 'arka daşşaklar', 'otuz bir', 'p!ç', 'sg', 'skrm', 'sikerim', 'pic', 'awe', 'yrm', 'sq', 'oc', 'or', 'siktir git', 'yarram', 'otizmli', 'eşşek', 'ananın çürümüş bel kemiğinde', 'sokarım', 'ananın göt deliğini kocaman ederim', 'göt deliği', 'amcı', 'gavat']; 
    const küfürRegex = new RegExp(`\\b(?:${prekufurListesi.join('|')})\\b`, 'gi');
    
const contentLower = message.content.toLowerCase();

   if (küfürEngelMap.get(message.guild.id) && küfürRegex.test(contentLower)) {
    // Küfür algılandı, işlemleri gerçekleştir
    message.delete();
    const silmeUyari = 'Küfür içeren mesajlar göndermek yasaktır. Mesajınız silinmiştir.';
    message.reply(silmeUyari).then(botMessage => {
        const silmeSuresi = 3000;
        setTimeout(() => {
            botMessage.delete();
        }, silmeSuresi);
    });
}
}
    
    else if (message.content.toLowerCase() === 's!küfür-engelle') {
       
       
        // Map'te sunucu için bir giriş olup olmadığını kontrol et
        if (!küfürEngelMapp.has(message.guild.id)) {
            küfürEngelMapp.set(message.guild.id, false); // Varsayılan değer true olarak ayarlanır
        }

        // Komutu kullanan kişi yönetici izinlerine sahipse
        if (message.member.hasPermission('ADMINISTRATOR')) {
            let mevcutAyar = küfürEngelMapp.get(message.guild.id);
            küfürEngelMapp.set(message.guild.id, !mevcutAyar);

            const durum = !mevcutAyar ? 'açık' : 'kapalı';
            message.channel.send(`Küfür engelleme durumu: ${durum}`);
        } else {
            message.reply('Bu komutu kullanma yetkiniz yok.');
            return;
        }
        // Küfür engel açıksa küfürleri kontrol et
           } else if (küfürEngelMapp.get(message.guild.id)) {
           
            const content = message.content.toLowerCase();
        
        const kufurListesi = ["sik", "am", "meme", 'piç', 'çük', 'piç kurusu', 'orospu', 'orospu çocuğu', 'amk', 'aq', 'awk', 'ak', 'yarrak', 'penis', 'göt', 'göt veren', 'salak', 'aptal', 'özürlü', 'gerizekalı', 'amcık', 'amık'];

        // Her küfürü kontrol et
        for (const kufur of kufurListesi) {
        if (content.includes(` ${kufur} `) || content.startsWith(`${kufur} `) || content.endsWith(` ${kufur}`) || content === kufur) {
            message.delete();
            const silmeUyari = 'Küfür içeren mesajlar göndermek yasaktır. Mesajınız silinmiştir.';
            message.reply(silmeUyari).then(botMessage => {
                const silmeSuresi = 3000;
                setTimeout(() => {
                    botMessage.delete();
                }, silmeSuresi);
            });
            break;
            return;
        }
    }
}
    
    
    
  // Botun prefixini alır
  const guildPrefix = db.get(`prefix_${message.guild.id}`) || defaultPrefix;

  // Mesaj prefix ile başlamıyorsa veya botun etiketi ile başlamıyorsa işlemi durdur
  if (!message.content.startsWith(guildPrefix) && !message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return;
  }

  const args = message.content.slice(guildPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
    
    
    client.on('error', error => {
    console.error(`Bir hata oluştu: ${error}`);
});

function handleCommandError(error, message) {
    console.error(`Komut işlenirken bir hata oluştu: ${error}`);
    message.channel.send('Bir hata oluştu, lütfen daha sonra tekrar deneyin veya bot sahibine bildirin.');
}
    
  // Prefix değiştirme komutu
        if (command === 'kayıtrol') {
        // Kayıt rolünü belirleme komutu
        if (message.mentions.roles.size !== 1) {
            return message.channel.send('Kullanım: s!kayıtrol [rol]');
        }

        const role = message.mentions.roles.first();

        // Kullanıcının belirlediği rolü saklama
        userRoles[message.guild.id] = role;

        message.channel.send(`Kayıt için belirlenen rol: ${role.name}`);
    }

    if (command === 'kayıt') {
    // Kayıt işlemi
    if (args.length !== 2) {
        return message.channel.send('Kullanım: s!kayıt [isim] [yaş]');
    }

    const [isim, yaş] = args;

    // Kullanıcının belirlediği rolü al
    const role = userRoles[message.guild.id];
    if (!role) {
        return message.channel.send('Kayıt için önce bir rol belirlemelisiniz. s!kayıtrol komutunu kullanarak belirleyebilirsiniz.');
    }

    // Kullanıcıya rolü ver
    try {
        const member = message.guild.members.cache.get(message.author.id);
        await member.roles.add(role);
        message.channel.send(`Başarıyla kaydoldunuz! ${role.name} rolü alındı.`);

        // Kayıt bilgilerini saklama
        userRecords[message.author.id] = {
            isim: isim,
            yaş: yaş,
            kayıtTarihi: new Date(),
            rol: role.name
        };
    } catch (error) {
        console.error('Kayıt sırasında bir hata oluştu:', error);
        message.channel.send('Kayıt sırasında bir hata oluştu.');
    }
}
    
    let levelLogChannel;

    if (content.startsWith('s!level-log')) {
        // Log kanalını ayarla
        const logChannelArg = args[0];

        if (!logChannelArg) {
            message.channel.send('Kullanım: s!level-log #level-up');
        } else {
            const logChannel = message.mentions.channels.first();
            if (logChannel) {
                // Log kanalını ayarla
                levelLogChannel = logChannel;
                message.channel.send(`Level log kanalı başarıyla ${logChannel} olarak ayarlandı.`);
            } else {
                message.channel.send('Geçersiz kanal.');
            }
        }
    } else {
        // Kullanıcının seviyesini kontrol et
       const currentLevel = Math.floor(userData[userId].xp / 100);
const newLevel = Math.floor((userData[userId].xp + xpPerMessage) / 100);

// Level atlandıysa ve log kanalı ayarlandıysa mesaj gönder
if (newLevel > currentLevel && levelLogChannel) {
    const user = message.author;
    levelLogChannel.send(`Tebrikler ${user}, 1 level oldunuz!`);
}
    }
    
    if (command === 'kayıtbilgi') {
        // Kayıt bilgisi gösterme komutu
        const user = message.mentions.users.first() || message.author;
        const record = userRecords[user.id];
        if (!record) {
            return message.channel.send('Kullanıcı kayıtlı değil.');
        }

        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${user.tag} Kayıt Bilgisi`)
            .addFields(
                { name: 'İsim', value: record.isim },
                { name: 'Yaş', value: record.yaş },
                { name: 'Kayıt Tarihi', value: record.kayıtTarihi.toLocaleString() },
                { name: 'Rol', value: record.rol }
            );

        message.channel.send(embed);
    }

const serverUserRecords = {}; // Sunucu kimliğine göre kullanıcı kayıtlarını tutacak nesne

// Her sunucuda ayrı kayıt listesi
if (command === 'kayıtliste') {
    // Sunucunun kimliğini al
    const guildId = message.guild.id;

    // Eğer sunucu için kayıtlar yoksa, boş bir nesne oluştur
    if (!serverUserRecords[guildId]) {
        return message.channel.send('Bu sunucuda henüz kayıt yapılmamış.');
    }

    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Kayıtlı Kullanıcılar');

    // Sunucu kayıtlarını al
    const userRecords = serverUserRecords[guildId];

    // Her bir kullanıcı için kayıt bilgilerini embed'e ekle
    Object.keys(userRecords).forEach(userId => {
        const user = client.users.cache.get(userId);
        const record = userRecords[userId];
        embed.addField(`${user.tag}`, `İsim: ${record.isim}, Yaş: ${record.yaş}, Kayıt Tarihi: ${record.kayıtTarihi.toLocaleString()}, Rol: ${record.rol}`);
    });

    message.channel.send(embed);
}
    if (command === 'kayıtiptal') {
        // Kayıt iptal etme komutu
        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send('Kullanıcı belirtmelisiniz.');
        }

        const member = message.guild.members.cache.get(user.id);
        const record = userRecords[user.id];
        if (!record) {
            return message.channel.send('Kullanıcı kayıtlı değil.');
        }

        const role = message.guild.roles.cache.find(role => role.name === record.rol);
        if (!role) {
            return message.channel.send('Kayıt rolü bulunamadı.');
        }

        // Kullanıcıdan rolü kaldır
        try {
            await member.roles.remove(role);
            message.channel.send(`Kullanıcının kaydı iptal edildi. ${role.name} rolü alındı.`);
            delete userRecords[user.id];
        } catch (error) {
            console.error('Kayıt iptal sırasında bir hata oluştu:', error);
            message.channel.send('Kayıt iptal sırasında bir hata oluştu.');
        }
    }
   
    
if (command === 'emoji-ekle') {
        // Kullanıcının bu komutu kullanma izni olup olmadığını kontrol et
        const member = message.guild.members.cache.get(message.author.id);
        if (!member || !(member.roles.cache.has(allowedRoleId) || member.hasPermission('MANAGE_EMOJIS'))) {
    return message.reply('Bu komutu kullanma izniniz yok.');
        }

        // Kullanıcının eklemek istediği emojiyi al
        const emojiArg = message.content.slice(prefix.length + 'emoji-ekle'.length).trim().split(/ +/)[0];
        const customEmojiRegex = /<a?:[a-zA-Z0-9_]+:[0-9]+>/; // Özel emoji regex
        const match = emojiArg.match(customEmojiRegex);

        if (!match) {
            return message.reply('Lütfen bir özel emoji kullanın.');
        }

        const emojiId = match[0].split(':')[2].slice(0, -1);
        const emoji = await message.guild.emojis.create(`https://cdn.discordapp.com/emojis/${emojiId}.png`, emojiId);

        message.reply(`Yeni emoji eklendi: ${emoji}`);
    }
    
    
    const welcomeChannels = {};

        // Sunucu ID'sine özel sa-as durumunu al
    
    // Sa-As sistemi açıksa ve mesaj "sa" veya "selam" ise karşılık ve
   
    
    
     if (command === 'rolekle') {
        // İzin kontrolü
          if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
        // Kullanım: !rolekle @kullanıcı @rol
        rolekle(message, args);
    } else if (command === 'rolal') {
        // İzin kontrolü
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
        // Kullanım: !rolal @kullanıcı @rol
        rolal(message, args);
    }


function rolekle(message, args) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role) {
        return message.reply('Kullanım: s!rolekle @kullanıcı @rol');
    }

    member.roles.add(role)
        .then(() => message.reply(`Rol başarıyla eklendi: ${role.name}`))
        .catch(error => {
            console.error(error);
            message.reply('Rol eklenirken bir hata oluştu.');
        });
}

function rolal(message, args) {
    const member = message.mentions.members.first();
    const role = message.mentions.roles.first();

    if (!member || !role) {
        return message.reply('Kullanım: s!rolal @kullanıcı @rol');
    }

    member.roles.remove(role)
        .then(() => message.reply(`Rol başarıyla alındı: ${role.name}`))
        .catch(error => {
            console.error(error);
            message.reply('Rol alınırken bir hata oluştu.');
        });
}
    
  
    

    
    
  if (command === 'tum-sunucu-rolleri') {
    // Botun giriş yaptığı tüm sunucuları al
    client.guilds.cache.forEach(guild => {
      let guildRoles = '';
      guild.roles.cache.forEach(role => {
        guildRoles += `${role.name}\n`;
      });
      // Sunucunun adı ve rollerin listesiyle birlikte gönder
      message.channel.send(`**${guild.name} Sunucusundaki Roller**\n${guildRoles}`);
    });
  }

    
    
    
    
    
      if (command === 'kanalsil') {
        // İzin kontrolü
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
        // Kullanım: !kanalsil <kanalAdı veya kanalEtiketi>
        kanalSil(message, args);
    }
    
        

function kanalSil(message, args) {
    const channelID = args[0].replace(/\D/g, ''); // Sadece sayısal kısmı al

    if (!channelID) {
        return message.reply('Belirtilen kanal bulunamadı!');
    }

    const channel = message.guild.channels.cache.get(channelID);

    if (!channel) {
        return message.reply('Belirtilen kanal bulunamadı!');
    }

    channel.delete()
        .then(() => message.reply(`Kanal başarıyla silindi: ${channel.name}`))
        .catch(error => {
            console.error(error);
            message.reply('Kanal silinirken bir hata oluştu.');
        });
}


      if (command === 'alkış') {
    const applauseEmojis = '👏👏👏';
    message.channel.send(`${message.author.username} alkışlıyor! ${applauseEmojis}`);
  }
    
    
    
   if (command === 'mesajgonder') {
       try {
        const specialServer = client.guilds.cache.get(specialServerId);
        const member = specialServer.members.cache.get(message.author.id);
        const allowedRole = specialServer.roles.cache.get(allowedRoleId);
        const gonderilecekMetin = args.join(' ');
           
        message.delete();
           
           
        // Mesajı gönder
        const sentMessage = await message.channel.send(gonderilecekMetin);

        // Başarıyla gönderilen mesaj hakkında bilgi yazdır
        console.log(`Mesaj başarıyla gönderildi: ${sentMessage.content}`);
    } catch (error) {
        // Hata varsa konsola yazdır
        console.error('Bir hata oluştu:', error);
        message.reply('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
}
    
    

if (command === 'karşılama-ekranı') {
    // Kullanıcının sadece sunucu sahibi olup olmadığını kontrol et
    if (message.author.id !== message.guild.ownerID && !message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanma izniniz yok.');
    }

    // Kullanıcının belirtilen bir kanalı etiketlediğinden emin ol
    const channel = message.mentions.channels.first();
    if (!channel) {
        return message.reply('Lütfen bir kanal etiketleyin.');
    }

    // Eğer hoş geldin mesajları kanalı zaten ayarlanmışsa uyarı ver
    const welcomeChannelID = db.get(`welcomeChannels.${message.guild.id}`);
    if (welcomeChannelID) {
        return message.reply('Hoş geldin mesajları kanalı zaten ayarlanmış. Lütfen sıfırlamak için s!karşılama-ekranı-sıfırla komutunu kullanın.');
    }

    // Sunucu ID'sine göre hoş geldin kanalını sakla
    db.set(`welcomeChannels.${message.guild.id}`, channel.id);

    message.reply(`Hoş geldin mesajlarını ${channel} kanalına ayarlandı.`);
} else if (command === 'karşılama-ekranı-sıfırla') {
    // Kullanıcının sadece sunucu sahibi olup olmadığını kontrol et
    if (message.author.id !== message.guild.ownerID && !message.member.permissions.has('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanma izniniz yok.');
    }

    // Eğer hoş geldin mesajları kanalı zaten ayarlanmamışsa uyarı ver
    const welcomeChannelID = db.get(`welcomeChannels.${message.guild.id}`);
    if (!welcomeChannelID) {
        return message.reply('Hoş geldin mesajları kanalı zaten ayarlanmamış.');
    }

    db.delete(`welcomeChannels.${message.guild.id}`);

    message.reply('Hoş geldin mesajları kanalı sıfırlandı.');
}
    
    
    
    
if (command === 'afk') {
    try {
        const key = `${message.guild.id}-${message.author.id}`;
        const status = afkData.get(key);

        if (!status) {
            const reason = args.join(' ') || 'Belirtilmedi';
            afkData.set(key, {
                guild: message.guild.id,
                user: message.author.id,
                reason: reason,
            });

            message.reply(`AFK moduna geçtin. Sebep: ${reason}`);
        } else {
            afkData.delete(key);
            message.reply('AFK modundan çıktın.');
        }
    } catch (error) {
        console.error('AFK komutunda bir hata oluştu:', error);
        message.reply('AFK modu sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
}

// Mesajı işlemeden önce kullanıcının afk olup olmadığını kontrol et
const afkKey = `${message.guild.id}-${message.author.id}`;
const afkStatus = afkData.get(afkKey);

if (afkStatus) {
    const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`${message.author}, AFK durumunda. Sebep: ${afkStatus.reason}`);

    // Mesajın 5 saniye sonra silinmesi için setTimeout kullanılıyor
    message.reply({ embeds: [embed] }).then(reply => {
        setTimeout(() => {
            reply.delete();
        }, 5000);
    });

    // Eğer mesajı atan kullanıcı afk değilse ve afk olan bir kişiye etiket atarsa, etiketlenen mesajı sil
    if (!afkStatus && message.mentions.members.size > 0) {
        message.delete();
    }
}
    
 
    if (command === 'avatar') {
    try {
        const mentionedUser = message.mentions.users.first() || message.author;

        const avatarEmbed = new Discord.MessageEmbed()
            .setTitle(`${mentionedUser.tag}'ın Avatarı`)
            .setImage(mentionedUser.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('RANDOM');

        message.channel.send(avatarEmbed);
    } catch (error) {
        console.error('Avatar gösterme hatası:', error);
        message.reply('Avatar gösterme sırasında bir hata oluştu.');
    }
}


    
if (command === 'otorol-ayarla') {
    try {
        
     if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
        // Otorol ayarlama komutu
        let otorol = message.mentions.roles.first();
        if (!otorol) return message.reply('Lütfen bir rol etiketleyin.');

        // Otorolü sunucu veritabanına kaydetme
        // Bu örnekte croxydb kullanıldığı varsayılmıştır
        db.set(`otorol_${message.guild.id}`, otorol.id);
        message.channel.send(`Otorol başarıyla ${otorol} olarak ayarlandı.`);
    } catch (error) {
        console.error('Otorol ayarlama hatası:', error);
        message.reply('Otorol ayarlama sırasında bir hata oluştu.');
    }
}

client.on('guildMemberAdd', member => {
    console.log(`${member.user.tag} sunucuya katıldı.`);
    // Sunucuya yeni bir üye katıldığında çalışacak kod
    try {
        const otorolID = db.get(`otorol_${member.guild.id}`);
        if (otorolID) {
            const otorol = member.guild.roles.cache.get(otorolID);
            if (otorol) {
                if (!member.roles.cache.has(otorol.id)) { // Kullanıcı otorolu zaten almamışsa
                    member.roles.add(otorol)
                        .then(() => console.log(`${member.user.tag} kullanıcısına otorol başarıyla verildi.`))
                        .catch(error => {
                            console.error('Otorol verme hatası:', error);
                            // Otorol verme sırasında bir hata olursa bot çökmesin
                        });
                }
            } else {
                console.error('Belirtilen otorol bulunamadı.');
                return;
            }
        }
    } catch (error) {
        console.error('Otorol atama hatası:', error);
    }
});
    
    
    
  if (command === 'ping') {
    try {
        const pingEmbed = new Discord.MessageEmbed()
            .setTitle('Botun pingi ölçülüyor...! 🏓')
            .addField('Bot Gecikmesi', `${Date.now() - message.createdTimestamp} ms`, true)
            .addField('API Gecikmesi', `${Math.round(client.ws.ping)} ms`, true)
            .setColor('GREEN');

        message.channel.send(pingEmbed);
    } catch (error) {
        console.error('Ping komutunda bir hata oluştu:', error);
        message.reply('Ping komutu sırasında bir hata oluştu.');
    }
}
        
        
    
    
   if (command === 'kullanıcı-bilgi') {
    try {
        // Etiketlenen kullanıcıyı al veya mesajı gönderen kullanıcıyı hedef olarak belirle
        const targetUser = message.mentions.users.first() || message.author;

        // Hedef kullanıcının sunucudaki üye nesnesini al
        const member = message.guild.member(targetUser);

        // Kullanıcının katılma tarihini yerel tarih dizgisine dönüştür
        const joinedAt = member.joinedAt.toLocaleDateString();

        // Kullanıcının oluşturulma tarihini yerel tarih dizgisine dönüştür
        const createdAt = targetUser.createdAt.toLocaleDateString();

        // Embed mesaj oluştur
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Kullanıcı Bilgisi')
            .addFields(
                { name: 'Kullanıcı adı', value: targetUser.tag },
                { name: 'Katılma tarihi', value: joinedAt },
                { name: 'Oluşturulma tarihi', value: createdAt },
                { name: 'Kullanıcı ID', value: targetUser.id },
                { name: 'Sunucuya katılma sırası', value: member.guild.memberCount }
            );

        // Embed mesajı gönder
        message.channel.send(embedMessage);

        // Platform bilgisi
        const platform = "Discord";
        console.log(`Kullanıcı bilgisi alındı. Platform: ${platform}, Kullanıcı ID: ${targetUser.id}`);
        
        // E-posta bilgisi
        const email = "örnek@email.com";
        console.log(`Kullanıcı bilgisi alındı. E-posta: ${email}`);
    } catch (error) {
        // Hata durumunda konsola hata yazdır ve kullanıcıya hata mesajı gönder
        console.error('Kullanıcı bilgi hatası:', error);
        message.reply('Kullanıcı bilgileri alınırken bir hata oluştu.');
    }
}
    
    
    if (command === 'kurucu-kim') {
    try {
        // Sunucunun sahibini al
        const guildOwner = message.guild.owner;

        // Kurucu bilgilerini mesaj olarak gönder
        message.channel.send(`Sunucunun kurucusu: ${guildOwner.user.tag}`);
    } catch (error) {
        console.error('Kurucu bilgi hatası:', error);
        message.reply('Sunucunun kurucusunu alınırken bir hata oluştu.');
    }
}
    
    if (command === 'yavaş-mod') {
    try {
        // İzin kontrolü
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Argümanların kontrolü
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const delay = parseInt(args[1]); // Yavaş mod gecikme süresi (saniye cinsinden)

        if (isNaN(delay) || delay < 0 || delay > 219999999) { // 0 ile 21600 saniye (6 saat) arasında olmalıdır
            return message.reply('Geçerli bir yavaş mod süresi belirtin (0 ile 21600 arasında, saniye cinsinden).');
        }

        // Yavaş modu ayarla
        message.channel.setRateLimitPerUser(delay)
            .then(() => {
                message.channel.send(`Kanalın yazma süresi başarıyla ${delay} saniye olarak ayarlandı.`);
            })
            .catch(error => {
                console.error('Yavaş mod ayarlama hatası:', error);
                message.reply('Yavaş mod ayarlama sırasında bir hata oluştu: ' + error.message);
            });
    } catch (error) {
        console.error('Yavaş mod komutu hatası:', error);
        message.reply('Yavaş mod komutu çalıştırılırken bir hata oluştu: ' + error.message);
    }
}
    
    if (command === 'lock') {
    try {
        // İzin kontrolü
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Kanalı al
        const channel = message.mentions.channels.first() || message.channel;

        // Kanalı kitle
        channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false })
            .then(() => {
                message.channel.send(`#${channel.name} kanalı başarıyla kilitlendi.`);
            })
            .catch(error => {
                console.error('Kanal kilitleme hatası:', error);
                message.reply('Kanalı kitleme sırasında bir hata oluştu.');
            });
    } catch (error) {
        console.error('Lock komutu hatası:', error);
        message.reply('Lock komutu çalıştırılırken bir hata oluştu.');
    }
}
    
    if (command === 'unlock') {
    try {
        // İzin kontrolü
        if (!message.member.hasPermission('MANAGE_CHANNELS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Kanalı al
        const channel = message.mentions.channels.first() || message.channel;

        // Kanalın kilidini kaldır
        channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true })
            .then(() => {
                message.channel.send(`#${channel.name} kanalının kilidi başarıyla kaldırıldı.`);
            })
            .catch(error => {
                console.error('Kanal kilidini kaldırma hatası:', error);
                message.reply('Kanalın kilidini kaldırma sırasında bir hata oluştu.');
            });
    } catch (error) {
        console.error('Unlock komutu hatası:', error);
        message.reply('Unlock komutu çalıştırılırken bir hata oluştu.');
    }
}
    
    if (command === 'isim-değiştir') {
    try {
        // İzin kontrolü
        if (!message.member.hasPermission('MANAGE_NICKNAMES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Etiketlenen kullanıcıyı al
        const targetUser = message.mentions.members.first();
        if (!targetUser) {
            return message.reply('Lütfen bir kullanıcı etiketleyin.');
        }

        // Yeni ismi al
        const newName = args.slice(1).join(' ');
        if (!newName) {
            return message.reply('Lütfen yeni bir isim belirtin.');
        }

        // Kullanıcının ismini değiştir
        targetUser.setNickname(newName)
            .then(() => {
                message.channel.send(`${targetUser} kullanıcısının ismi başarıyla "${newName}" olarak değiştirildi.`);
            })
            .catch(error => {
                console.error('İsim değiştirme hatası:', error);
                message.reply('İsim değiştirilirken bir hata oluştu.');
            });
    } catch (error) {
        console.error('İsim değiştirme komutu hatası:', error);
        message.reply('İsim değiştirme komutu çalıştırılırken bir hata oluştu.');
    }
    }
     

 if (command === 'bakiye') {
    try {
        // Kullanıcının bakiyesini al
        const userID = message.author.id;
        let bakiye = db.get(`kullanici_${userID}.bakiye`) || 0;

        // Embed mesaj oluşturma
        const bakiyeEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(':coin: **Bakiye**')
            .setDescription(`**Bakiyeniz: ${bakiye} XQ.**`);
message.channel.send(bakiyeEmbed);
        // Mesajı gönderme
        
    } catch (error) {
        console.error('Bakiye alımı hatası:', error);
        message.reply('Bakiye alırken bir hata oluştu.');
    }

    } else if (command === 'çıkar') {
    try {
        // Kullanıcının bakiyesini al
        const userID = message.author.id;
        let kullaniciBakiyesi = db.get(`kullanici_${userID}.bakiye`) || 0;

        // Çıkarılacak miktarı belirleme
        const cikarilacakMiktar = parseInt(args[0]);
        
        // Geçerli bir miktar mı kontrol etme
        if (!cikarilacakMiktar || isNaN(cikarilacakMiktar) || cikarilacakMiktar <= 0) {
            return message.reply('Lütfen geçerli bir miktar girin.');
        }

        // Kullanıcının bakiyesinden çıkarma işlemi
        if (kullaniciBakiyesi < cikarilacakMiktar) {
            return message.reply('Yetersiz bakiye. İşlemi gerçekleştiremiyorum.');
        }

        kullaniciBakiyesi -= cikarilacakMiktar;
        db.set(`kullanici_${userID}.bakiye`, kullaniciBakiyesi);

        // Başarılı bir şekilde çıkarma işlemi mesajı gönderme
        message.reply(`${cikarilacakMiktar} XQ başarıyla hesabınızdan çıkarıldı. Güncel bakiyeniz: ${kullaniciBakiyesi}`);
    } catch (error) {
        console.error('Para çıkarma hatası:', error);
        message.reply('Para çıkarma işleminde bir hata oluştu.');
    }
    
} else if (command === 'çalış') {
    const user = message.author;
    const currentTime = Date.now();
    const cooldownTime = 900 * 1000; // 15 saniye

    try {
        // Kullanıcının son çalışma zamanını al
        const lastExecutionTime = db.get(`cooldowns.${user.id}`) || 0;

        if (currentTime - lastExecutionTime < cooldownTime) {
            const remainingTime = (cooldownTime - (currentTime - lastExecutionTime)) / 1000;
            const remainingTimeString = remainingTime.toFixed(1);

            const cooldownEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:stopwatch: Cooldown`)
                .setDescription(`**${user.username}**, sadece 15 dakikada bir bu komutu kullanabilirsiniz!\nKalan süre: ${remainingTimeString} saniye.`);

            message.channel.send(cooldownEmbed);
        } else {
            const successRate = 1; // Başarı şansı (örneğin %80)
            const kazanç = Math.random() < successRate ? Math.floor(Math.random() * 6000) + 1 : 0; // Rastgele bir kazanç belirleme

            // Para kazanma işlemi gerçekleştirildiği zamanı kaydet
            db.set(`cooldowns.${user.id}`, currentTime);

            // Kullanıcının bakiyesini güncelle
            let bakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;
            bakiye += kazanç;
            db.set(`kullanici_${user.id}.bakiye`, bakiye);

            if (kazanç > 0) {
                const kazancEmbed = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setTitle(`:money_with_wings: Çalışma`)
                    .setDescription(`**${user.username}**, çalışarak ${kazanç} XQ kazandınız!`);

                message.channel.send(kazancEmbed);
            } else {
                const noKazancEmbed = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle(`:cry: Çalışma`)
                    .setDescription(`**${user.username}**, ne yazık ki bu sefer hiç XQ kazanamadınız.`);

                message.channel.send(noKazancEmbed);
            }
        }
    } catch (error) {
        console.error('Çalışma hatası:', error);
        message.reply('Çalışırken bir hata oluştu.');
    }

         
} else if (command === 'paraekle') {
    if (message.author.id !== '990102988225929296') {
        message.channel.send("Bu komutu kullanma izniniz yok!");
        return;
    }

    const user = message.mentions.users.first();
    if (!user) {
        message.channel.send("Kullanıcı belirtilmedi!");
        return;
    }

    const miktar = parseInt(args[1]);
    if (!miktar || miktar <= 0 || isNaN(miktar)) {
        message.channel.send('Geçersiz miktar!');
        return;
    }

    let bakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;
    bakiye += miktar;
    db.set(`kullanici_${user.id}.bakiye`, bakiye);

    message.channel.send(`${user.username}'ın hesabına ${miktar} XQ eklendi.`);


    } else if (command === 'envanter') {
    const user = message.author;

    let envanter = db.get(`kullanici_${user.id}.envanter`);
    if (!envanter || envanter.length === 0) {
        message.channel.send("Envanterinizde hiçbir şey yok.");
        return;
    }

    const envanterEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`:package: ${user.username}'in Envateri`)
        .setDescription(envanter.map(item => `**${item.item}:** ${item.miktar} adet`).join('\n'));
    message.channel.send(envanterEmbed);


} else if (command === 'transfer') {
    const user = message.author;
    const targetUser = message.mentions.users.first();
    const transferAmount = parseInt(args[1]);

    if (!targetUser || !transferAmount || isNaN(transferAmount) || transferAmount <= 0) {
        message.channel.send('Geçersiz transfer işlemi! Kullanım: `transfer <hedef_kullanıcı> <miktar>`');
        return;
    }

    let userBakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;
    if (userBakiye < transferAmount) {
        message.channel.send('Yetersiz bakiye!');
        return;
    }

    let targetBakiye = db.get(`kullanici_${targetUser.id}.bakiye`) || 0;
    userBakiye -= transferAmount;
    targetBakiye += transferAmount;
    db.set(`kullanici_${user.id}.bakiye`, userBakiye);
    db.set(`kullanici_${targetUser.id}.bakiye`, targetBakiye);

    message.channel.send(`**:money_with_wings: | ${user.username}, ${targetUser.username} kullanıcısına ${transferAmount} XQ transfer etti!**`);

} else if (command === 'sifirla' && message.author.id === '990102988225929296') {
      try {
        // Etiketlenen kullanıcının bakiyesini sıfırlama
        const user = message.mentions.users.first();
        if (!user) return message.reply('Lütfen bir kullanıcı etiketleyin.');

        const userID = user.id;
        let bakiye = db.get(`kullanici_${userID}.bakiye`) || 0;

        // Bakiyeyi sıfırlama
        if (bakiye > 1) {
            bakiye = 1;
        }

        db.set(`kullanici_${userID}.bakiye`, bakiye);

        // Mesajı gönderme
        message.channel.send(`${user.username} kullanıcısının bakiyesi sıfırlandı, ancak 1 XQ saklandı.`);

    } catch (error) {
        console.error('Bakiye sıfırlama hatası:', error);
        message.reply('Bakiye sıfırlanırken bir hata oluştu.');
    }
    




} else if (command === 'top') {
    const guild = message.guild; // Sunucuyu al
    const allData = db.all();
    const topList = [];

    // Kullanıcı verilerini filtreleme
    for (const key in allData) {
        if (key.startsWith("kullanici_")) {
            const userData = allData[key];
            const userID = key.replace("kullanici_", "");
            // Sadece sunucudaki kullanıcıları dikkate al
            const member = guild.members.cache.get(userID);
            if (member) {
                topList.push({ member: member, bakiye: userData.bakiye || 0 });
            }
        }
    }

    // Bakiyeye göre sıralama
    topList.sort((a, b) => b.bakiye - a.bakiye);

    // En zenginler listesi oluşturma
    const topEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:trophy: En Zenginler`)
        .setDescription(`**En Zenginler Listesi**\n\n${topList.slice(0, 10).map((entry, index) => `${index + 1}. ${entry.member} - ${entry.bakiye} XQ`).join('\n')}`);

    // Mesajı gönderme
    message.channel.send(topEmbed);

} else if (command === 'savas') {
    const user = message.author;
    const opponent = message.mentions.users.first(); // Savaşın yapıldığı kişi
    const bakiyeMiktarı = 1500; // Savaşta kazanılan veya kaybedilen sike miktarı

    // Kullanıcının belirtilen kişiyle savaşması
    if (!opponent) {
        return message.reply("Lütfen savaşmak istediğiniz bir kişiyi etiketleyin.");
    }

    // Savaşın yapıldığı kişinin kendisi olmamasını kontrol etme
    if (opponent.id === user.id) {
        return message.reply("Kendinizle savaşamazsınız!");
    }

    // Savaş sonucunu belirleme
    const userRoll = Math.floor(Math.random() * 100) + 1; // Kullanıcının zar atışı
    const opponentRoll = Math.floor(Math.random() * 100) + 1; // Rakibin zar atışı

    let winner, loser;
    if (userRoll > opponentRoll) {
        winner = user;
        loser = opponent;
    } else if (userRoll < opponentRoll) {
        winner = opponent;
        loser = user;
    } else {
        return message.reply("Savaş berabere! Başka bir zaman tekrar deneyin.");
    }

    // Kazanan ve kaybedenin sikke miktarlarını güncelleme
    db.add(`bakiye.${winner.id}`, bakiyeMiktarı);
    db.subtract(`bakiye.${loser.id}`, bakiyeMiktarı);

    // Kazanan ve kaybedenin bildirimlerini gönderme
    const battleEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle(`:crossed_swords: Savaş Sonucu`)
        .setDescription(`**${winner.username}** kazandı ve ${bakiyeMiktarı} sikke kazandı!\n**${loser.username}** kaybetti ve ${bakiyeMiktarı} sikke kaybetti.`);
    
    message.channel.send(battleEmbed);

} else if (command === 'kredi') {
    const user = message.author;
    const krediLimiti = 20000;
    const anaMiktar = 100;
    const faizOrani = 1;
    const maksimumKrediSayisi = user.id === message.guild.ownerID ? 5 : 2;

    let userBakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;
    let userBorclar = db.get(`kullanici_${user.id}.borclar`) || [];

    if (userBorclar.length > 0) {
        message.channel.send('Önceki borcunuzu ödeyin!');
        return;
    }

    if (args.length !== 1) {
        message.channel.send('Geçersiz kullanım! Kullanım: `s!kredi <miktar>`');
        return;
    }

    const talepMiktari = parseInt(args[0]);
    if (isNaN(talepMiktari) || talepMiktari <= 0) {
        message.channel.send('Geçersiz kredi miktarı!');
        return;
    }

    if (talepMiktari > krediLimiti) {
        message.channel.send(`Üzgünüz, maksimum kredi miktarı ${krediLimiti} XQ.`);
        return;
    }

    const toplamBorc = userBorclar.reduce((acc, curr) => acc + curr.miktar, 0);
    if (toplamBorc + talepMiktari > krediLimiti * maksimumKrediSayisi) {
        message.channel.send(`Üzgünüz, maksimum ${maksimumKrediSayisi} kredi alabilirsiniz.`);
        return;
    }

    const geriÖdemeMiktarı = talepMiktari * (1 + faizOrani);
    userBakiye += talepMiktari;
    userBorclar.push({ miktar: talepMiktari, geriÖdemeMiktarı: geriÖdemeMiktarı });
    db.set(`kullanici_${user.id}.bakiye`, userBakiye);
    db.set(`kullanici_${user.id}.borclar`, userBorclar);

    const krediAlmaEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:money_with_wings: Kredi`)
        .setDescription(`**${user.username}**, ${talepMiktari} XQ kredi aldınız. Geri ödeme miktarı (faiz ile birlikte): ${geriÖdemeMiktarı} XQ.`);
    message.channel.send(krediAlmaEmbed);


    } else if (command === 'öde') {
    const user = message.author;
    let userBorclar = db.get(`kullanici_${user.id}.borclar`) || [];

    if (!userBorclar || userBorclar.length === 0) {
        message.channel.send('Ödenecek bir borcunuz bulunmamaktadır.');
        return;
    }

    const borç = userBorclar[0];
    userBorclar.shift();

    let userBakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;
    const geriÖdemeMiktarı = Math.min(userBakiye, borç.miktar);
    userBakiye -= geriÖdemeMiktarı;
    db.set(`kullanici_${user.id}.bakiye`, userBakiye);
    db.set(`kullanici_${user.id}.borclar`, userBorclar);

    const ödemeEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:money_with_wings: Borç Ödeme`)
        .setDescription(`**${user.username}**, ${geriÖdemeMiktarı} sikke borcunuzu ödediniz.`);
    message.channel.send(ödemeEmbed);

    
} else if (command === 'zar-at') {
    const user = message.author;
    const zarAtmaCooldown = 2 * 60 * 60 * 1000; // 2 saat
    const lastRollTime = db.get(`rollCooldowns.${user.id}`) || 0;
    const currentTime = Date.now();

    if (currentTime - lastRollTime < zarAtmaCooldown) {
        const remainingTime = zarAtmaCooldown - (currentTime - lastRollTime);
        const remainingHours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const remainingMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        
        const cooldownEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`:stopwatch: Cooldown`)
            .setDescription(`**${user.username}**, bir sonraki zar atmanız için ${remainingHours} saat ${remainingMinutes} dakika beklemelisiniz.`);
        
        message.channel.send(cooldownEmbed);
        return;
    } else {
        // Kullanıcının son zar atma zamanını güncelle
        db.set(`rollCooldowns.${user.id}`, currentTime);

        // Kullanıcının mevcut parasını al
        let userMoney = db.get(`userMoney.${user.id}`) || 0;

        // Zar atma işleminden kazanılan parayı hesapla
        let paraKazancı = Math.floor(Math.random() * 10000) + 1;

        // Kullanıcının parasını güncelle
        userMoney += paraKazancı;
        db.set(`userMoney.${user.id}`, userMoney);

        // Sonucu kullanıcıya bildir
        if (paraKazancı <= 5000) {
            const rollEmbed = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle(`:moneybag: XQ Geldi`)
                .setDescription(`**${user.username}**, zar attınız ve ${paraKazancı} XQ kazandınız! Yeni bakiyeniz: ${userMoney} XQ`);
            message.channel.send(rollEmbed);
        } else {
            const rollEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:money_with_wings: XQ Gelmedi`)
                .setDescription(`**${user.username}**, zar attınız ama bu sefer XQ gelmedi.`);
            message.channel.send(rollEmbed);
        }
    }


} else if (command === 'mağaza') {
    const user = message.author;

    const magazaEmbed = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setTitle(`:shopping_cart: Mağaza`)
        .setDescription(`**${user.username}, mağazaya hoş geldiniz! İşte satın alabileceğiniz ürünler:\n\nKasalar:\n1. Bronz Kasa - 50000 XQ\n2. Gümüş Kasa - 150000 XQ\n3. Demir Kasa - 300000 XQ\n4. Altın Kasa - 1000000 XQ\n5. Elmas Kasa - 5000000 XQ\n6. Ruby Kasa - 10000000 XQ\n7. Mega Kasa - 50000000 XQ\nÜrünleri satın almak için \`s!satınal <ürün numarası>\` komutunu kullanabilirsiniz.**`);

    message.channel.send(magazaEmbed);


} else if (command === 'satınal') {
    const user = message.author;
    const itemNumber = parseInt(args[0]);

    const kasalar = {
        1: { type: "kasa", name: "Bronz Kasa", price: 50000, minCoin: 10000, maxCoin: 90000 },
        2: { type: "kasa", name: "Gümüş Kasa", price: 150000, minCoin: 50000, maxCoin: 250000 },
        3: { type: "kasa", name: "Demir Kasa", price: 300000, minCoin: 150000, maxCoin: 450000 },
        4: { type: "kasa", name: "Altın Kasa", price: 1000000, minCoin: 500000, maxCoin: 2000000 },
        5: { type: "kasa", name: "Elmas Kasa", price: 5000000, minCoin: 4000000, maxCoin: 10000000 },
        6: { type: "kasa", name: "Ruby Kasa", price: 10000000, minCoin: 8000000, maxCoin: 20000000 },
        7: { type: "kasa", name: "Mega Kasa", price: 50000000, minCoin: 40000000, maxCoin: 100000000 },
    }

    let selectedProduct;
    if (!itemNumber || isNaN(itemNumber)) {
        message.channel.send('Geçersiz ürün numarası!');
        return;
    } else if (kasalar[itemNumber]) {
        selectedProduct = kasalar[itemNumber];
    } else {
        message.channel.send('Geçersiz ürün numarası!');
        return;
    }

    const itemPrice = selectedProduct.price;

    let userBakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;

    if (userBakiye < itemPrice) {
        message.channel.send('Üzgünüz, yeterli sikkeniz yok!');
        return;
    }

    userBakiye -= itemPrice;
    db.set(`kullanici_${user.id}.bakiye`, userBakiye);

    const kazanılanSikke = Math.floor(Math.random() * (selectedProduct.maxCoin - selectedProduct.minCoin + 1)) + selectedProduct.minCoin;

    userBakiye += kazanılanSikke;
    db.set(`kullanici_${user.id}.bakiye`, userBakiye);

    const satınalEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`:package: ${selectedProduct.name}`)
        .setDescription(`**${user.username}**, ${selectedProduct.name} satın aldınız. ${kazanılanSikke} XQ kazandınız.`)
        .addField('Fiyat', `${itemPrice} XQ`)
        .setTimestamp();

    message.channel.send(satınalEmbed);


} else if (command === 'kumar') {
    // Kullanıcının cooldown bilgisini alın
      const kumarCooldowns = new Map(); // Kumar komutu için cooldown bilgilerini depolamak için bir harita oluşturun
    const kumarCooldownData = kumarCooldowns.get(message.author.id);

    // Eğer kullanıcı bir cooldown süresi içindeyse, mesaj gönderin ve işlemi sonlandırın
    if (kumarCooldownData && Date.now() < kumarCooldownData) {
        const remainingTime = (kumarCooldownData - Date.now()) / 1000;
        message.reply(`Kumar komutunu tekrar kullanabilmek için ${remainingTime.toFixed(1)} saniye beklemelisin.`);
        return;
    }

    try {
        const user = message.author;
        const bahis = parseInt(args[0]);
        const userBakiye = db.get(`kullanici_${user.id}.bakiye`) || 0;

        if (isNaN(bahis) || bahis <= 0) {
            const invalidBetEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Hata`)
                .setDescription(`Geçersiz bahis miktarı!`);
            message.channel.send(invalidBetEmbed);
            return;
        }

        if (userBakiye < bahis) {
            const insufficientFundsEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Yetersiz Bakiye`)
                .setDescription(`Üzgünüz, yeterli XQ yok!`);
            message.channel.send(insufficientFundsEmbed);
            return;
        }

        // Kontrol ekle: Kullanıcı bakiyesi, bahisten büyük veya eşit olduğunda kumar oynanabilir.
        const maxBetPercentage = 0.8; // Kullanıcının tüm parasıyla oynamasını engellemek için bir yüzde belirleyin
        const maxBetAmount = userBakiye * maxBetPercentage; // Kullanıcının maksimum bahis yapabileceği miktar
        if (bahis > maxBetAmount) {
            const maxBetEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Yetersiz Bakiye`)
                .setDescription(`Maksimum bahis miktarı: ${maxBetAmount} XQ!`);
            message.channel.send(maxBetEmbed);
            return;
        }

        // Kumar oyunu işlemleri
        const animationDuration = 3000; // ms
        const frames = [
            ":four_leaf_clover: | Sonuç hesaplanıyor...",
            ":game_die: | Yavaş yavaş dönüyor...",
            ":slot_machine: | Nerede duracağı merak konusu...",
            ":sparkles: | Ve...",
        ];

        let animationMessage = await message.channel.send(frames[0]);
        let frameIndex = 0;

        const animationInterval = setInterval(() => {
            frameIndex = (frameIndex + 1) % frames.length;
            animationMessage.edit(frames[frameIndex]);
        }, animationDuration / frames.length);

        setTimeout(() => {
            clearInterval(animationInterval);
            const kazanan = Math.random() < 0.6;
            const kazanmaMiktari = kazanan ? bahis : -bahis;
            const newBakiye = userBakiye + kazanmaMiktari;
            db.set(`kullanici_${user.id}.bakiye`, newBakiye);

            const resultEmbed = new Discord.MessageEmbed()
                .setColor(kazanan ? '#00ff00' : '#ff0000')
                .setTitle(`:money_with_wings: Kumar`)
                .setDescription(`**${user.username}**, kumar oynadınız ve ${kazanmaMiktari > 0 ? 'kazandınız' : 'kaybettiniz'}!`);

            if (kazanan) {
                resultEmbed.addField('Kazandınız!!!', `${Math.abs(kazanmaMiktari)} XQ`);
            } else {
                resultEmbed.addField('Kaybettiniz :(', `${Math.abs(kazanmaMiktari)} XQ`);
            }

            message.channel.send(resultEmbed);

            // Komut işlemi tamamlandıktan sonra, kullanıcıya cooldown uygulayın
            const kumarCooldownTime = 5000; // 5 saniye
            kumarCooldowns.set(message.author.id, Date.now() + kumarCooldownTime);
        }, animationDuration);
    } catch (error) {
        console.error('Kumar komutunda bir hata oluştu:', error);
        message.reply('Kumar oynarken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
}

    
if (command === 'rulet') {
    // Kullanıcının cooldown bilgisini alın
    const cooldownData = cooldowns.get(message.author.id);

    // Eğer kullanıcı bir cooldown süresi içindeyse, mesaj gönderin ve işlemi sonlandırın
    if (cooldownData && Date.now() < cooldownData) {
        const remainingTime = (cooldownData - Date.now()) / 1000;
        message.reply(`Komutu tekrar kullanabilmek için ${remainingTime.toFixed(1)} saniye beklemelisin.`);
        return;
    }

    try {
        const user = message.author;
        const betAmount = parseInt(args[0]);
        const userBalance = db.get(`kullanici_${user.id}.bakiye`) || 0;

        if (isNaN(betAmount) || betAmount <= 0) {
            const invalidBetEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Hata`)
                .setDescription(`Geçersiz bahis miktarı!`);
            message.channel.send(invalidBetEmbed);
            return;
        }

        if (userBalance < betAmount) {
            const insufficientFundsEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Yetersiz Bakiye`)
                .setDescription(`Üzgünüz, yeterli XQ yok!`);
            message.channel.send(insufficientFundsEmbed);
            return;
        }

        // Kontrol ekle: Kullanıcı bakiyesi, bahisten büyük veya eşit olduğunda rulet oynanabilir.
        const maxBetPercentage = 0.4; // Kullanıcının tüm parasıyla oynamasını engellemek için bir yüzde belirleyin
        const maxBetAmount = userBalance * maxBetPercentage; // Kullanıcının maksimum bahis yapabileceği miktar
        if (betAmount > maxBetAmount) {
            const maxBetEmbed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle(`:x: Yetersiz Bakiye`)
                .setDescription(`Maksimum bahis miktarı: ${maxBetAmount} XQ!`);
            message.channel.send(maxBetEmbed);
            return;
        }

        // Rulet oyunu işlemleri
        const animationDuration = 5000; // ms
        const frames = [
            "Mermi Yerleştirildi.",
            ":gun: | Döndürülüyor...",
            "🔪 | Kimin Öleceği Merak Konusu...",
            ":sparkles: | Ve...",
        ];

        let animationMessage = await message.channel.send(frames[0]);
        let frameIndex = 0;

        const animationInterval = setInterval(() => {
            frameIndex = (frameIndex + 1) % frames.length;
            animationMessage.edit(frames[frameIndex]);
        }, animationDuration / frames.length);

        setTimeout(() => {
            clearInterval(animationInterval);
            const winningNumber = Math.floor(Math.random() * 100); // 0 ile 99 arasında rastgele bir sayı seçin
            const isWin = winningNumber < 60; // Kazanma şansı %70 olarak belirleyin

            const winnings = isWin ? betAmount * 2 : -betAmount; // Kazanılan miktarı belirleyin
            const newBalance = userBalance + winnings; // Yeni bakiyeyi hesaplayın

            // Kullanıcının yeni bakiyesini güncelleyin
            db.set(`kullanici_${user.id}.bakiye`, newBalance);

            // Sonucu gösteren mesajı oluşturun
            const resultEmbed = new Discord.MessageEmbed()
                .setColor(isWin ? '#00ff00' : '#ff0000')
                .setTitle(`:money_with_wings: Rulet`)
                .setDescription(`**${user.username}**, rulet oynadınız ve ${isWin ? 'kazandınız' : 'kaybettiniz'}!`);

            if (isWin) {
                resultEmbed.addField('Tetikten Kaçtın Kazandın!!!', `${winnings} XQ`);
            } else {
                resultEmbed.addField('Acısız Bir Ölümdü Parayı Alıp Yeni Hayat Kuracaktınız BAŞARAMADINIZ... :(', `${-betAmount} XQ`);
            }

            message.channel.send(resultEmbed);

            // Komut işlemi tamamlandıktan sonra, kullanıcıya cooldown uygulayın
            const cooldownTime = 10000; // 10 saniye
            cooldowns.set(message.author.id, Date.now() + cooldownTime);
        }, animationDuration);
    } catch (error) {
        console.error('Rulet komutunda bir hata oluştu:', error);
        message.reply('Rulet oynarken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
}

    
  if (command === 'kick') {
    try {
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Lütfen kicklemek istediğiniz kullanıcıyı etiketleyin.');
        }

        const reason = args.slice(1).join(' ');

        member.kick(reason)
            .then(() => {
                message.reply(`${member.user.tag} başarıyla sunucudan atıldı. Sebep: ${reason || 'Belirtilmedi'}`);
            })
            .catch(error => {
                console.error('Kick işlemi sırasında bir hata oluştu:', error);
                message.reply('Kick işlemi sırasında bir hata oluştu.');
            });
    } catch (error) {
        console.error('Kick komutunda bir hata oluştu:', error);
        message.reply('Kick işlemi sırasında bir hata oluştu.');
    }
}
    

if (command === 'otorol-sifirla') {
    try {
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        db.delete(`otorol_${message.guild.id}`);
        message.channel.send('Otorol başarıyla sıfırlandı.');
    } catch (error) {
        console.error('Otorol sıfırlama komutunda bir hata oluştu:', error);
        message.reply('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    }
}
        
        

if (command === 'bot-istatistik') {
    try {
        const istatistikEmbed = new Discord.MessageEmbed()
            .setTitle('Bot İstatistikleri')
            .addField('Sunucu Sayısı', client.guilds.cache.size, true)
            .addField('Kullanıcı Sayısı', client.users.cache.size, true)
            .addField('Ping', `${Math.round(client.ws.ping)}ms`, true)
            .setColor('BLUE')
            .setFooter(`Discord.js sürümü: ${Discord.version}, Komut sayısı: 50, Node.js sürümü: ${process.version}`);

        message.channel.send(istatistikEmbed);
    } catch (error) {
        console.error('Bot İstatistikleri komutunda bir hata oluştu:', error);
        message.reply('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    }
}
    

else if (command === 'şans') {
    try {
        const userNumber = parseInt(args[0]);

        if (isNaN(userNumber)) {
            return message.reply('Lütfen geçerli bir sayı girin.');
        }

        const botNumber = Math.floor(Math.random() * 15) + 1;

        if (userNumber === botNumber) {
            message.reply(`Tebrikler! Kazandınız. Bot'un seçtiği sayı: ${botNumber}`);
        } else {
            message.reply(`Üzgünüz, kaybettiniz. Bot'un seçtiği sayı: ${botNumber}`);
        }
    } catch (error) {
        console.error('Şans komutunda bir hata oluştu:', error);
        message.reply('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
    }
}

    else if (command === 'yardım' || command === 'yardım') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Yardım Menüsü')
            .addField('s!premium', 'Premium komutları gösterir.')
        .addField('s!kayıt-sistemi', 'Kayıt sistemini gösterir.')
            .addField('s!bot', 'Bot Komutlarını Gösterir.')
            .addField('s!ayarlamalı', 'Ayarlamalı Yetkili Komutları Gösterir.')
            .addField('s!eğlence', 'Eğlence Komutlarını Kösterir')
            .addField('s!kullanıcı', 'Kullanıcı Komutlarını Gösterir.')
            .addField('s!yetkili', 'Yetkili Komutlarını Gösterir.')
            .addField('s!ekonomi', 'Ekonomi oyununun komutlarını görürsünüz')
    .addField('Botun TOPGG Sayfası', '[**OYVER**](https://top.gg/tr/bot/1055926043023781909)')
    .addField('Botun Destek Sunucusu', '[**Destek Sunucusuna katılın**](https://discord.gg/Gd3nK9UA)')
        .addField('Botu sunucuna ekle', '[**Sunucuna ekle**](https://discord.com/oauth2/authorize?client_id=1055926043023781909&scope=bot&permissions=1099511627775)')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);
        
    } else if (command === 'ekonomi' || command === 'ekonomi') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Ekonomi Oyunu Yardım Menüsü')
            .addField('s!bakiye', 'Paranıza bakabilirsiniz')
            .addField('s!mağaza', 'Mağazadan kasalar aç hadi ne duruyorsun')
            .addField('s!çalış', 'Bir işte çalış ve paranı al ')
            .addField('s!transfer', 'Birisine paramı göndermek istiyorsun hadi s!transfer [@kulanıcı] [miktar] komutunu gir')
            .addField('s!günlük', 'günlük paranı alırsın')
            .addField('s!top', 'Hadi ilk 10 zengine bakalım')
            .addField('s!kumar', 'Kumar oynamaya ne dersin (aman iyi oyna kaptırma paranı)')
            .addField('s!rulet', 'rus ruletine varmısın ŞŞŞŞŞT ÖLÜRSEN BEN SORUMLU DEĞİLİM')
            .addField('s!kredi/öde', 'kredimi alacan s!öde ile ödemeyi unutma sakın')
            .addField('s!satınal', 'ürün numarasını girerek paran varsa satın ala bilirsin')
            .addField('s!zar-at', 'Hadi bir zar atalım 1000 ile 10000 arası para kazanalım')
            .setColor('RED');

        message.channel.send(yardimEmbed);
        
        } else if (command === 'kayıt-sistemi' || command === 'kayıt-sistemi') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Kayıt sistemi Yardım Menüsü')
            .addField('s!kayıt', 'bu komutu üyeler kayıt olmak için kullanır')
            .addField('s!kayıtrol', 'kayıt yapıldıgında gelecek rolü ayarlar')
            .addField('s!kayıtmesaj', 'kayıt olduktan sonra üyeye gönderilecek mesajı ayarlar **[BAKIMDA]**')
            .addField('s!kayıtbilgi', 'Kayıt olan kullanıcı ile ilgili bilgi alırsıız')
            .addField('s!kayıtiptal ', 'bir kullanıcının kayıtını iptal edersiniz')
            .addField('s!kayıtliste', 'kayıt olan kullanıcıların listesini görüntüler')
            .setColor('RED');

        message.channel.send(yardimEmbed);
        
        } else if (command === 'premium' || command === 'premium') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Premium Yardım Menüsü')
            .addField('s!mesajgonder', 'bot sizin mesajınızı kendi üzerinden gönderir. (20 türk lirası)')
            .addField('s!premium-küfür-engelle', 'Premium küfür engellemeyi açıp kapatır. (50 türk lirası)')
            .addField('s!karşılama-ekranı', 'bot gelenlere güzel bir karşılama ekranı oluşturur. (70 türk lirası)')
            .addField('s!emoji-ekle', 'sunucunuza emoji ekler. (35 türk lirası)')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);
        
         } else if (command === 'bot' || command === 'bot') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Bot Yardım Menüsü')
            .addField('s!ping', 'Botun Pingini Ölçer.')
            .addField('s!bot-istatistik', 'Botun İstatistiklerini Gösterir.')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);
             
              } else if (command === 'ayarlamalı' || command === 'ayarlamalı') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Ayarlamalı Yardım Menüsü')
            .addField('s!link-engel.', 'link engeli açıp kapatır')
            .addField('s!sa-as', 'otomatik sa as açıp kapatır')
            .addField('s!küfür-engelle', 'Küfür engelini açıp kapatır.')
            .addField('s!capskoruma', 'büyük yazımı engeller')
            .addField('s!spamkoruma', 'tekrar yazımı engeller')
            .addField('s!ticket-oluştur', 'ticket oluşturuyor')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);
                  
                   } else if (command === 'yetkili' || command === 'yetkili') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Yetkili Yardım Menüsü')
        .addField('s!kick @kullanici [sebep]', 'Belirtilen Kullanıcıyı Sunucudan Atar.')
    .addField('s!otorol-ayarla @rol', 'Otorolü Belirtilen Rol Olarak Ayarlar.')
    .addField('s!otorol-sifirla', 'Otorolü Sıfırlar.')
    .addField('s!ban @kullanici [sebep]', 'Belirtilen Kullanıcıyı Sunucudan Yasaklar.')
    .addField('s!unban KullaniciID', 'Belirtilen Kullanıcının Sunucudaki Yasağını Kaldırır.')
    .addField('s!mute @kullanici süre]', 'Bir Kişiyi Susturur')
    .addField('s!unmute @kullanici]', 'Susturmayı Kaldırır')
        .addField('s!kanalsil #kanal]', 'belirttiğiniz kanalı siler')
        .addField('s!rolal @kullanici @rol]', 'bir üyeden rol alır')
        .addField('s!rolekle @kullanici @rol]', 'bir üyeye rol ekler')
        .addField('s!yavaş-mod [**KANAL ETİKET**]', 'kanalın yazma hızını ayarlarsınız')
        .addField('s!isim-değiştir [ETİKET]', 'Bir kullanıcının veya kendinizin ismini değiştirmeye yardımcı olur')
        .addField('s!çekiliş [DAKİKA: ÖRN:10 DAKİKA İSE 10M 10 SANİYE İSE 10S 1 SAAT İSE 1H 10 SAAT İSE 10H YAZINIZ]', 'çekiliş yaparsınız')
    .addField('s!uyarı @kullanıcı sebep', 'Bir Kullanıcıya Uyarı Verir')
    .addField('s!uyarıları-goster @kullanıcı', 'Kullanıcının Uyarılarını Gösterir')
    .addField('s!unuyarı @kullanıcı', 'Uyarıları Siler')
    .addField('s!sunucu-kur', 'Sunucunuzu Otomatik Bir Şekilde Oluşturur')
    .addField('clearall', 'Kanalda Bulunan Bütün Mesajları Siler')
    .addField('s!clear', 'Mesajları Siler')
    .setColor('BLUE');
        message.channel.send(yardimEmbed);
                       
                        } else if (command === 'eğlence' || command === 'eğlence') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Eğlence Yardım Menüsü')
            .addField('s!şans [Sayı', 'Botun Tuttuğu sayıyı Bilmeye Çalış! ')
            .addField('s!yazitura', 'yazımı turamı oyunu oynar')
            .addField('s!alkış', 'Alkışlama gif i gönderir.')
            .addField('s!emoji-yazı', 'emoji ile belirttiğiniz yazıyı yazar')
            .addField('s!ask-olcer [@kullanıcı', 'Aşkınızı Ölçer! ')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);
                            
                            
                             } else if (command === 'kullanıcı' || command === 'kullanıcı') {
        const yardimEmbed = new Discord.MessageEmbed()
            .setTitle('Kullanıcı Yardım Menüsü')
            .addField('s!kurucu-kim', 'sunucunun kurucusunu gösterir')
            .addField('s!kullanıcı-bilgi [ETİKET]', 'bir kullanıcı hakkında bilgi alırsınız')
            .addField('s!afk [Sebep', 'Sizi Rahatsız Etmeye Alır! ')
            .addField('s!avatar [@kullanıcı', 'Avatarınızı Gösterir! ')
            .setColor('BLUE');

        message.channel.send(yardimEmbed);

   } else if (command === 'ban') {
       
        if (!message.member.hasPermission('BAN_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }
       
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Lütfen banlamak istediğiniz kullanıcıyı etiketleyin.');
        }

        const reason = args.slice(1).join(' ');

        member.ban({ reason })
            .then(() => {
                message.reply(`${member.user.tag} başarıyla banlandı. Sebep: ${reason || 'Belirtilmedi'}`);
            })
            .catch(error => {
                console.error(error);
                message.reply('Ban işlemi sırasında bir hata oluştu.');
            });
    }
    
    
    // ... (diğer import ve tanımlamalar)
   if (command === 'ask-olcer') {
        const mentionedUser = message.mentions.users.first();

        if (!mentionedUser) {
            return message.reply('Lütfen bir kullanıcıyı etiketleyin.');
        }

        const lovePercentage = Math.floor(Math.random() * 101);

        const loveEmbed = new Discord.MessageEmbed()
            .setTitle('Aşk Ölçer ❤️')
            .setDescription(`**${message.author.tag}** ile **${mentionedUser.tag}** arasındaki aşk oranı: ${lovePercentage}%`)
            .setColor('RED');

        message.channel.send(loveEmbed);
    }
    
    
    

    
        // ... (diğer komutlar)

        if (command === 'unban') {
            // Unban komutunu kullanma izni kontrolü
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                return message.reply('Bu komutu kullanmaya yetkiniz yok.');
            }

            // Kullanıcı ID'sini argümanlardan al
            const userID = args[0];

            // Hatalı kullanım kontrolü
            if (!userID) {
                return message.reply('Lütfen bir kullanıcı IDsi belirtin.');
            }

            // Yasağı kaldır
            message.guild.fetchBans().then(bans => {
                if (bans.size == 0) return;
                const user = bans.find(ban => ban.user.id === userID);
                if (!user) return message.reply('Belirtilen ID ile yasaklı bir kullanıcı bulunamadı.');
                message.guild.members.unban(user.user);
                message.reply(`${user.user.tag} başarıyla yasağı kaldırıldı.`);
            }).catch(error => {
                console.error(error);
                message.reply('Unban işlemi sırasında bir hata oluştu.');
            });
        }

    // ... (Diğer importlar ve tanımlamalar)

    // ... (Diğer importlar ve tanımlamalar)

  const muteRoleName = 'Muted';  // Mute rolü adı


        if (command === 'mute') {
            // Mute komutunu kullanma izni kontrolü
            if (!message.member.hasPermission('MUTE_MEMBERS')) {
                return message.reply('Bu komutu kullanmaya yetkiniz yok.');
            }

            // Mute işlemi uygulanacak kullanıcıyı etiketle
            const member = message.mentions.members.first();
            if (!member) {
                return message.reply('Lütfen susturmak istediğiniz kullanıcıyı etiketleyin.');
            }

            // Mute işlemi süresini dakika cinsinden belirt
            const muteTimeInMinutes = parseInt(args[1]);
            if (isNaN(muteTimeInMinutes)) {
                return message.reply('Lütfen geçerli bir süre belirtin (dakika cinsinden).');
            }

            // Mute rolünü oluştur veya var olan mute rolünü al
            let muteRole = message.guild.roles.cache.find(role => role.name === muteRoleName);
            if (!muteRole) {
                try {
                    muteRole = await message.guild.roles.create({
                        data: {
                            name: muteRoleName,
                            color: 'GRAY',
                            permissions: [],
                        },
                    });
                } catch (error) {
                    console.error(error);
                    return message.reply('Mute rolü oluşturulurken bir hata oluştu.');
                }
            }

            // Kullanıcıya mute rolünü ver
            member.roles.add(muteRole);

            // Zamanlayıcı kullanarak belirtilen süre sonunda mute rolünü kaldır
            setTimeout(() => {
                member.roles.remove(muteRole);
                message.channel.send(`${member.user.tag} adlı kullanıcının susturulması kaldırıldı.`);
            }, muteTimeInMinutes * 60 * 1000);

            message.reply(`${member.user.tag} adlı kullanıcı ${muteTimeInMinutes} dakika boyunca susturuldu.`);
        }


        // ... (Diğer kodlar)
           // Diğer komutlar ve işlemler...
               // Diğer komutlar...

               if (command === 'unmute') {
                   // Unmute komutunu kullanma izni kontrolü
                   if (!message.member.hasPermission('MUTE_MEMBERS')) {
                       return message.reply('Bu komutu kullanmaya yetkiniz yok.');
                   }

                   // Unmute işlemi uygulanacak kullanıcıyı etiketle
                   const member = message.mentions.members.first();
                   if (!member) {
                       return message.reply('Lütfen unmutelamak istediğiniz kullanıcıyı etiketleyin.');
                   }

                   // Mute rolünü al
                   const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                   if (!muteRole) {
                       return message.reply('Mute rolü bulunamadı. Lütfen mute rolünü oluşturun veya var olanı kontrol edin.');
                   }

                   // Kullanıcıdan mute rolünü kaldır
                   member.roles.remove(muteRole)
                       .then(() => {
                           message.reply(`${member.user.tag} adlı kullanıcının mutesi kaldırıldı.`);
                       })
                       .catch(error => {
                           console.error(error);
                           message.reply('Unmute işlemi sırasında bir hata oluştu.');
                       });
               }

               // Diğer event listener'lar ve client.login()...

      if (command === 'sunucu-kur') {
  const embed = new Discord.MessageEmbed()
            .setTitle('Sunucu kur komutu')
            .addField('XQemojili', 'bot sunucunuzu **emojili** bir şekilde kurar')
            .addField('XQsade', 'bot sunucunuzu **sade** bir şekilde kurar')
            .addField('XQpublic', 'bot sunucunuzu **public** bir şekilde kurar')
            .setColor('BLUE');



    message.channel.send(embed);
  }
    
    
    
    
    
        if (command === 'sade') {
    // Sunucu kurma izni kontrolü
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanmaya yetkiniz yok.');
    }

     // Tüm kanalları al
    const kanallar = message.guild.channels.cache;

    // Her bir kanalı sil
    kanallar.forEach(async (kanal) => {
        try {
            await kanal.delete();
        } catch (error) {
        }
    });


     const roller = message.guild.roles.cache;

// Her bir rolü sil (except @everyone)
for (const [id, rol] of roller) {
    if (rol.name !== "@everyone") {
        try {
            await rol.delete();
        } catch (error) {
            console.error(`Rol silinirken hata oluştu - ${rol.name}: ${error.message}`);
        }
    }
}


     const duyuruuuuuCategory = await message.guild.channels.create('İMPORTANT', { type: 'category' });
    // Kategorilerin ve kanalların oluşturulması
    const geSsliCrfdhannel = await message.guild.channels.create('rules', { type: 'text', parent: duyuruuuuuCategory });
    const inilizcSfdgreesliChannel = await message.guild.channels.create('announcements', { type: 'text', parent: duyuruuuuuCategory });
    const cgoSefdslCherannel = await message.guild.channels.create('new-update', { type: 'text', parent: duyuruuuuuCategory });

    const ınfoooooCategorry = await message.guild.channels.create('square', { type: 'category' });
    
    const genebdfdhrdheChannel = await message.guild.channels.create('chat', { type: 'text', parent: ınfoooooCategorry });
    const turkhddhfrgbtChannel = await message.guild.channels.create('bot-command', { type: 'text', parent: ınfoooooCategorry });
    const fotfdgddyhCannel = await message.guild.channels.create('suggestion', { type: 'text', parent: ınfoooooCategorry });

    const chattCateegory = await message.guild.channels.create('audio channels', { type: 'category' });
    
    const genelSogdhdfghhbetChannel = await message.guild.channels.create('music-command', { type: 'text', parent: chattCateegory });
    const turkceSohfdhdhbetChannel = await message.guild.channels.create('voice chat', { type: 'voice', parent: chattCateegory });
    const fotograffhgddChannel = await message.guild.channels.create('music', { type: 'voice', parent: chattCateegory });


    // Rollerin oluşturulması
    const allrightsGdhdhjhreservedRole = await message.guild.roles.create({
        data: {
            name: 'owner',
            color: 'RED',
        },
    });

    const basbakdhdjhgjaGnRole = await message.guild.roles.create({
        data: {
            name: 'admin',
            color: 'DARKBLUE',
        },
    });

    const botdhgdjhgdRoGle = await message.guild.roles.create({
        data: {
            name: 'mods',
            color: 'AQUA',
        },
    });

    const supersthddfghaGrRole = await message.guild.roles.create({
        data: {
            name: 'member',
            color: 'GRAY',
        },
    });

    const milletvefdhgkiGliRole = await message.guild.roles.create({
        data: {
            name: 'bots',
            color: 'GRAY',
        },
    });

    
        // Örnek: Rollerin dağıtılması
}
    
    
    
    
    
    
    
    if (command === 'public') {
    // Sunucu kurma izni kontrolü
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanmaya yetkiniz yok.');
    }

     // Tüm kanalları al
    const kanallar = message.guild.channels.cache;

    // Her bir kanalı sil
    kanallar.forEach(async (kanal) => {
        try {
            await kanal.delete();
        } catch (error) {
        }
    });


     const roller = message.guild.roles.cache;

// Her bir rolü sil (except @everyone)
for (const [id, rol] of roller) {
    if (rol.name !== "@everyone") {
        try {
            await rol.delete();
        } catch (error) {
            console.error(`Rol silinirken hata oluştu - ${rol.name}: ${error.message}`);
        }
    }
}


    // Kategorilerin ve kanalların oluşturulması
     
     const duyuruuuCategory = await message.guild.channels.create('İMPORTANT', { type: 'category' });
    // Kategorilerin ve kanalların oluşturulması
    const geSsliChannel = await message.guild.channels.create('📄⫸・rules', { type: 'text', parent: duyuruuuCategory });
    const tukcSesliChannel = await message.guild.channels.create('📈⫸・welcome', { type: 'text', parent: duyuruuuCategory });
    const inilizcSesliChannel = await message.guild.channels.create('📢⫸・announcements', { type: 'text', parent: duyuruuuCategory });
    const cgoSeslChannel = await message.guild.channels.create('📣⫸・bot-updates', { type: 'text', parent: duyuruuuCategory });
    const miecrftSesliChannel = await message.guild.channels.create('🔨⫸・bot-status', { type: 'text', parent: duyuruuuCategory });

    const ınfooCategory = await message.guild.channels.create('community', { type: 'category' });
    
    const genebeChannel = await message.guild.channels.create('💬⫸・main-chat', { type: 'text', parent: ınfooCategory });
    const turkhbtChannel = await message.guild.channels.create('💎⫸・premium-chat', { type: 'text', parent: ınfooCategory });
    const fotfCannel = await message.guild.channels.create('🤖⫸・commands', { type: 'text', parent: ınfooCategory });
    const mehannl = await message.guild.channels.create('💭⫸・suggestions', { type: 'text', parent: ınfooCategory });
    const mincrhannel = await message.guild.channels.create('〔🎫〕tickets', { type: 'text', parent: ınfooCategory });
    const shipel = await message.guild.channels.create('〔📌〕announcements', { type: 'text', parent: ınfooCategory });

    const chatCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯⎯|💭|CHAT|💭|⎯⎯⎯⎯⎯⎯┑', { type: 'category' });
    
    const genelSohbetChannel = await message.guild.channels.create('〔💬〕Main-chat', { type: 'text', parent: chatCategory });
    const turkceSohbetChannel = await message.guild.channels.create('〔💠〕ekip-sohbet', { type: 'text', parent: chatCategory });
    const fotografChannel = await message.guild.channels.create('〔📷〕off-topic', { type: 'text', parent: chatCategory });
    const medyaChannel = await message.guild.channels.create('〔📷〕random-photos', { type: 'text', parent: chatCategory });
    const csgoChannel = await message.guild.channels.create('〔💡〕suggestions', { type: 'text', parent: chatCategory });
    const minecraftChannel = await message.guild.channels.create('〔🤖〕bot-commands', { type: 'text', parent: chatCategory });
    const shipChannel = await message.guild.channels.create('〔🤖〕bot-developers', { type: 'text', parent: chatCategory });
    const botayarlamaChannel = await message.guild.channels.create('〔🤖〕twitch-logger-test', { type: 'text', parent: chatCategory });
    const voicelogChannel = await message.guild.channels.create('〔🤖〕voice-log', { type: 'text', parent: chatCategory });

    const sesliCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯⎯|📞|VOICE|📞|⎯⎯⎯⎯⎯⎯┑', { type: 'category' });

    const genelSesliChannel = await message.guild.channels.create('〔🔊〕Twitch Sesli', { type: 'voice', parent: sesliCategory });
    const turkceSesliChannel = await message.guild.channels.create('〔🔊〕Public #1', { type: 'voice', parent: sesliCategory });
    const ingilizceSesliChannel = await message.guild.channels.create('〔🔊〕Public #2', { type: 'voice', parent: sesliCategory });
    const csgoSesliChannel = await message.guild.channels.create('〔🔊〕Public #3', { type: 'voice', parent: sesliCategory });
    const minecraftSesliChannel = await message.guild.channels.create('〔🔐〕Private', { type: 'voice', parent: sesliCategory });
    const outlastSesliChannel = await message.guild.channels.create('〔🔐〕Private', { type: 'voice', parent: sesliCategory });
    const robloxSesliChannel = await message.guild.channels.create('〔💠〕EightbornV Ekip Sohbet', { type: 'voice', parent: sesliCategory });
    const valorantSesliChannel = await message.guild.channels.create('〔🔇〕AFK', { type: 'voice', parent: sesliCategory });
    
    const muzikCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯|🎵|MUSIC|🎵|⎯⎯⎯⎯⎯┑', { type: 'category' });
    
    const outlSesliChannel = await message.guild.channels.create('〔🎶〕music', { type: 'text', parent: muzikCategory });
    const robloxSeslannel = await message.guild.channels.create('〔🎶〕Music #1', { type: 'voice', parent: muzikCategory });
    const valorantSliChannel = await message.guild.channels.create('〔🎶〕Music #2', { type: 'voice', parent: muzikCategory });

    // Rollerin oluşturulması
    const allrightsreservedRole = await message.guild.roles.create({
        data: {
            name: 'all rights reserved',
            color: 'WHİTE',
        },
    });

    const basbakanRole = await message.guild.roles.create({
        data: {
            name: '┗⎯⎯|🍀|Turkish Developer ™|🍀|⎯⎯┑',
            color: 'BLACK',
        },
    });

    const botRole = await message.guild.roles.create({
        data: {
            name: '🛡️',
            color: 'BLACK',
        },
    });

    const superstarRole = await message.guild.roles.create({
        data: {
            name: '┗⎯⎯|🔷|ADMINISTRATION|🔷|⎯⎯┑',
            color: 'BLACK',
        },
    });

    const milletvekiliRole = await message.guild.roles.create({
        data: {
            name: '👑│Owner',
            color: 'RED',
        },
    });

    const belediyeBaskaniRole = await message.guild.roles.create({
        data: {
            name: '🌀│Co-Owner',
            color: 'RED',
        },
    });

    const generalRole = await message.guild.roles.create({
        data: {
            name: '🔒│Admin',
            color: 'RED',
        },
    });

    const subayRole = await message.guild.roles.create({
        data: {
            name: '🔨│Mod',
            color: 'YELLOW',
        },
    });

    const vipRole = await message.guild.roles.create({
        data: {
            name: 'Doğrulanmış Bot Geliştiricisi',
            color: 'WHİTE',
        },
    });

    const muttefikReizRole = await message.guild.roles.create({
        data: {
            name: '💠│Helper',
            color: 'BLUE',
        },
    });

    const aktifRole = await message.guild.roles.create({
        data: {
            name: '🌀│Developer',
            color: 'BLUE',
        },
    });

    const vatandasRole = await message.guild.roles.create({
        data: {
            name: '❤️️│Girl',
            color: 'PINK',
        },
    });

    const gececiRole = await message.guild.roles.create({
        data: {
            name: '💠EightbornV Ekip',
            color: 'AQUA',
        },
    });
    
    
     const gececigfdRole = await message.guild.roles.create({
        data: {
            name: '🔑│Member',
            color: 'GREY',
        },
    });
    
    
     const gececigfhRole = await message.guild.roles.create({
        data: {
            name: '🛡️│Bots',
            color: 'ORANGE',
        },
    });

        // Örnek: Rollerin dağıtılması
}
    
    
    
    
   // Diğer komutlar ve işlemler...

    // Sunucu kur komutu
if (command === 'emojili') {
    // Sunucu kurma izni kontrolü
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('Bu komutu kullanmaya yetkiniz yok.');
    }

     // Tüm kanalları al
    const kanallar = message.guild.channels.cache;

    // Her bir kanalı sil
    kanallar.forEach(async (kanal) => {
        try {
            await kanal.delete();
        } catch (error) {
        }
    });


     const roller = message.guild.roles.cache;

// Her bir rolü sil (except @everyone)
for (const [id, rol] of roller) {
    if (rol.name !== "@everyone") {
        try {
            await rol.delete();
        } catch (error) {
            console.error(`Rol silinirken hata oluştu - ${rol.name}: ${error.message}`);
        }
    }
}


     const duyuruuCategory = await message.guild.channels.create('┗⎯⎯|📊|SERVER STATS|📊|⎯⎯┑', { type: 'category' });
    // Kategorilerin ve kanalların oluşturulması
    const geSesliChannel = await message.guild.channels.create('〔🍪〕Toplam Kullanıcı: 40', { type: 'voice', parent: duyuruuCategory });
    const tukceSesliChannel = await message.guild.channels.create('〔🍪〕Online: X', { type: 'voice', parent: duyuruuCategory });
    const inilizceSesliChannel = await message.guild.channels.create('〔🍪〕Bots: X', { type: 'voice', parent: duyuruuCategory });
    const cgoSesliChannel = await message.guild.channels.create('〔🍪〕Seslideki üye sayısı: 0', { type: 'voice', parent: duyuruuCategory });
    const miecraftSesliChannel = await message.guild.channels.create('〔🍪〕Last Joined: X', { type: 'voice', parent: duyuruuCategory });
    const outastSesliChannel = await message.guild.channels.create('〔🍪〕Kanal sayısı: 44', { type: 'voice', parent: duyuruuCategory });

    const ınfoCategory = await message.guild.channels.create('┗⎯⎯⎯|🍀|SERVER INFO|🍀|⎯⎯⎯┑', { type: 'category' });
    
    const genebetChannel = await message.guild.channels.create('〔📊〕welcome', { type: 'text', parent: ınfoCategory });
    const turkhbetChannel = await message.guild.channels.create('〔🆙〕level-up', { type: 'text', parent: ınfoCategory });
    const fotfChannel = await message.guild.channels.create('〔📄〕rules', { type: 'text', parent: ınfoCategory });
    const mehannel = await message.guild.channels.create('〔📕〕news', { type: 'text', parent: ınfoCategory });
    const csgonel = await message.guild.channels.create('〔🎉〕giveaway', { type: 'text', parent: ınfoCategory });
    const minecrhannel = await message.guild.channels.create('〔🎫〕tickets', { type: 'text', parent: ınfoCategory });
    const shipnel = await message.guild.channels.create('〔📌〕announcements', { type: 'text', parent: ınfoCategory });

    const chatCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯⎯|💭|CHAT|💭|⎯⎯⎯⎯⎯⎯┑', { type: 'category' });
    
    const genelSohbetChannel = await message.guild.channels.create('〔💬〕Main-chat', { type: 'text', parent: chatCategory });
    const turkceSohbetChannel = await message.guild.channels.create('〔💠〕ekip-sohbet', { type: 'text', parent: chatCategory });
    const fotografChannel = await message.guild.channels.create('〔📷〕off-topic', { type: 'text', parent: chatCategory });
    const medyaChannel = await message.guild.channels.create('〔📷〕random-photos', { type: 'text', parent: chatCategory });
    const csgoChannel = await message.guild.channels.create('〔💡〕suggestions', { type: 'text', parent: chatCategory });
    const minecraftChannel = await message.guild.channels.create('〔🤖〕bot-commands', { type: 'text', parent: chatCategory });
    const shipChannel = await message.guild.channels.create('〔🤖〕bot-developers', { type: 'text', parent: chatCategory });
    const botayarlamaChannel = await message.guild.channels.create('〔🤖〕twitch-logger-test', { type: 'text', parent: chatCategory });
    const voicelogChannel = await message.guild.channels.create('〔🤖〕voice-log', { type: 'text', parent: chatCategory });

    const sesliCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯⎯|📞|VOICE|📞|⎯⎯⎯⎯⎯⎯┑', { type: 'category' });

    const genelSesliChannel = await message.guild.channels.create('〔🔊〕Twitch Sesli', { type: 'voice', parent: sesliCategory });
    const turkceSesliChannel = await message.guild.channels.create('〔🔊〕Public #1', { type: 'voice', parent: sesliCategory });
    const ingilizceSesliChannel = await message.guild.channels.create('〔🔊〕Public #2', { type: 'voice', parent: sesliCategory });
    const csgoSesliChannel = await message.guild.channels.create('〔🔊〕Public #3', { type: 'voice', parent: sesliCategory });
    const minecraftSesliChannel = await message.guild.channels.create('〔🔐〕Private', { type: 'voice', parent: sesliCategory });
    const outlastSesliChannel = await message.guild.channels.create('〔🔐〕Private', { type: 'voice', parent: sesliCategory });
    const robloxSesliChannel = await message.guild.channels.create('〔💠〕EightbornV Ekip Sohbet', { type: 'voice', parent: sesliCategory });
    const valorantSesliChannel = await message.guild.channels.create('〔🔇〕AFK', { type: 'voice', parent: sesliCategory });
    
    const muzikCategory = await message.guild.channels.create('┗⎯⎯⎯⎯⎯|🎵|MUSIC|🎵|⎯⎯⎯⎯⎯┑', { type: 'category' });
    
    const outlSesliChannel = await message.guild.channels.create('〔🎶〕music', { type: 'text', parent: muzikCategory });
    const robloxSeslannel = await message.guild.channels.create('〔🎶〕Music #1', { type: 'voice', parent: muzikCategory });
    const valorantSliChannel = await message.guild.channels.create('〔🎶〕Music #2', { type: 'voice', parent: muzikCategory });

    // Rollerin oluşturulması
    const allrightsreservedRole = await message.guild.roles.create({
        data: {
            name: 'all rights reserved',
            color: 'WHİTE',
        },
    });

    const basbakanRole = await message.guild.roles.create({
        data: {
            name: '┗⎯⎯|🍀|Turkish Developer ™|🍀|⎯⎯┑',
            color: 'BLACK',
        },
    });

    const botRole = await message.guild.roles.create({
        data: {
            name: '🛡️',
            color: 'BLACK',
        },
    });

    const superstarRole = await message.guild.roles.create({
        data: {
            name: '┗⎯⎯|🔷|ADMINISTRATION|🔷|⎯⎯┑',
            color: 'BLACK',
        },
    });

    const milletvekiliRole = await message.guild.roles.create({
        data: {
            name: '👑│Owner',
            color: 'RED',
        },
    });

    const belediyeBaskaniRole = await message.guild.roles.create({
        data: {
            name: '🌀│Co-Owner',
            color: 'RED',
        },
    });

    const generalRole = await message.guild.roles.create({
        data: {
            name: '🔒│Admin',
            color: 'RED',
        },
    });

    const subayRole = await message.guild.roles.create({
        data: {
            name: '🔨│Mod',
            color: 'YELLOW',
        },
    });

    const vipRole = await message.guild.roles.create({
        data: {
            name: 'Doğrulanmış Bot Geliştiricisi',
            color: 'WHİTE',
        },
    });

    const muttefikReizRole = await message.guild.roles.create({
        data: {
            name: '💠│Helper',
            color: 'BLUE',
        },
    });

    const aktifRole = await message.guild.roles.create({
        data: {
            name: '🌀│Developer',
            color: 'BLUE',
        },
    });

    const vatandasRole = await message.guild.roles.create({
        data: {
            name: '❤️️│Girl',
            color: 'PINK',
        },
    });

    const gececiRole = await message.guild.roles.create({
        data: {
            name: '💠EightbornV Ekip',
            color: 'AQUA',
        },
    });
    
    
     const gececigfdRole = await message.guild.roles.create({
        data: {
            name: '🔑│Member',
            color: 'GREY',
        },
    });
    
    
     const gececigfhRole = await message.guild.roles.create({
        data: {
            name: '🛡️│Bots',
            color: 'ORANGE',
        },
    });

        // Örnek: Rollerin dağıtılması
}    // Diğer kodlar...

    if (command === 'clear') {
        // Clear komutunu kullanma izni kontrolü
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Silinecek mesaj sayısını belirle
        const amount = parseInt(args[0]);

        // Hatalı kullanım kontrolü
        if (isNaN(amount) || amount <= 0 || amount > 100) {
            return message.reply('Lütfen 1 ile 100 arasında geçerli bir sayı belirtin.');
        }

        // Mesajları sil
        message.channel.bulkDelete(amount, true)
            .then((deletedMessages) => {
                message.reply(`${deletedMessages.size} adet mesaj başarıyla silindi.`);
            })
            .catch((error) => {
                console.error(error);
                const silmeUyari = 'Mesaj silme işlemi sırasında bir hata oluştu.';
             message.reply(silmeUyari).then(botMessage => {
                const silmeSuresi = 3000;
                setTimeout(() => {
                    botMessage.delete();
                }, silmeSuresi);
            });
            });

    }
    // Diğer komutlar...

     if (command === 'uyarı') {
        // Uyarı komutunu kullanma izni kontrolü
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Uyarılacak kullanıcıyı etiketle
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Lütfen uyarılacak kullanıcıyı etiketleyin.');
        }

        // Kullanıcıya verilecek uyarı sebebini belirle
        const reason = args.slice(1).join(' ');

        // Uyarılar objesini kontrol et ve kullanıcıya uyarı ekleyin
        let uyarilar = db.get(`uyarilar_${message.guild.id}_${member.id}`) || 0;
        uyarilar++;
        db.set(`uyarilar_${message.guild.id}_${member.id}`, uyarilar);

        // Uyarı mesajını oluştur
        const uyarıEmbed = new Discord.MessageEmbed()
            .setTitle('Kullanıcı Uyarıldı')
            .setDescription(`${member.user.tag} adlı kullanıcı ${message.author.tag} tarafından uyarıldı.`)
            .addField('Sebep', reason || 'Belirtilmedi')
            .addField('Toplam Uyarı Sayısı', uyarilar)
            .setColor('YELLOW');

        // Uyarı mesajını gönder
        message.channel.send(uyarıEmbed);
    }

// Diğer event listener'lar ve client.login()...


     if (command === 'uyarıları-goster') {
        // Uyarıları göster komutunu kullanma izni kontrolü
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Uyarıları gösterilecek kullanıcıyı etiketle
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Lütfen uyarılarını görmek istediğiniz kullanıcıyı etiketleyin.');
        }

        // Kullanıcının toplam uyarı sayısını al
        let uyarilar = db.get(`uyarilar_${message.guild.id}_${member.id}`) || 0;

        // Uyarıları göster
        const uyarilarEmbed = new Discord.MessageEmbed()
            .setTitle('Kullanıcı Uyarıları')
            .setDescription(`${member.user.tag} adlı kullanıcının toplam uyarı sayısı: ${uyarilar}`)
            .setColor('YELLOW');

        // Uyarıları gönder
        message.channel.send(uyarilarEmbed);
    }



    if (command === 'unuyarı') {
        // Uyarıları kaldırma komutunu kullanma izni kontrolü
        if (!message.member.hasPermission('KICK_MEMBERS')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Uyarıları kaldırılacak kullanıcıyı etiketle
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Lütfen uyarıları kaldırmak istediğiniz kullanıcıyı etiketleyin.');
        }

        // Kullanıcının toplam uyarı sayısını al
        let uyarilar = db.get(`uyarilar_${message.guild.id}_${member.id}`) || 0;

        // Eğer kullanıcının uyarısı yoksa hata mesajı gönder
        if (uyarilar === 0) {
            return message.reply('Bu kullanıcının hiç uyarısı yok.');
        }

        // Uyarıları sıfırla
        db.delete(`uyarilar_${message.guild.id}_${member.id}`);

        // Uyarıları sıfırlama mesajını gönder
        message.channel.send(`${member.user.tag} adlı kullanıcının tüm uyarıları başarıyla kaldırıldı.`);
    }



    if (command === 'clearall') {
        // Clearall komutunu kullanma izni kontrolü
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            return message.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Tüm mesajları sil
        const fetched = await message.channel.messages.fetch({ limit: 100 });
        message.channel.bulkDelete(fetched, true);

        // Döngü içinde 100 mesajlık gruplar halinde silmeye devam et
        let lastMessageID = fetched.last().id;
        while (true) {
            const fetchedAgain = await message.channel.messages.fetch({ limit: 100, before: lastMessageID });
            if (fetchedAgain.size === 0) break;
            message.channel.bulkDelete(fetchedAgain, true);
            lastMessageID = fetchedAgain.last().id;
        }

        const silmeUyari = 'Kanalda bulunan tüm mesajlar başarıyla silindi.';
         message.reply(silmeUyari).then(botMessage => {
                const silmeSuresi = 3000;
                setTimeout(() => {
                    botMessage.delete();
                }, silmeSuresi);
            });
    }
    
if (message.author.bot || !message.content.toLowerCase().startsWith('s!çekiliş')) return;

const messageParts = message.content.split(' ');

const durationRegex = /^(\d+)(s|m|h|d)$/; // saniye, dakika, saat, gün
if (!messageParts[1] || !durationRegex.test(messageParts[1])) {
    return message.channel.send("Lütfen geçerli bir süre belirtin. Örnek: `s!çekiliş 10m` (10 dakika).");
}

const durationString = messageParts[1];
const durationUnit = durationString.slice(-1);
const durationValue = parseInt(durationString.slice(0, -1));
let durationMilliseconds;

switch (durationUnit) {
    case 's':
        durationMilliseconds = durationValue * 1000; // saniye cinsinden
        break;
    case 'm':
        durationMilliseconds = durationValue * 60 * 1000; // dakika cinsinden
        break;
    case 'h':
        durationMilliseconds = durationValue * 60 * 60 * 1000; // saat cinsinden
        break;
    case 'd':
        durationMilliseconds = durationValue * 24 * 60 * 60 * 1000; // gün cinsinden
        break;
    default:
        return message.channel.send("Lütfen geçerli bir süre belirtin. Örnek: `s!çekiliş 10m` (10 dakika).");
}

const embed = new Discord.MessageEmbed()
    .setTitle("Çekiliş")
    .setDescription("Çekilişe katılmak için 🎉 tepkisine tıklayın!")
    .addField("Süre", messageParts[1])
    .setColor("#00ff00");

try {
    const sentMessage = await message.channel.send(embed);
    await sentMessage.react("🎉");

    // Çekilişi veritabanına kaydet
    db.set(`giveaways_${sentMessage.id}`, {
        channelId: message.channel.id,
        duration: durationMilliseconds,
        endTime: Date.now() + durationMilliseconds,
        participants: []
    });

    giveaways.set(sentMessage.id, {
        channelId: message.channel.id,
        messageId: sentMessage.id,
        duration: durationMilliseconds,
        endTime: Date.now() + durationMilliseconds,
        participants: []
    });

    setTimeout(() => endGiveaway(sentMessage.id), durationMilliseconds);
} catch (error) {
    console.error('Error sending message or reacting:', error);
    message.channel.send('Bir hata oluştu. Lütfen tekrar deneyin.');
}

// Çekiliş katılımını işlemek için
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot || reaction.emoji.name !== "🎉") return;

    const giveawayData = db.get(`giveaways_${reaction.message.id}`);
    if (!giveawayData) return;

    // Katılımcının çekilişe daha önce katılıp katılmadığını kontrol et
    if (!giveawayData.participants.includes(user.id)) {
        giveawayData.participants.push(user.id);
        db.set(`giveaways_${reaction.message.id}`, giveawayData);
    }
});

// Çekilişin sona ermesini işlemek için
function endGiveaway(messageId) {
    const giveawayData = db.get(`giveaways_${messageId}`);
    if (!giveawayData) return;

    const channel = client.channels.cache.get(giveawayData.channelId);
    if (!channel) return;

    const winnerId = giveawayData.participants[Math.floor(Math.random() * giveawayData.participants.length)];
    const winner = client.users.cache.get(winnerId);

    const embed = new Discord.MessageEmbed()
        .setTitle("Çekiliş Sonuçları")
        .setDescription(`🎉 Tebrikler ${winner}! Çekilişi kazandınız! 🎉`)
        .setColor("#00ff00");

    channel.send(embed);
    db.delete(`giveaways_${messageId}`);
}
    
    client.on('error', error => {
    console.error(`Bir hata oluştu: ${error}`);
});

client.on('warn', warning => {
    console.warn(`Bir uyarı oluştu: ${warning}`);
});

process.on('unhandledRejection', error => {
    console.error(`Yakalanmayan bir promise hatası oluştu: ${error}`);
});


    client.login(token).then(() => {
    console.log('Bot is logged in!');
}).catch(error => {
    console.error('Error logging in:', error);
});
    
    client.on('error', error => {
    console.error('Bir hata oluştu:', error);
    
    // Hata bildirim kanalını tanımla (isteğe bağlı)
    const errorChannel = client.channels.cache.get('1206721511071817811');

    // Hata bildirim mesajını oluştur
    const errorMessage = `Bir hata oluştu: ${error}`;

    // Hata bildirimini belirtilen kanala gönder (isteğe bağlı)
    if (errorChannel) {
        errorChannel.send(errorMessage)
            .catch(console.error);
    }

    // Hata kayıtlarını bir dosyaya yazma (isteğe bağlı)
    const fs = require('fs');
    fs.appendFile('hata-kayitlari.txt', `${new Date().toISOString()}: ${errorMessage}\n`, err => {
        if (err) console.error('Hata kaydedilirken bir hata oluştu:', err);
    });

    // Hata olduğunda özel bir kullanıcıya mesaj gönderme (isteğe bağlı)
    const userID = '990102988225929296';
    const user = client.users.cache.get(userID);
    if (user) {
        user.send(errorMessage)
            .catch(console.error);
    }
});
    
    // Diğer komutlar...

                             });

client.login('MTI1MDA3NjE2MjAyNjI0MjE2Mw.G2dAI7.qXgC3GqDrnghjHuk_ojkSC8qSMtjfNJfY0nt_0');