import { weapons } from './weapons'
import { classes } from './classes'
import { vehicles } from './vehicles'
import { maps } from './maps'
import { factions } from './factions'
import { modes } from './modes'

export { weapons, classes, vehicles, maps, factions, modes }

export const wikiStats = {
  weapons: weapons.length,
  classes: classes.length,
  vehicles: vehicles.length,
  maps: maps.length,
  factions: factions.length,
  modes: modes.length,
}

export const wikiCategories = [
  { key: 'weapons' as const, path: '/wiki/weapons', title: '武器图鉴', enTitle: 'WEAPONS', icon: 'Crosshair', desc: '各阵营武器参数详解', color: 'text-fy-amber' },
  { key: 'classes' as const, path: '/wiki/classes', title: '兵种手册', enTitle: 'KIT ROLES', icon: 'Users', desc: '兵种技能与职责说明', color: 'text-fy-green' },
  { key: 'vehicles' as const, path: '/wiki/vehicles', title: '载具百科', enTitle: 'VEHICLES', icon: 'Truck', desc: '陆海空载具数据手册', color: 'text-fy-orange' },
  { key: 'maps' as const, path: '/wiki/maps', title: '地图图鉴', enTitle: 'MAPS', icon: 'Map', desc: '全部战场地图与攻略', color: 'text-cyan-400' },
  { key: 'factions' as const, path: '/wiki/factions', title: '阵营档案', enTitle: 'FACTIONS', icon: 'Flag', desc: '各阵营装备与特色', color: 'text-red-400' },
  { key: 'modes' as const, path: '/wiki/modes', title: '模式规则', enTitle: 'GAME MODES', icon: 'Swords', desc: '游戏模式机制详解', color: 'text-purple-400' },
] as const
