export interface KitRole {
  id: string
  name: string
  faction: string
  description: string
  weapons: string[]
  equipment: string[]
  tips: string[]
}

export const classes: KitRole[] = [
  {
    id: 'rifleman',
    name: '步枪兵',
    faction: '通用',
    description: '小队基础兵种，标准步枪配发，弹药携带量多，适合各种作战场景。',
    weapons: ['M4A1 / AK-74M / L85A2', '手枪', '破片手雷×2', '烟雾弹×2'],
    equipment: ['弹药包（100弹量）', '工兵铲', '绷带×2'],
    tips: ['始终携带弹药包支援队友', '为中远距离交火提供稳定火力输出', '新手首选兵种，熟悉游戏节奏的最佳角色'],
  },
  {
    id: 'medic',
    name: '医疗兵',
    faction: '通用',
    description: '队伍核心，负责救治倒地的队友并恢复血量，是最重要的辅助兵种。',
    weapons: ['突击步枪', '手枪', '烟雾弹×2'],
    equipment: ['医疗包×9', '绷带×9', '工兵铲'],
    tips: ['优先救治倒地的队长和关键火力兵种', '利用烟雾弹掩护救援行动', '保持在小队后方或中间位置，避免先倒下'],
  },
  {
    id: 'automatic-rifleman',
    name: '自动步枪手',
    faction: '通用',
    description: '小队火力核心，装备轻机枪提供持续压制火力，配备瞄准镜适合中距离作战。',
    weapons: ['M249 / RPK / L86A2', '手枪', '烟雾弹×1'],
    equipment: ['弹药包', '工兵铲', '绷带×2'],
    tips: ['寻找制高点或掩体后架枪压制', '不要冲锋，机枪适合阵地防御', '控制点射节奏减少弹药消耗'],
  },
  {
    id: 'machine-gunner',
    name: '重机枪手',
    faction: '通用',
    description: '装备通用机枪或重机枪，提供超强火力压制，可有效阻止敌方推进。',
    weapons: ['PKP / M240B', '手枪'],
    equipment: ['弹药包', '工兵铲', '绷带×2'],
    tips: ['与步枪手配合，交替射击维持压制', '架设时选择视野开阔位置', '注意换弹时机，避免压制间隙被突破'],
  },
  {
    id: 'anti-tank',
    name: '反坦克兵',
    faction: '通用',
    description: '专攻敌方载具，装备火箭筒或反坦克导弹，是地面载具的克星。',
    weapons: ['卡宾枪 / 短步枪', 'RPG-7 / AT4', '手枪'],
    equipment: ['工兵铲', '绷带×2'],
    tips: ['优先攻击敌方运输车和步战车', '火箭筒后焰区注意避开队友', '与狙击手配合标记高价值载具目标'],
  },
  {
    id: 'sapper',
    name: '工兵',
    faction: '通用',
    description: '修理载具、清除地雷、建造防御工事，是维持部队持续作战的关键角色。',
    weapons: ['卡宾枪 / 冲锋枪', '手枪'],
    equipment: ['修理工具', '工兵铲', '地雷×2 / C4炸药', '绷带×2'],
    tips: ['跟随载具小队行动，随时准备修理', '在己方FOB周围埋雷防御', 'C4可摧毁敌方建筑和FOB'],
  },
  {
    id: 'marksman',
    name: '精确射手',
    faction: '通用',
    description: '装备精确射手步枪，中远距离精准击杀，为小队提供精确火力支援。',
    weapons: ['SVD / M110 / L129A1', '手枪', '烟雾弹×1'],
    equipment: ['弹药包', '工兵铲', '绷带×2'],
    tips: ['寻找隐蔽位置，不要长时间暴露', '优先击杀敌方机枪手和反坦克兵', '为小队长提供远距离观察情报'],
  },
  {
    id: 'sniper',
    name: '狙击手',
    faction: '通用',
    description: '超远距离精确击杀，配备高倍镜狙击步枪，同时承担侦察任务。',
    weapons: ['M24 / SV-98 / L115A3', '手枪'],
    equipment: ['工兵铲', '绷带×2'],
    tips: ['选择远离交战区的制高点', '优先侦察报告敌方FOB和载具位置', '每次射击后立即转移位置'],
  },
  {
    id: 'squad-leader',
    name: '小队长',
    faction: '通用',
    description: '小队指挥核心，负责战术决策、兵力部署与前哨基地建造。',
    weapons: ['突击步枪 + 榴弹发射器', '手枪', '烟雾弹×4'],
    equipment: ['望远镜', '工兵铲', '绷带×2', '集结点（Rally Point）'],
    tips: ['及时部署集结点保障小队持续作战', '通过指挥频道与友军队长协调行动', '选中位置架设FOB是胜负关键'],
  },
  {
    id: 'pilot',
    name: '飞行员',
    faction: '通用',
    description: '驾驶直升机执行运输和火力支援任务，需要熟练掌握飞行技能。',
    weapons: ['手枪', '烟雾弹×2'],
    equipment: ['降落伞', '修理工具（部分阵营）', '绷带×2'],
    tips: ['低空飞行避开敌方防空火力', '确保降落区域安全后再着陆', '与地面小队沟通好空投物资位置'],
  },
]
