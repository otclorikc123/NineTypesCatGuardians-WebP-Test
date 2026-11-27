
export type ResultId =
  | "peaceful"
  | "qi_deficiency"
  | "yang_deficiency"
  | "yin_deficiency"
  | "phlegm_dampness"
  | "damp_heat"
  | "blood_stasis"
  | "qi_stagnation"
  | "special_diathesis";

export interface ResultProfile {
  id: ResultId;
  typeName: string;
  characterName: string;
  badgeText: string;

  characterImage: string;
  badgeImage: string;

  background: {
    pc: string;
    mobile: string;
  };

  coreTraits: string[];

  whisperTitle: string;
  whisperText: string;

  tags: string[];

  share: {
    posterImage: string;
    posterTitle: string;
    posterDescription: string;
    tags: string[];
  };

  pc?: {
    diagnosticNote: string;
  };

  mobile?: {
    diagnosticNote: string;
  };
}
const A = `${import.meta.env.BASE_URL}assets`;

const withBase = (path: string) =>
  path.replace(/^\/assets\//, `${A}/`);

  const diagnosticNote =
  "时愈堂诊断手册：题目每4题一组，分别为气虚、阳虚、阴虚、痰湿、湿热、血瘀、气郁、特禀。若全组＜8分，则诊断为天选平和质。若最高分组≥8分，且第二高分组也≥8分、两组分差≤1，则判定为双体质；否则判定为单一主导体质。";

const rawResultData: Record<ResultId, ResultProfile> = {
  peaceful: {
    id: "peaceful",
    typeName: "平和质",
    characterName: "天选喵",
    badgeText: "全偏颇转化分＜8分 隐藏款 天选欧皇",

    characterImage: "/assets/characters/asset_character_type_01.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge01.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_01.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_01.webp",
    },

    coreTraits: [
      "恭喜你，解锁了时愈堂的隐藏款——平和质！",
      "如果把生活比作一杯茶，你大概很懂得怎样找到自己喜欢的温度。不必特别浓烈，也不用刻意追求完美，刚刚好的状态，就已经很让人羡慕。",
      "你身上有一种很舒服的稳定感。",
      "忙的时候认真做事，闲下来的时候也愿意享受生活。遇到变化，你通常更愿意先看清情况，再决定下一步怎么走。",
      "别人在各种生活方式之间反复横跳，你可能早已拥有一套适合自己的日常节奏。",
      "最有意思的是，你不一定觉得自己有什么特别。", 
      "毕竟在你看来，规律吃饭、好好休息、认真工作、偶尔出去玩，本来就是很自然的事情。",
      "但能把平凡的日子过得自在，本身就是一种值得欣赏的生活智慧。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "保持现状就好。别被那些养生焦虑带跑偏——你的身体比大多数人都聪明。",

    tags: [
      "#人间第一无事发生冠军",
      "#天选状态优等生",
      "#老天爷的默认设置",
      "#稳定系王者",
    ],

    pc: { diagnosticNote },
    mobile: { diagnosticNote },

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_01.webp",
      posterTitle: "✦ 时愈堂把脉报告·平和质 ✦",
      posterDescription:
        "檐主说我是天选喵，体质天花板那种。隐藏款，不常出。评论区吸一口欧气，祝大家都好运。",
      tags: [
        "#人间第一无事发生冠军",
        "#老天爷的默认设置",
        "#稳定系王者",
      ],
    },
  },

  qi_deficiency: {
    id: "qi_deficiency",
    typeName: "气虚质",
    characterName: "快充喵",
    badgeText: "气虚质≥8分 没电星人",

    characterImage: "/assets/characters/asset_character_type_02.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge02.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_02.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_02.webp",
    },

    coreTraits: [
      "不是不想跑，是跑不动。不是不想说话，是说不动。你像一台电池容量天生比别人小一号的手机，别人一天一充，你一天三充。你懒吗？不，你是真的没有力气。",
      "但你有一个被严重低估的天赋：温柔。说话声音不大的人，往往心里装得下更多人。你不争不抢，不疾不徐，这种“慢”在快节奏的世界里反而成了一股清流。",
      "别人在卷，你在看云。别人在赢，你在睡觉。谁是真正的人生赢家？檐主觉得是你。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "累了就躺，不丢人。充电不是偷懒，是你对自己最大的仁慈。少说话、多休息，你的电量要留给真正重要的事。",

    tags: [
      "#人间第一低电量生存大师",
      "#温柔慢半拍",
      "#低电量续航专家",
      "#省电模式体验官",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_02.webp",
      posterTitle: "✦ 时愈堂把脉报告·气虚质 ✦",
      posterDescription:
        "檐主认证说我今天电量已耗光，有事留言，明天随缘回复#气虚体质 #累了就躺",
      tags: [
        "#人间第一低电量生存大师",
        "#低电量续航专家",
        "#温柔慢半拍",
      ],
    },
  },

  yang_deficiency: {
    id: "yang_deficiency",
    typeName: "阳虚质",
    characterName: "暖暖喵",
    badgeText: "阳虚质≥8分 怕冷星人",

    characterImage: "/assets/characters/asset_character_type_03.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge03.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_03.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_03.webp",
    },

    coreTraits: [
      "你是那种夏天也要盖被子、空调开到26度就喊冷、冬天出门像去南极探险的人。你的手脚好像永远在冰箱里放过，谁牵你的手都会惊呼“你怎么这么凉”。",
      "但你有一个秘密：你的心是烫的。怕冷的人，往往比任何人都渴望温暖，也比任何人都懂得如何给别人温暖。你看似慢热、安静、有点距离感，但一旦走近了，会发现你是那种默默陪在身边、什么也不说但一直在的人。",
      "你适合在冬天里被拥抱，适合捧一杯热茶慢慢喝，适合被认真对待。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "多喝热水是真的对你有用。少碰生冷，多拥抱。你怕冷不是矫情——是你的身体在说“我需要被温暖”。",

    tags: [
      "#人间第一被窝钉子户",
      "#被窝永久VIP",
      "#怕冷界终身会员",
      "#暖气依赖艺术家",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_03.webp",
      posterTitle: "✦ 时愈堂把脉报告·阳虚质 ✦",
      posterDescription:
        "檐主说我手脚一年四季像冰棍，但心是烫的🔥靠近我的人会慢慢变暖。#阳虚体质 #怕冷星人",
      tags: [
        "#人间第一被窝钉子户",
        "#怕冷界终身会员",
        "#被窝永久VIP",
      ],
    },
  },

  yin_deficiency: {
    id: "yin_deficiency",
    typeName: "阴虚质",
    characterName: "水光喵",
    badgeText: "阴虚质≥8分 干干星人",

    characterImage: "/assets/characters/asset_character_type_04.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge04.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_04.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_04.webp",
    },

    coreTraits: [
      "你是一块行走的沙漠——皮肤干、嘴唇干、眼睛干、喉咙干。别人喝水是“咕咚咕咚”，你喝水是“倒进无底洞”。熬夜对你来说不是“熬”，是“自燃”——熬完不仅脸干，手心还发烫，整个人像一台过热运行的电脑。",
      "但“干”的另一面，是敏感和通透。你比一般人更细腻，更能察觉细微的美和细微的情绪。你适合写诗、适合听歌、适合一个人待着慢慢想事情。",
      "你的“干”，某种程度上是你太敏锐——脑子在高速运转，身体的水分都被烧干了。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "少熬夜，多安静。你不是机器，不需要一直运转。给自己一点不需要说话、不需要思考的时间——那是你最好的补水方式。",

    tags: [
      "#人间第一失眠哲学家",
      "#缺水系浪漫诗人",
      "#凌晨三点哲学系主任",
      "#熬夜清醒思想家",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_04.webp",
      posterTitle: "✦ 时愈堂把脉报告·阴虚质 ✦",
      posterDescription:
        "檐主说我缺水但话不少，内心戏更多。今夜不熬夜了，檐主监督我。#阴虚体质 #润燥行动",
      tags: [
        "#人间第一失眠哲学家",
        "#凌晨三点哲学系主任",
        "#缺水系浪漫诗人",
      ],
    },
  },

  phlegm_dampness: {
    id: "phlegm_dampness",
    typeName: "痰湿质",
    characterName: "祛湿喵",
    badgeText: "痰湿质≥8分 泡发星人",

    characterImage: "/assets/characters/asset_character_type_05.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge05.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_05.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_05.webp",
    },

    coreTraits: [
      "你是那种“容易泡发”的人类——暴雨天身体像灌了铅，早上起来眼皮肿得像没睡醒，腹部软软的像揣了个小枕头。你的身体好像特别容易存东西，存水、存肉、存湿气。",
      "但你有一个非常珍贵的优点：你脾气是真的好。你不爱计较、不爱吵架、情绪稳定得像一尊佛——某种程度上是因为你懒得动气，但也因为你的包容度真的比别人大。你是那种“都可以”“没关系”“算了算了”的人，跟你相处，特别舒服。",
      "你不适合激烈的东西。适合散步、适合清淡饮食、适合慢慢把身体里的“水”排出去。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "少躺多走，少甜多淡。你的身体不是懒——是太重了，动不起来。慢慢来，每天多走一步就好。",

    tags: [
      "#人间第一水肿棉花糖",
      "#蓬松生活家",
      "#下雨天自动泡发体质",
      "#湿气囤货收藏家",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_05.webp",
      posterTitle: "✦ 时愈堂把脉报告·痰湿质 ✦",
      posterDescription:
        "檐主说我今天又是水肿的一天。出门透气了，有一起的吗？#痰湿体质 #佛系养生",
      tags: [
        "#人间第一水肿棉花糖",
        "#下雨天自动泡发体质",
        "#蓬松生活家",
      ],
    },
  },

  damp_heat: {
    id: "damp_heat",
    typeName: "湿热质",
    characterName: "凉茶喵",
    badgeText: "湿热质≥8分 火大星人",

    characterImage: "/assets/characters/asset_character_type_06.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge06.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_06.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_06.webp",
    },

    coreTraits: [
      "你是一颗行走的小辣椒——不是坏的，就是太真实了。高兴了就笑，生气了就炸，脸上冒痘、心里冒火、看不惯的事当场就要说。你活得特别不装，特别带劲。",
      "但火气大了确实烧得慌——脸上油光、嘴里发苦、大便黏腻、脾气一点就着。你的身体像一台散热不太好的电脑，运行速度挺快，就是太容易发烫。",
      "你身边的人可能会觉得你情绪起伏大，但其实你的火来得快去得也快——炸完了就没事了，从不记仇。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "檐主给你备了凉茶，记得来喝。慢半拍，不是认输——是给你的火气一个缓冲地带。你的真性情很可爱，但别烧到自己。",

    tags: [
      "#人间第一易燃真性情",
      "#火气直球王",
      "#自带火气的直球选手",
      "#一点就着直球王",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_06.webp",
      posterTitle: "✦ 时愈堂把脉报告·湿热质 ✦",
      posterDescription:
        "檐主说我性子急、心不坏、炸完就没事了。今天的凉茶已喝，谢谢檐主。#湿热体质 #真性情",
      tags: [
        "#人间第一易燃真性情",
        "#自带火气的直球选手",
        "#火气直球王",
      ],
    },
  },

  blood_stasis: {
    id: "blood_stasis",
    typeName: "血瘀质",
    characterName: "通通喵",
    badgeText: "血瘀质≥8分 堵堵星人",

    characterImage: "/assets/characters/asset_character_type_07.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge07.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_07.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_07.webp",
    },

    coreTraits: [
      "你是那种“心事全往肚子里咽”的人。不是不想说，是觉得说了也没用。于是每一件没说出口的话，都被你的身体替你记住了——堵在肩膀里、堵在腰上、堵在某个固定位置，变成淤青、变成疼痛、变成洗不掉的暗沉。",
      "但“堵”的另一面是深情。你重情重义，专一长情，认定的人与事会一直守着。你不轻易交付真心，但一旦交付了，就是一辈子。",
      "你的身体之所以堵，是因为你太用心了——用心到所有东西都舍不得放掉。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "找个人说出来。不是要你解决问题，是要你松一口气。你的身体不需要再替你保管那些委屈了——檐主替你保密。",

    tags: [
      "#人间第一旧事典藏家",
      "#深情执念保管员",
      "#心事典藏级收藏家",
      "#心结长期持有人",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_07.webp",
      posterTitle: "✦ 时愈堂把脉报告·血瘀质 ✦",
      posterDescription:
        "檐主说我心里的话不能憋太久，一定要及时说出来。#血瘀体质 #开始疏通",
      tags: [
        "#人间第一旧事典藏家",
        "#心事典藏级收藏家",
        "#深情执念保管员",
      ],
    },
  },

  qi_stagnation: {
    id: "qi_stagnation",
    typeName: "气郁质",
    characterName: "逍遥喵",
    badgeText: "气郁质≥8分 卡住星人",

    characterImage: "/assets/characters/asset_character_type_08.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge08.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_08.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_08.webp",
    },

    coreTraits: [
      "你是那种“一秒钟能想八百件事”的人。别人的一个眼神、一句无心的话，你会在脑海里复盘三天——是不是我哪里做错了？你太会照顾别人的感受了，以至于常常忘了自己也需要被照顾。",
      "你是天生的共情者，敏感、柔软、体贴入微。你身边的人可能不知道，你是那个在深夜里替他们操过心的人。但卡住你的，也正是这份“太为别人着想”——",
      "你想得太多，放下的太少，胸口常年堵着一口叹不完的气。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "不要只做别人的情绪树洞，要做自己的小太阳。今天开始，先照顾自己——你的需要，也很重要。吹散心里的乌云，檐主帮你看着呢。",

    tags: [
      "#人间第一内耗编剧",
      "#脑内开会总导演",
      "#脑内连续剧总导演",
      "#想太多代言人",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_08.webp",
      posterTitle: "✦ 时愈堂把脉报告·气郁质 ✦",
      posterDescription:
        "檐主说我很容易卡住，今天开始，先照顾自己。想太多的人，也要学会放一放。#气郁体质 #舒展计划",
      tags: [
        "#人间第一内耗编剧",
        "#脑内连续剧总导演",
        "#想太多代言人",
      ],
    },
  },

  special_diathesis: {
    id: "special_diathesis",
    typeName: "特禀质",
    characterName: "结界喵",
    badgeText: "特禀质≥8分 敏敏星人",

    characterImage: "/assets/characters/asset_character_type_09.webp",
    badgeImage: "/assets/icons/asset_deco_result_badge09.png",

    background: {
      pc: "/assets/bg/asset_bg_result_pc_09.webp",
      mobile: "/assets/bg/asset_bg_result_mobile_09.webp",
    },

    coreTraits: [
      "你是九种体质里最“薄”的——皮肤薄、屏障薄、防御薄。别人换个季节打个喷嚏，你直接倒下；别人过敏是偶尔，你是常态；别人在新环境里适应，你的身体在喊“快逃”。你像一只没有壳的蜗牛，用最柔软的部分面对这个世界。",
      "但正因为你“薄”，你才格外干净和纯粹。你不擅长伪装，不擅长敷衍，你待人真诚、心思通透，像一块透明的水晶——易碎，但很漂亮。",
      "你需要的不是“变强”，是被好好保护。",
    ],

    whisperTitle: "✦ 檐主的悄悄话",
    whisperText:
      "檐主的结界给你撑好了。以后不舒服的人和事，都会自动弹开。你不是脆弱——你是值得被偏爱的那种人。好好偏爱自己，从今天开始。",

    tags: [
      "#人间第一空气质检员",
      "#环境侦查员",
      "#身体自带超灵敏雷达",
      "#超敏体感预言家",
    ],

    share: {
      posterImage: "/assets/shareposter/asset_share_poster_09.webp",
      posterTitle: "✦ 时愈堂把脉报告·特禀质 ✦",
      posterDescription:
        "檐主给我撑了个结界，敏感星人的日常：花开了打喷嚏，换季了先病。但檐主说，我值得被好好保护。#特禀体质 #檐主守护中",
      tags: [
        "#人间第一空气质检员",
        "#身体自带超灵敏雷达",
        "#环境侦查员",
      ],
    },
  },
};
export const resultData = Object.fromEntries(
  Object.entries(rawResultData).map(([id, profile]) => [
    id,
    {
      ...profile,
      characterImage: withBase(profile.characterImage),
      badgeImage: withBase(profile.badgeImage),
      background: {
        pc: withBase(profile.background.pc),
        mobile: withBase(profile.background.mobile),
      },
      share: {
        ...profile.share,
        posterImage: withBase(profile.share.posterImage),
      },
    },
  ])
) as Record<ResultId, ResultProfile>;