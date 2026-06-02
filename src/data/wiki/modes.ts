export interface GameMode { id: string; name: string; nameZh: string; description: string; winCondition: string; tips: string[]; features: string[] }

export const modes: GameMode[] = [
  { id: 'raas', name: 'RAAS', nameZh: '随机战线推进', description: 'RAAS（Random Advance and Secure）是最常见的游戏模式。占领点按随机顺序生成，双方从各自主基地出发，逐步发现并争夺控制点。由于占领点位置不确定，侦查和快速反应能力至关重要。', winCondition: '率先消耗完对方票数（Tickets），或占领多数旗帜使对方票数持续减少。', tips: ['派侦察小队提前探明下一个占领点位置','不要孤注一掷防守单个点，保持战术灵活性','占领点刷新后立即调动载具抢占先机'], features: ['占领点随机生成，每局不同','需要侦察才能发现下一个占领点','强调快速机动和灵活战术'] },
  { id: 'aas', name: 'AAS', nameZh: '交替战线推进', description: 'AAS（Advance and Secure）是固定顺序的占领模式。所有占领点位置和顺序在开局即确定，双方沿着预设路线推进战线。由于路线固定，战术规划更加可控，但也容易形成阵地战僵局。', winCondition: '同RAAS，消耗对方票数或占领多数旗帜取胜。', tips: ['开局就规划好整条战线的推进节奏','利用固定路线预判敌方行动路线设伏','关键占领点部署FOB确保持续兵力投送'], features: ['占领点顺序固定','战术规划更可控','适合指挥体系成熟的队伍'] },
  { id: 'invasion', name: 'Invasion', nameZh: '入侵模式', description: 'Invasion模式中进攻方逐步占领防守方的据点。防守方拥有更高的初始票数，但据点一旦被攻占就无法夺回。进攻方需要步步为营推进，防守方则需要合理分配兵力拖延时间。', winCondition: '进攻方：攻占所有防守点。防守方：消耗进攻方所有票数。', tips: ['进攻方集中兵力逐个攻克，不要分散','防守方在据点前广设防御工事','防守方善用FOB兵站快速补充兵力'], features: ['非对称对抗，攻守分明','防守方票数优势但无法夺回据点','节奏紧凑，适合激烈对抗'] },
  { id: 'destruction', name: 'Destruction', nameZh: '破坏模式', description: 'Destruction模式中进攻方需要找到并摧毁防守方的关键目标（通常是武器库或指挥中心）。防守方则需要保护目标不被摧毁。C4炸药和载具火炮是摧毁目标的主要手段。', winCondition: '进攻方：摧毁所有目标。防守方：保护目标不被全部摧毁或消耗对方票数。', tips: ['进攻方派出多支小队同时尝试突破','防守方在每个目标周围布设防御圈','利用载具远程火力削弱目标防守'], features: ['目标制胜利条件','C4和重火力是核心手段','适合特种作战风格的小队'] },
]
