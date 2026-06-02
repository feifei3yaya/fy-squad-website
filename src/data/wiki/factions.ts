export interface Faction { id: string; name: string; nameEn: string; flag: string; weapons: string; vehicles: string; strength: string; description: string }

export const factions: Faction[] = [
  { id: 'usa', name: '美军', nameEn: 'US Army', flag: 'USA', weapons: 'M4A1、M249、M110、M72 LAW', vehicles: 'M1A2 Abrams、M2A3 Bradley、UH-60、MATV', strength: '装备精良、火力充足，全面均衡', description: '美国陆军是Squad中装备最全面的阵营，从步兵火力到载具支援都非常均衡。M4A1卡宾枪后坐力小精度高，M1A2主战坦克和布莱德利步兵战车提供了强大的装甲支持，UH-60黑鹰直升机则实现了高效的空中运输。适合新手入门的阵营。' },
  { id: 'rus', name: '俄军', nameEn: 'Russian Ground Forces', flag: 'RUS', weapons: 'AK-74M、PKP、SVD、RPG-7', vehicles: 'T-72B3、BTR-82A、Mi-8', strength: '单发威力大、装甲厚重', description: '俄罗斯地面部队以强大的火力和厚重的装甲著称。AK-74M单发伤害略高于北约系步枪，RPG-7反坦克火箭筒威名远扬。T-72B3主战坦克和BTR-82A轮式战车形成高低搭配，Mi-8大型直升机可一次投送大量兵力。喜欢刚硬打法的玩家首选。' },
  { id: 'gbr', name: '英军', nameEn: 'British Army', flag: 'GBR', weapons: 'L85A2、L7A2、L129A1', vehicles: 'FV510 Warrior、FV4034 Challenger 2', strength: '精度极高、防守坚韧', description: '英国陆军以精准的射击和坚韧的防守闻名。L85A2步枪精度卓越，L7A2通用机枪提供稳定火力压制。FV510武士步兵战车防护出色，挑战者2主战坦克装甲坚不可摧。英军适合偏向防守和精确打击战术的玩家。' },
  { id: 'pla', name: '解放军', nameEn: 'PLA', flag: 'PLA', weapons: 'QBZ-95、QJY-88、QBU-88', vehicles: 'ZBL-09、ZBD-04A、ZTZ-99A', strength: '机动灵活、装备轻量化', description: '中国人民解放军以机动灵活和轻量化装备为特色。QBZ-95无托步枪结构紧凑适合近距离作战，ZBL-09轮式战车具备优秀的水上泅渡能力。95式枪族统一5.8mm口径简化了后勤补给。适合喜欢快速机动和高节奏打法的玩家。' },
]
