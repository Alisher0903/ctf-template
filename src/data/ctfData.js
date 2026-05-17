// CTF Challenges list
export const challenges = [
  {
    id: 1,
    title: 'The Invisible Needle',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `1. There is a hidden file with the extension .secret in ~/ch1/*, find it and read it.
2. You need to get the key encoded in base64 from the .secret file and decode it. Hint: base64 -d
3. Send the decoded key to ~/ch1/pathcode <answer> and you will get the address you need to go to.
4. Send ~/ch1/verify <answer> to get the flag.`,
    hint: '',
    tags: [],
  },
  {
    id: 2,
    title: 'The Signal Hunter',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `1. There is a user named <ghost_user> in the system and his password is hidden in a file with the extension ".pass" in ~/ch2/*, to find it, find the one that is at least one of the characters and go to <ghost_user> home.
2. Get the key by watching the meni_ushla program live and put it in the ~/ch2/verify <answer> program and enter the flag.`,
    hint: '',
    tags: [],
  },
  {
    id: 3,
    title: 'The System Cartographer',
    category: 'linux-basics',
    difficulty: 'hard',
    points: 10,
    credentials: 'hacker:hacker',
    description: `Welcome! In this step, you will get to know the "map" of the Linux system
and its operating environment.

## Your first step:

Start by studying the newly installed program on the system. ch3_help

Create the CH3_KEY variable

## Notes:

- Read the information provided in each step carefully.
- Pay close attention to environment variables.
- Order is very important when merging files.
- Follow security rules.

Good luck, Cartographer! It's time to unlock the secrets of the system.`,
    hint: '',
    tags: [],
  },
  {
    id: 11,
    title: 'Yol uzoq',
    category: 'linux-basics',
    difficulty: 'easy',
    points: 3,
    credentials: 'hacker:hacker',
    description: `'yolimiz_hali_uzoq' ga kirib yashirin .txtni o'qing.`,
    hint: '',
    tags: [],
  },
  {
    id: 12,
    title: 'Flag sari olga',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `ch11 dagi silka kirish orqali telegram kanalga o'ting va ko'zdan kechiring ch12 ga taluqli biror narsa chiqib qolar!`,
    hint: '',
    tags: [],
  },
  {
    id: 13,
    title: 'Bandit secure words',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `BanditCTFga kiring va "Bandit Level 33 → Level 34" ni ichiga kiring va u yerda inglizcha so'z mavjud u so'z va son hammasini copy olib .secret.txtni     ichiga olib kelib yozing va u nechta hariftan iboratligini aniqlab "./checker" dasturi bilan birga ishka tushuring!`,
    hint: '',
    tags: [],
  },
  {
    id: 14,
    title: 'Tarixga nazar',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `Windows, Linux, macOS operatsion tizimlari nechanchi yili ishlab chiqarilgani biling va har bir yilini
operatsion tizimlar nomi yozilgan shunga etibor berib yillarni "_" shu chiziq yordamida birlashtiring
va checker ni ishga tushurin input degan joyitiga Javobingizni kiriting!

Misol: 2001_2007_2005`,
    hint: '',
    tags: [],
  },
  {
    id: 15,
    title: 'Base64 master',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `Turgan joyizda FLAG degan dastur bor uni o'zini ishka tushuring va bergan natijasini olib base64 da 3 martda deshifirlang va chiqan natijani checker bilan birga ishka tushuring`,
    hint: '',
    tags: [],
  },
  {
    id: 16,
    title: 'Permission Denied',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `Flagni o‘qish mumkin emas. Ammo siz kerakli group’ga qo‘shila olasiz.
Userni secretgroup groupiga qo‘shing va qayta login qiling. Va flagni olish uchun /opt/secret/ ga boring`,
    hint: '',
    tags: [],
  },
  {
    id: 17,
    title: 'Symlink Maze',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `/opt/maze/start.txt fayli boshqa symlinkka, u esa yana boshqasiga olib boradi. Oxirgi real file ichida flag bor. 20 ta symlink chain mavjud va hamma symlink o'zaro bog'langan.
Final targetni toping. Bu erda juda etibotli bo'lish foyda beradi, qolgan ko'nikmalar esa zarar qilmaydi.`,
    hint: '',
    tags: [],
  },
  {
    id: 18,
    title: 'Manuals Know Everything',
    category: 'linux-basics',
    difficulty: 'medium',
    points: 7,
    credentials: 'hacker:hacker',
    description: `Tizimda maxsus papka bor '/opt/man_ctf'. Shu papka ichida fayllar mavjud.
U oddiy man emas, maxsus man tizimi ishlatilayotganini bilish kerak,
sysdiag nomli soxta tool uchun man page mavjudligini topish. Unda '.gzip'
mavjud uni oching va ichidagi ma'lumontni o'qing. Va 'base64' yordamida flagni oling`,
    hint: '',
    tags: [],
  },
  {
    id: 19,
    title: 'Users',
    category: 'linux-basics',
    difficulty: 'easy',
    points: 3,
    credentials: 'hacker:hacker',
    description: `Tizimda nechta foydalanuvchi bor, ularni toping. Va checker orqali tekshirib flagni oling.`,
    hint: '',
    tags: [],
  },
]

// Flags list — matches challenge IDs
export const flags = [
  { challengeId: 1, flag: 'flag{y0ur_f14g_f0und}' },
  { challengeId: 2, flag: 'flag{linux_pro_monitor_2026}' },
  { challengeId: 3, flag: 'flag{fhs_3xplorer_env_v4riabl3s_linux_m4st3r_2026}' },
  { challengeId: 11, flag: 'flag{lab1r1nt_1nson1_zavqlant1rad1_va_koproq_f1k1rlashn1_orgatad1}' },
  { challengeId: 12, flag: 'flag{juda_qiziqarlik_aa}' },
  { challengeId: 13, flag: 'flag{juda_qiziqarlik_aa}' },
  { challengeId: 14, flag: 'FLAG{os_history_master}' },
  { challengeId: 15, flag: 'FLAG{base64_master}' },
  { challengeId: 16, flag: 'flag{gr0up_m3mb3r_4cc3ss}' },
  { challengeId: 17, flag: 'flag{symlink_chain_master}' },
  { challengeId: 18, flag: 'flad{h1dd3n_m4n_p4g3_m4st3r}' },
  { challengeId: 19, flag: 'flag{y0u_f0und_1t}' },
]
